import { getAuthHeaderValue } from '@/shared/lib';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const MAX_RETRY_ATTEMPTS = 2;
const BASE_RETRY_DELAY_MS = 1000;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number;
}

export const api = axios.create({
  baseURL: 'http://api.valantis.store:40000/',
  headers: {
    'X-Auth': getAuthHeaderValue(),
  },
});

api.interceptors.response.use(
  value => value,
  (error: AxiosError) => {

    if (error.response) {

      if (error.response.status === 401) {
        api.defaults.headers.common['X-Auth'] = getAuthHeaderValue();
      }

      console.error('Response error status:', error.response.status);
      console.error('Response error data:', error.response.data);

      const config = error.config as CustomAxiosRequestConfig;
      config.retryCount = config.retryCount || 0;

      if (config.retryCount < MAX_RETRY_ATTEMPTS) {
        config.retryCount += 1;
        return new Promise(resolve => setTimeout(() => resolve(api.request(config)), BASE_RETRY_DELAY_MS));
      }
    }

    return Promise.reject(error);
  },
);
