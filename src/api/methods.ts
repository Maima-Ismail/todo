import { AxiosResponse } from 'axios';
import { apiClient } from './apiClient';
import { ENDPOINTS } from './endpoints';


export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}


export const get = async <T = any>(
  endpoint: string,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.getInstance().get(endpoint, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data,
    } as ApiError;
  }
};

export const post = async <T = any>(
  endpoint: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.getInstance().post(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data,
    } as ApiError;
  }
};

export const put = async <T = any>(
  endpoint: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.getInstance().put(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data,
    } as ApiError;
  }
};

export const patch = async <T = any>(
  endpoint: string,
  data?: any,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.getInstance().patch(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data,
    } as ApiError;
  }
};

export const del = async <T = any>(
  endpoint: string,
  config?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.getInstance().delete(endpoint, config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data,
    } as ApiError;
  }
};

export const apiMethods = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export { ENDPOINTS };
