import requestService from '@services/request.service';

interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

export const getUserStatusApi = () => {
  console.log('getUserStatus: from api');
  // OPTION 1
  return requestService.get('https://dummyjson.com/auth/me');
  // OPTION 2
  // return fetch('https://dummyjson.com/auth/me').then(res => res.json()).then(r => ({data: r}));
  // return axios.get('https://dummyjson.com/auth/me');
};

export const postLoginDetailsApi = (data: LoginPayload) =>
  requestService.post('https://dummyjson.com/user/login', data);
