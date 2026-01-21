import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, Button, Menu, Portal, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { fetchTodosFromAPI, addTodo, updateTodo, selectError, selectLoading, selectAllTodos } from '../slices/todosSlice';
import { Todo } from '../types';

const TasksScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const allTodos = useSelector(selectAllTodos);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

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
    } else {
      dispatch(addTodo(todoData));
    }
    setFormVisible(false);
    setEditingTodo(null);
  };

  const handleFetchFromAPI = async () => {
    setMenuVisible(false);
    const countBefore = allTodos.length;
    
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
    <SafeAreaView style={styles.container}>
      <Header userName="User" />
      <Appbar.Header style={styles.header} elevated>
        <Appbar.Content title="Tasks" titleStyle={styles.title} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setMenuVisible(true)}
              color="#ffffff"
            />
          }
        >
          <Menu.Item
            onPress={handleFetchFromAPI}
            title="Fetch from API"
            leadingIcon="download"
          />
        </Menu>
      </Appbar.Header>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SearchBar />
        <SortOptions />

        {error && (
          <View style={styles.errorContainer}>
            <Button
              mode="contained-tonal"
              onPress={handleFetchFromAPI}
              loading={loading}
              icon="refresh"
              style={styles.retryButton}
            >
              Retry Fetch from API
            </Button>
          </View>
        )}

        <TodoList 
          onEditTodo={handleEditTodo} 
          onAddTodo={handleAddTodo}
          onFetchFromAPI={handleFetchFromAPI}
        />
      </ScrollView>

      <View style={styles.fabContainer}>
        <Button
          mode="contained"
          onPress={handleAddTodo}
          style={styles.fab}
          contentStyle={styles.fabContent}
          icon="plus"
        >
          Add Task
        </Button>
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
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#6366f1',
  },
  title: {
    fontWeight: '700',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fee2e2',
  },
  retryButton: {
    marginTop: 8,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  fab: {
    borderRadius: 12,
    backgroundColor: '#6366f1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  successSnackbar: {
    backgroundColor: '#10b981',
  },
  errorSnackbar: {
    backgroundColor: '#ef4444',
  },
});

export default TasksScreen;
