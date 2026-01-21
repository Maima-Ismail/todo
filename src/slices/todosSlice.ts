import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { get, ENDPOINTS } from '../api';
import { Todo, SortOption, FilterState } from '../types';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  sortOption: SortOption;
  filter: FilterState;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  sortOption: 'none',
  filter: { type: 'none', value: '', dateTimeFilter: undefined, nameFilter: undefined },
};

// Async thunk for fetching todos from API
export const fetchTodosFromAPI = createAsyncThunk(
  'todos/fetchFromAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get(ENDPOINTS.TODOS.BASE);
      // Transform API data to match our Todo interface
      const transformedTodos = response.data.map((item: any, index: number) => {
        // Create realistic due dates (spread over next 30 days)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (index % 30));
        
        // Create realistic times (9 AM to 9 PM)
        const hour = 9 + (index % 12);
        const minute = (index * 5) % 60;
        
        return {
          id: `api-${item.id}`,
          name: item.title.charAt(0).toUpperCase() + item.title.slice(1), // Capitalize first letter
          description: item.completed 
            ? `Completed task from API (ID: ${item.id})`
            : `Task from API (ID: ${item.id})`,
          dueDate: dueDate.toISOString().split('T')[0],
          dueTime: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          completed: item.completed,
          createdAt: new Date().toISOString(),
        };
      });
      return transformedTodos;
    } catch (error: any) {
      // Return error message for better error handling
      return rejectWithValue(
        error.message || 
        'Failed to fetch todos from API'
      );
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt'>>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = { type: 'none', value: '', dateTimeFilter: undefined, nameFilter: undefined };
    },
    setDateTimeFilter: (state, action: PayloadAction<{ type: 'date' | 'time'; value: string }>) => {
      if (action.payload.value) {
        state.filter.dateTimeFilter = action.payload;
        // Update main filter type for backward compatibility
        if (state.filter.nameFilter) {
          state.filter.type = 'name';
          state.filter.value = state.filter.nameFilter;
        } else {
          state.filter.type = action.payload.type;
          state.filter.value = action.payload.value;
        }
      } else {
        // Clear date/time filter
        state.filter.dateTimeFilter = undefined;
        if (state.filter.nameFilter) {
          state.filter.type = 'name';
          state.filter.value = state.filter.nameFilter;
        } else {
          state.filter.type = 'none';
          state.filter.value = '';
        }
      }
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.filter.nameFilter = action.payload;
      if (action.payload) {
        state.filter.type = 'name';
        state.filter.value = action.payload;
      } else if (state.filter.dateTimeFilter) {
        state.filter.type = state.filter.dateTimeFilter.type;
        state.filter.value = state.filter.dateTimeFilter.value;
      } else {
        state.filter.type = 'none';
        state.filter.value = '';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out duplicates (todos with same API id already exist)
        const existingApiIds = new Set(
          state.todos
            .filter(todo => todo.id.startsWith('api-'))
            .map(todo => todo.id.replace('api-', ''))
        );
        const newTodos = action.payload.filter(
          todo => !existingApiIds.has(todo.id.replace('api-', ''))
        );
        // Append only new API todos to existing todos
        state.todos = [...state.todos, ...newTodos];
      })
      .addCase(fetchTodosFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' 
          ? action.payload 
          : action.error.message || 'Failed to fetch todos from API';
      });
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setSortOption,
  setFilter,
  clearFilter,
  setDateTimeFilter,
  setNameFilter,
} = todosSlice.actions;

// Selectors
export const selectAllTodos = (state: { todos: TodosState }) => state.todos.todos;
export const selectSortOption = (state: { todos: TodosState }) => state.todos.sortOption;
export const selectFilter = (state: { todos: TodosState }) => state.todos.filter;
export const selectLoading = (state: { todos: TodosState }) => state.todos.loading;
export const selectError = (state: { todos: TodosState }) => state.todos.error;

// Helper function to get filtered and sorted todos
export const selectFilteredAndSortedTodos = (state: { todos: TodosState }): Todo[] => {
  const { todos, sortOption, filter } = state.todos;
  let filteredTodos = [...todos];

  // First apply date/time filters (if any)
  const dateTimeFilter = filter.dateTimeFilter || 
    (filter.type === 'date' || filter.type === 'time' 
      ? { type: filter.type as 'date' | 'time', value: filter.value }
      : undefined);
  const nameFilter = filter.nameFilter || 
    (filter.type === 'name' ? filter.value : undefined);

  // Apply date/time filter first
  if (dateTimeFilter && dateTimeFilter.value) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (dateTimeFilter.type) {
        case 'date':
          // Handle date range (format: "YYYY-MM-DD to YYYY-MM-DD") or single date
          if (dateTimeFilter.value.includes(' to ')) {
            const [startDate, endDate] = dateTimeFilter.value.split(' to ');
            return todo.dueDate >= startDate && todo.dueDate <= endDate;
          }
          return todo.dueDate === dateTimeFilter.value;
        case 'time':
          return todo.dueTime.includes(dateTimeFilter.value);
        default:
          return true;
      }
    });
  }

  // Then apply name/description search on the filtered list
  if (nameFilter) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
             todo.description.toLowerCase().includes(nameFilter.toLowerCase());
    });
  }

  // Apply sort
  if (sortOption !== 'none') {
    filteredTodos.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-asc':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'date-desc':
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        case 'time-asc':
          return a.dueTime.localeCompare(b.dueTime);
        case 'time-desc':
          return b.dueTime.localeCompare(a.dueTime);
        default:
          return 0;
      }
    });
  }

  return filteredTodos;
};

export default todosSlice.reducer;
