export interface Todo {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  createdAt: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'time-asc' | 'time-desc' | 'none';

export type FilterType = 'name' | 'date' | 'time' | 'none';

export interface FilterState {
  type: FilterType;
  value: string;
}
