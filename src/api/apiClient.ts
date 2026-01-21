import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 401:
              break;
            case 404:
              break;
            case 500:
              break;
            default:
              break;
          }
        } else if (error.request) {
          console.error('Network error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.client;
  }

  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  setDefaultHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }
}

export const apiClient = new ApiClient();
