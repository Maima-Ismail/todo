import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, FAB, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedTodos, selectLoading } from '../slices/todosSlice';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  onEditTodo: (todo: Todo) => void;
  onAddTodo: () => void;
  onFetchFromAPI?: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEditTodo, onAddTodo, onFetchFromAPI }) => {
  const todos = useSelector(selectFilteredAndSortedTodos);
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          No todos found
        </Text>
        <Text variant="bodyMedium" style={styles.emptyText}>
          Add a new todo to get started, or fetch todos from API!
        </Text>
        <View style={styles.buttonContainer}>
          {onFetchFromAPI && (
            <Button
              mode="contained"
              onPress={onFetchFromAPI}
              icon="download"
              style={styles.fetchButton}
              buttonColor="#6366f1"
            >
              Fetch from API
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={onAddTodo}
            icon="plus"
            style={styles.addButton}
          >
            Add Todo
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onEdit={onEditTodo} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={onAddTodo}
        label="Add"
        color="#ffffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingVertical: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    color: '#64748b',
  },
  emptyTitle: {
    color: '#1e293b',
    marginBottom: 8,
    fontWeight: '600',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  fetchButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
  },
});

export default TodoList;
