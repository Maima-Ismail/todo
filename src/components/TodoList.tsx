import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedTodos, selectLoading } from '../slices/todosSlice';
import TodoItem from './TodoItem';
import { Todo } from '../types';
import { Colors, Spacing, FontSizes } from '../utils/constants';

interface TodoListProps {
  onEditTodo: (todo: Todo) => void;
  onAddTodo: () => void;
  onFetchFromAPI?: () => void;
  onDeleteTodo?: (todoId: string) => void;
}

const ITEMS_PER_PAGE = 10;

const TodoList: React.FC<TodoListProps> = ({ onEditTodo, onAddTodo, onFetchFromAPI, onDeleteTodo }) => {
  const todos = useSelector(selectFilteredAndSortedTodos);
  const loading = useSelector(selectLoading);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const displayedTodos = todos.slice(0, displayCount);
  const hasMore = todos.length > displayCount;

  // Reset pagination when todos list changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [todos.length]);

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, todos.length));
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (todos.length === 0 && !loading) {
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
              buttonColor={Colors.primary}
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
            Add Task
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onEdit={onEditTodo} onDelete={onDeleteTodo} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          hasMore ? (
            <View style={styles.loadMoreContainer}>
              <Button
                mode="outlined"
                onPress={handleLoadMore}
                style={styles.loadMoreButton}
                textColor={Colors.primary}
              >
                Load More ({todos.length - displayCount} remaining)
              </Button>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  fetchButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
  loadMoreContainer: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  loadMoreButton: {
    borderColor: Colors.primary,
  },
});

export default TodoList;
