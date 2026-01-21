import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Portal, Snackbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, ComponentSizes } from '../utils/constants';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ActiveFilters from '../components/ActiveFilters';
import FilterSelectionSheet from '../components/FilterSelectionSheet';
import FilterByDateSheet from '../components/FilterByDateSheet';
import FilterByTimeSheet from '../components/FilterByTimeSheet';
import SortBySheet from '../components/SortBySheet';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { fetchTodosFromAPI, addTodo, updateTodo, deleteTodo, selectError, selectLoading, selectAllTodos } from '../slices/todosSlice';
import { Todo } from '../types';

const TasksScreen: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const allTodos = useSelector(selectAllTodos);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
  const [filterSelectionSheetVisible, setFilterSelectionSheetVisible] = useState(false);
  const [filterDateSheetVisible, setFilterDateSheetVisible] = useState(false);
  const [filterTimeSheetVisible, setFilterTimeSheetVisible] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [deleteSnackbarVisible, setDeleteSnackbarVisible] = useState(false);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setFormVisible(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setFormVisible(true);
  };

  const handleSubmitTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    if (editingTodo) {
      dispatch(updateTodo({ ...todoData, id: editingTodo.id, createdAt: editingTodo.createdAt }));
      setSnackbarMessage('Task updated successfully!');
      setSnackbarType('success');
    } else {
      dispatch(addTodo(todoData));
      setSnackbarMessage('Task added successfully!');
      setSnackbarType('success');
    }
    setFormVisible(false);
    setEditingTodo(null);
    setSnackbarVisible(true);
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
    setDeleteSnackbarVisible(true);
  };

  const handleFetchFromAPI = async () => {
    try {
      const result = await dispatch(fetchTodosFromAPI() as any);
      
      if (fetchTodosFromAPI.fulfilled.match(result)) {
        const addedCount = result.payload.length;
        
        if (addedCount > 0) {
          setSnackbarMessage(`Successfully fetched ${addedCount} todos from API!`);
          setSnackbarType('success');
        } else {
          setSnackbarMessage('All todos from API are already in your list.');
          setSnackbarType('success');
        }
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage(error || 'Failed to fetch todos from API');
        setSnackbarType('error');
        setSnackbarVisible(true);
      }
    } catch (err: any) {
      setSnackbarMessage(err?.message || 'Failed to fetch todos from API');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header userName="User" />
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <SearchBar 
            onFilterPress={() => {
              setFilterSelectionSheetVisible(true);
            }}
            onSortPress={() => setSortSheetVisible(true)}
          />
          <ActiveFilters />

          <View style={styles.loadApiContainer}>
            <Button
              mode="contained"
              onPress={handleFetchFromAPI}
              loading={loading}
              icon="download"
            >
              Load from API
            </Button>
          </View>

          <TodoList 
            onEditTodo={handleEditTodo} 
            onAddTodo={handleAddTodo}
            onFetchFromAPI={handleFetchFromAPI}
            onDeleteTodo={handleDeleteTodo}
          />
        </ScrollView>

        {allTodos.length > 0 && (
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={handleAddTodo}
            color={Colors.textOnPrimary}
          />
        )}
      </View>

      <TodoForm
        visible={formVisible}
        todo={editingTodo}
        onDismiss={() => {
          setFormVisible(false);
          setEditingTodo(null);
        }}
        onSubmit={handleSubmitTodo}
      />

      <FilterSelectionSheet
        visible={filterSelectionSheetVisible}
        onDismiss={() => setFilterSelectionSheetVisible(false)}
        onSelectDate={() => {
          setFilterDateSheetVisible(true);
        }}
        onSelectTime={() => {
          setFilterTimeSheetVisible(true);
        }}
      />
      <FilterByDateSheet
        visible={filterDateSheetVisible}
        onDismiss={() => setFilterDateSheetVisible(false)}
        onSwitchToTime={() => {
          setFilterDateSheetVisible(false);
          setFilterTimeSheetVisible(true);
        }}
      />
      <FilterByTimeSheet
        visible={filterTimeSheetVisible}
        onDismiss={() => setFilterTimeSheetVisible(false)}
        onSwitchToDate={() => {
          setFilterTimeSheetVisible(false);
          setFilterDateSheetVisible(true);
        }}
      />
      <SortBySheet
        visible={sortSheetVisible}
        onDismiss={() => setSortSheetVisible(false)}
      />

      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={snackbarType === 'error' ? styles.errorSnackbar : styles.successSnackbar}
          action={{
            label: 'Dismiss',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
        <Snackbar
          visible={deleteSnackbarVisible}
          onDismiss={() => setDeleteSnackbarVisible(false)}
          duration={3000}
          style={styles.successSnackbar}
          action={{
            label: 'Dismiss',
            onPress: () => setDeleteSnackbarVisible(false),
          }}
        >
          Task deleted successfully
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
  },
  title: {
    fontWeight: '700',
    color: Colors.textOnPrimary,
  },
  scrollView: {
    flex: 1,
  },
  loadApiContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  errorContainer: {
    padding: Spacing.md,
    backgroundColor: '#fee2e2',
  },
  retryButton: {
    marginTop: Spacing.sm,
  },
  fabContainer: {
    position: 'absolute',
    bottom: ComponentSizes.tabBarHeight,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  fab: {
    position: 'absolute',
    margin: Spacing.md,
    right: 0,
    bottom: ComponentSizes.tabBarHeight,
    backgroundColor: Colors.primary,
  },
  successSnackbar: {
    backgroundColor: Colors.success,
  },
  errorSnackbar: {
    backgroundColor: Colors.error,
  },
});

export default TasksScreen;
