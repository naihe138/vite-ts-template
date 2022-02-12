import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { uuid } from './index';

const env = import.meta.env;

const requestInstance = axios.create({
  baseURL: env.VITE_BASE_API,
  timeout: 20 * 1000,
});

requestInstance.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const headers = config.headers as AxiosRequestHeaders;
    headers['trace-request-id'] = uuid();
    config.url = makeFullPath(config.url || '');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

requestInstance.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

function makeFullPath(url: string) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }
  if (url.startsWith('/')) {
    url = url.substring(1);
  }
  if (url.startsWith('cf')) {
    return `${env.VITE_CF_API}${url}`;
  }
  return `${env.VITE_BASE_API}${url}`;
}

export const http = (url: string, data: Recordable, config: AxiosRequestConfig<any>) => {
  return requestInstance.post(url, data, config);
};
