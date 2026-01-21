import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Central API client configuration
 * Handles base URL, timeouts, and default headers
 */
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

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token or other headers here if needed
        // const token = getAuthToken();
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common errors here
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          switch (status) {
            case 401:
              // Handle unauthorized
              break;
            case 404:
              // Handle not found
              break;
            case 500:
              // Handle server error
              break;
            default:
              break;
          }
        } else if (error.request) {
          // Request made but no response received
          console.error('Network error:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the axios instance
   */
  getInstance(): AxiosInstance {
    return this.client;
  }

  /**
   * Update base URL
   */
  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  /**
   * Update default headers
   */
  setDefaultHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
