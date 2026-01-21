export const ENDPOINTS = {
  TODOS: {
    BASE: '/todos',
    BY_ID: (id: string | number) => `/todos/${id}`,
  },
} as const;
