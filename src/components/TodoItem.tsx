import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Checkbox, Text, IconButton, Chip } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Todo } from '../types';
import { toggleTodo, deleteTodo } from '../slices/todosSlice';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <Card
      style={[
        styles.card,
        todo.completed && styles.cardCompleted,
        isOverdue && !todo.completed && styles.cardOverdue,
      ]}
      mode="elevated"
      elevation={2}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={todo.completed ? 'checked' : 'unchecked'}
              onPress={handleToggle}
              color="#6366f1"
            />
            <TouchableOpacity
              style={styles.contentContainer}
              onPress={handleEdit}
              activeOpacity={0.7}
            >
              <Text
                variant="titleMedium"
                style={[
                  styles.title,
                  todo.completed && styles.titleCompleted,
                ]}
                numberOfLines={2}
              >
                {todo.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              iconColor="#6366f1"
              size={20}
              onPress={handleEdit}
            />
            <IconButton
              icon="delete"
              iconColor="#ef4444"
              size={20}
              onPress={handleDelete}
            />
          </View>
        </View>

        {todo.description && (
          <Text
            variant="bodyMedium"
            style={[
              styles.description,
              todo.completed && styles.descriptionCompleted,
            ]}
            numberOfLines={2}
          >
            {todo.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.dateTimeContainer}>
            <Chip
              icon="calendar"
              style={styles.dateChip}
              textStyle={styles.chipText}
              mode="outlined"
            >
              {new Date(todo.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Chip>
            <Chip
              icon="clock-outline"
              style={styles.timeChip}
              textStyle={styles.chipText}
              mode="outlined"
            >
              {todo.dueTime}
            </Chip>
            {todo.id.startsWith('api-') && (
              <Chip
                icon="download"
                style={styles.apiChip}
                textStyle={styles.apiChipText}
                mode="flat"
              >
                API
              </Chip>
            )}
          </View>
          {isOverdue && !todo.completed && (
            <Chip
              icon="alert"
              style={styles.overdueChip}
              textStyle={styles.overdueChipText}
            >
              Overdue
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  cardCompleted: {
    opacity: 0.7,
    backgroundColor: '#f1f5f9',
  },
  cardOverdue: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontWeight: '600',
    color: '#1e293b',
    fontSize: 16,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  actions: {
    flexDirection: 'row',
  },
  description: {
    color: '#64748b',
    marginLeft: 40,
    marginBottom: 12,
    fontSize: 14,
  },
  descriptionCompleted: {
    color: '#94a3b8',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dateChip: {
    backgroundColor: '#e0e7ff',
    borderColor: '#6366f1',
  },
  timeChip: {
    backgroundColor: '#f3e8ff',
    borderColor: '#8b5cf6',
  },
  chipText: {
    fontSize: 11,
    color: '#6366f1',
  },
  overdueChip: {
    backgroundColor: '#fee2e2',
  },
  overdueChipText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '600',
  },
  apiChip: {
    backgroundColor: '#dbeafe',
  },
  apiChipText: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TodoItem;
