export const domain =
  process.env.NODE_ENV === 'production'
    ? 'https://api-stockman.herokuapp.com'
    : 'http://127.0.0.1:5000';

export interface IEndpoint {
  url: string;
  method: 'get' | 'post';
}

type endpointNames = 'login' | 'signup' | 'requestRefresh' | 'logout';

export const endpoints: Record<endpointNames, IEndpoint> = {
  // auth
  login: {
    url: '/auth/login',
    method: 'post',
  },
  signup: {
    url: '/auth/signup',
    method: 'post',
  },
  requestRefresh: {
    url: '/auth/requestRefresh',
    method: 'post',
  },
  logout: {
    url: '/auth/logout',
    method: 'post',
  },
};
