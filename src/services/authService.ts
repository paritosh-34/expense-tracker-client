/* eslint-disable no-console */
import myStore from '@utils/myStore';
import showToast from '@utils/showToast';
import { domain, endpoints, IEndpoint } from '@constants/apiEndpoints';
import { baseApiReturn } from '@interfaces/index';

const loginReq = async (endpoint: IEndpoint, payload = {}) => {
  const url = domain + endpoint.url;

  try {
    const r = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload),
    });

    const toJson = (await r.json()) as baseApiReturn;
    console.log(toJson);

    if (!toJson.success) {
      showToast(toJson.message, 'error');
      return false;
    }

    myStore.setAccessToken(r.headers.get('x-access-token')!);

    return toJson;
  } catch (e) {
    console.log(e);
    showToast('Unexpected Error, Please try later', 'error');

    return false;
  }
};

const requestRefresh = async () => {
  const url = domain + endpoints.requestRefresh.url;

  try {
    const r = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const toJson = (await r.json()) as baseApiReturn;
    console.log(toJson);

    if (!toJson.success) {
      return false;
    }

    myStore.setAccessToken(r.headers.get('x-access-token')!);

    return toJson;
  } catch (e) {
    console.log(e);
    showToast('Unexpected Error, Please try later', 'error');

    return false;
  }
};

export { loginReq, requestRefresh };
