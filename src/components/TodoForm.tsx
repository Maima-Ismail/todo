import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Divider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Todo } from '../types';

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
    } else {
      setName('');
      setDescription('');
      setDueDate(new Date());
      setDueTime(new Date());
      setCompleted(false);
    }
  }, [todo, visible]);

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }

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
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.title}>
            {todo ? 'Edit Todo' : 'Add New Todo'}
          </Text>
          <Divider style={styles.divider} />

          <TextInput
            label="Todo Name *"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            placeholder="Enter todo name"
          />

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
              style={styles.submitButton}
              disabled={!name.trim()}
            >
              {todo ? 'Update' : 'Add'}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 24,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  title: {
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  dateButton: {
    flex: 1,
    borderColor: '#6e1e96',
  },
  timeButton: {
    flex: 1,
    borderColor: '#6e1e96',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  cancelButton: {
    borderColor: '#cbd5e1',
  },
  submitButton: {
    backgroundColor: '#6e1e96',
  },
});

export default TodoForm;
