/* eslint-disable no-console */
import showToast from '@utils/showToast';
import myStore from '@utils/myStore';
import { domain, IEndpoint } from '@constants/apiEndpoints';
import { baseApiReturn } from '@interfaces/index';
import { requestRefresh } from './authService';

const apiService = async <T extends baseApiReturn>(
  endpoint: IEndpoint,
  payload: Record<string, string> = {},
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  slug: string = ''
): Promise<T | false> => {
  const url = domain + endpoint.url + slug;

  try {
    const r: Response = await fetch(url, {
      method: endpoint.method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: myStore.getAccessToken(),
      },
      body: endpoint.method === 'post' ? JSON.stringify(payload) : undefined,
    });

    const toJson = (await r.json()) as T;
    console.log(toJson);

    if (!toJson.success) {
      if (toJson.message === 'jwt expired') {
        const refreshResult = await requestRefresh();

        if (!refreshResult) return false;
        return apiService(endpoint);
      }

      showToast(toJson.message, 'error');
      return false;
    }

    return toJson;
  } catch (e) {
    console.log(e);
    showToast('Unexpected Error, Please try later', 'error');

    return false;
  }
};

export default apiService;
