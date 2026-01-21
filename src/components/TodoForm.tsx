import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Divider,
  HelperText,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Todo } from '../types';
import { Colors, Spacing, BorderRadius, FontSizes } from '../utils/constants';

interface TodoFormProps {
  visible: boolean;
  todo?: Todo | null;
  onDismiss: () => void;
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  todo,
  onDismiss,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
      setDueDate(new Date(todo.dueDate));
      const [hours, minutes] = todo.dueTime.split(':');
      const timeDate = new Date();
      timeDate.setHours(parseInt(hours, 10));
      timeDate.setMinutes(parseInt(minutes, 10));
      setDueTime(timeDate);
      setCompleted(todo.completed);
      setNameError(false);
    } else {
      setName('');
      setDescription('');
      setDueDate(new Date());
      setDueTime(new Date());
      setCompleted(false);
      setNameError(false);
    }
  }, [todo, visible]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    setNameError(false);
    const formattedDate = dueDate.toISOString().split('T')[0];
    const formattedTime = `${String(dueTime.getHours()).padStart(2, '0')}:${String(dueTime.getMinutes()).padStart(2, '0')}`;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      dueDate: formattedDate,
      dueTime: formattedTime,
      completed: todo ? completed : false,
    });

    onDismiss();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.container}
      style={styles.modal}
    >
        <View>
          <Text variant="headlineSmall" style={styles.title}>
            {todo ? 'Edit Todo' : 'Add New Todo'}
          </Text>
          <Divider style={styles.divider} />

          <TextInput
            label="Todo Name *"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError && text.trim()) {
                setNameError(false);
              }
            }}
            mode="outlined"
            style={styles.input}
            placeholder="Enter todo name"
            error={nameError}
          />
          <HelperText type="error" visible={nameError}>
            Todo name is required
          </HelperText>

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Enter description (optional)"
          />

          <View style={styles.dateTimeContainer}>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              icon="calendar"
              style={styles.dateButton}
            >
              {formatDate(dueDate)}
            </Button>

            <Button
              mode="outlined"
              onPress={() => setShowTimePicker(true)}
              icon="clock-outline"
              style={styles.timeButton}
            >
              {formatTime(dueTime)}
            </Button>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                if (Platform.OS === 'android') {
                  setShowDatePicker(false);
                }
                if (selectedDate) {
                  setDueDate(selectedDate);
                  if (Platform.OS === 'ios') {
                    setShowDatePicker(false);
                  }
                }
              }}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={dueTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                if (Platform.OS === 'android') {
                  setShowTimePicker(false);
                }
                if (selectedTime) {
                  setDueTime(selectedTime);
                  if (Platform.OS === 'ios') {
                    setShowTimePicker(false);
                  }
                }
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              buttonColor={Colors.primary}
              disabled={!name.trim()}
            >
              {todo ? 'Update' : 'Add'}
            </Button>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    margin: Spacing.md + 4,
    borderRadius: BorderRadius.xl,
    width: '90%',
  },
  title: {
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  divider: {
    marginBottom: Spacing.md + 4,
  },
  input: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.background,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dateButton: {
    flex: 1,
    borderColor: Colors.primary,
  },
  timeButton: {
    flex: 1,
    borderColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  cancelButton: {
    borderColor: Colors.divider,
  },
  submitButton: {
  },
});

export default TodoForm;
