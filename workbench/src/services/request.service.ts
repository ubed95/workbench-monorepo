/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from 'axios';
import LS from '@services/localstorage.service';

// Import Config based on your setup
interface Config {
  ENV?: {
    API_URL?: string;
  };
}

const config: Config = {};

interface RequestHeaders {
  Authorization?: string;
  [key: string]: string | undefined;
}

const getHeaders = (): RequestHeaders => {
  const headers: RequestHeaders = {};
  const accessToken = LS.get('USER_ACCESS_TOKEN');
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
};

const baseUrl = config?.ENV?.API_URL || '';

interface RequestConfigParams {
  method: string;
  url: string;
  data?: any;
  params?: any;
}

interface RequestConfig extends AxiosRequestConfig {
  url: string;
  method: string;
  data?: any;
  params?: any;
}

const createRequestConfig = ({
  method,
  url,
  data,
  params,
}: RequestConfigParams): RequestConfig => {
  const reqConfig: RequestConfig = { method, url: '', data, params };
  if (url.indexOf('http') === 0) {
    reqConfig.url = url;
  } else {
    reqConfig.url = baseUrl + url;
  }
  return reqConfig;
};

const addRequestInterceptors = () => {
  // Add any request interceptor here
};

const addResponseInterceptors = () => {
  // Add any response interceptor here
  // EX: handle unauthorized access or 401
};

addRequestInterceptors();
addResponseInterceptors();

const createRequest = (configuration: RequestConfig) => {
  // Add any common headers and other stuff here
  // Add some base URL here

  const headers = getHeaders();
  return axios({
    ...configuration,
    headers: headers,
  });
};

const get = (url: string, params: any = {}) => {
  const reqConfig = createRequestConfig({
    method: 'GET',
    url: url,
    data: undefined,
    params,
  });
  return createRequest(reqConfig);
};

const post = (url: string, data: any = {}, params: any = {}) => {
  const reqConfig = createRequestConfig({
    method: 'POST',
    url: url,
    data,
    params,
  });
  return createRequest(reqConfig);
};

const put = (url: string, data: any = {}, params: any = {}) => {
  const reqConfig = createRequestConfig({
    method: 'PUT',
    url: url,
    data,
    params,
  });
  return createRequest(reqConfig);
};

const del = (url: string, data: any = {}, params: any = {}) => {
  const reqConfig = createRequestConfig({
    method: 'DELETE',
    url: url,
    data,
    params,
  });
  return createRequest(reqConfig);
};

export default { get, post, put, del };
