import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import AnalyticsCard from '../components/AnalyticsCard';
import EmptyState from '../components/EmptyState';
import { selectAllTodos } from '../slices/todosSlice';
import { Todo } from '../types';
import { lightTheme } from '../utils/theme';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const allTodos = useSelector(selectAllTodos);

  // Calculate analytics
  const analytics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    const todaysTasks = allTodos.filter((todo: Todo) => todo.dueDate === today);
    const fetchedTasks = allTodos.filter((todo: Todo) => todo.id.startsWith('api-'));
    const completedTasks = allTodos.filter((todo: Todo) => todo.completed);

    return {
      todaysTasks: todaysTasks.length,
      fetchedTasks: fetchedTasks.length,
      completedTasks: completedTasks.length,
    };
  }, [allTodos]);

  const hasNoTasks = allTodos.length === 0;

  const handleAddTask = () => {
    // Navigate to Tasks screen or open add task modal
    // For now, we'll just navigate to Tasks tab
    (navigation as any).navigate('Tasks');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Test Icon - Remove after verification */}
        <View style={styles.testIconContainer}>
          <MaterialCommunityIcons 
            name="check-circle" 
            size={32} 
            color={lightTheme.colors.primary} 
          />
          <Text style={styles.testIconText}>Icon Test: If you see a checkmark, icons are working!</Text>
        </View>
        
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  testIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  testIconText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
});

export default HomeScreen;
