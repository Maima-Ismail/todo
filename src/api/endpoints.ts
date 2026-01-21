/**
 * API Endpoints configuration
 * Centralized location for all API endpoints
 */

export const ENDPOINTS = {
  // Todos endpoints
  TODOS: {
    BASE: '/todos',
    BY_ID: (id: string | number) => `/todos/${id}`,
  },
  
  // Users endpoints (if needed in future)
  USERS: {
    BASE: '/users',
    BY_ID: (id: string | number) => `/users/${id}`,
  },
  
  // Posts endpoints (if needed in future)
  POSTS: {
    BASE: '/posts',
    BY_ID: (id: string | number) => `/posts/${id}`,
  },
} as const;
