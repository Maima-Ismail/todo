import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native-paper';
import Header from '../components/Header';
import AnalyticsCard from '../components/AnalyticsCard';
import EmptyState from '../components/EmptyState';
import TodoItem from '../components/TodoItem';
import { selectAllTodos } from '../slices/todosSlice';
import { Todo } from '../types';
import { lightTheme } from '../utils/theme';
import { Colors, Spacing } from '../utils/constants';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const allTodos = useSelector(selectAllTodos);

  const analytics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    const todaysTasks = allTodos.filter((todo: Todo) => todo.dueDate === today);
    const fetchedTasks = allTodos.filter((todo: Todo) => todo.id.startsWith('api-'));
    const completedTasks = allTodos.filter((todo: Todo) => todo.completed);

    return {
      todaysTasks: todaysTasks.length,
      fetchedTasks: fetchedTasks.length,
      completedTasks: completedTasks.length,
      todaysTasksList: todaysTasks.filter((todo: Todo) => !todo.completed),
    };
  }, [allTodos]);

  const hasNoTasks = allTodos.length === 0;
  const hasTodaysTasks = analytics.todaysTasksList.length > 0;

  const handleAddTask = () => {
    (navigation as any).navigate('Tasks');
  };

  const handleEditTodo = (todo: Todo) => {
    (navigation as any).navigate('Tasks', { editTodo: todo });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top']} >
        <Header userName="User" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {hasNoTasks ? (
            <EmptyState
              message="Schedule your day"
              buttonText="Add Task"
              onButtonPress={handleAddTask}
            />
          ) : (
            <View style={styles.content}>
              <View style={styles.analyticsContainer}>
                <AnalyticsCard
                  title="Today's Tasks"
                  value={analytics.todaysTasks}
                  icon="calendar-today"
                  color={lightTheme.colors.primary}
                />
                <AnalyticsCard
                  title="Fetched Tasks"
                  value={analytics.fetchedTasks}
                  icon="download"
                  color={lightTheme.colors.secondary}
                />
                <AnalyticsCard
                  title="Completed Tasks"
                  value={analytics.completedTasks}
                  icon="check-circle"
                  color="#10b981"
                />
              </View>

              {hasTodaysTasks ? (
                <View style={styles.todaysTasksSection}>
                  <Text variant="titleLarge" style={styles.sectionTitle}>
                    Today's Tasks
                  </Text>
                  {analytics.todaysTasksList.slice(0, 5).map((todo: Todo) => (
                    <TodoItem key={todo.id} todo={todo} onEdit={handleEditTodo} />
                  ))}
                  {analytics.todaysTasksList.length > 5 && (
                    <Button
                      mode="text"
                      onPress={handleAddTask}
                      textColor={Colors.primary}
                      style={styles.viewAllButton}
                    >
                      View All Tasks
                    </Button>
                  )}
                </View>
              ) : (
                <View style={styles.emptyTodayContainer}>
                  <Text variant="titleMedium" style={styles.sectionTitle}>
                    Manage your today's tasks now
                  </Text>
                  <Text variant="bodyMedium" style={styles.emptyTodayText}>
                    You don't have any tasks scheduled for today. Add a task to get started!
                  </Text>
                  <Button
                    mode="contained"
                    onPress={handleAddTask}
                    buttonColor={Colors.primary}
                  >
                    Add Task
                  </Button>
                </View>

              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  content: {
    flex: 1,
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  todaysTasksSection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptyTodayContainer: {
    marginTop: Spacing.xl,
  },
  emptyTodayText: {
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  viewAllButton: {
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
});

export default HomeScreen;
