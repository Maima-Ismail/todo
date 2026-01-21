import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton, Chip } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Todo } from '../types';
import { toggleTodo, deleteTodo } from '../slices/todosSlice';
import { Colors, Spacing, FontSizes, BorderRadius, ComponentSizes } from '../utils/constants';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete?: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(todo.id);
    } else {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  return (
    <Card
      style={[
        styles.card,
        todo.completed && styles.cardCompleted,
      ]}
      mode="elevated"
      elevation={2}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={handleToggle} activeOpacity={0.7} style={styles.checkboxTouchable}>
              <View style={[
                styles.checkboxCircle,
                todo.completed && styles.checkboxCircleCompleted,
              ]}>
                {todo.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
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
              iconColor={Colors.primary}
              size={20}
              onPress={handleEdit}
              style={{
                margin: 0,
              }}
            />
            <IconButton
              icon="delete"
              iconColor={Colors.error}
              size={20}
              onPress={handleDelete}
              style={{
                margin: 0,
              }}
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
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
  },
  cardCompleted: {
    opacity: 0.8,
    backgroundColor: Colors.surfaceVariant,
  },
  checkboxCircle: {
    width: ComponentSizes.checkboxSize,
    height: ComponentSizes.checkboxSize,
    borderRadius: ComponentSizes.checkboxSize / 2,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  checkboxCircleCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.textOnPrimary,
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxTouchable: {
    marginRight: Spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textTertiary,
  },
  actions: {
    flexDirection: 'row',
  },
  description: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  descriptionCompleted: {
    color: Colors.textTertiary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  dateChip: {
    backgroundColor: '#e0e7ff',
    borderColor: Colors.primary,
  },
  timeChip: {
    backgroundColor: Colors.chipBackground,
    borderColor: Colors.primaryLight,
  },
  chipText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
  },
  apiChip: {
    backgroundColor: '#dbeafe',
  },
  apiChipText: {
    color: Colors.info,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});

export default TodoItem;
