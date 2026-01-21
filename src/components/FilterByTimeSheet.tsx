import React, { useState } from 'react';
import { View, StyleSheet, Platform, Modal } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { setDateTimeFilter, clearFilter, selectFilter } from '../slices/todosSlice';

interface FilterByTimeSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSwitchToDate?: () => void;
}

const FilterByTimeSheet: React.FC<FilterByTimeSheetProps> = ({ visible, onDismiss, onSwitchToDate }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      if (date) {
        setSelectedTime(date);
      }
    } else {
      if (date) {
        setSelectedTime(date);
      }
    }
  };

  const handleClear = () => {
    setSelectedTime(new Date());
    // Clear time filter, keep name filter if exists
    dispatch(setDateTimeFilter({ type: 'time', value: '' }));
  };

  const handleApply = () => {
    const hours = String(selectedTime.getHours()).padStart(2, '0');
    const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
    const timeValue = `${hours}:${minutes}`;
    dispatch(setDateTimeFilter({ type: 'time', value: timeValue }));
    onDismiss();
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
        transparent
        animationType="slide"
        onRequestClose={onDismiss}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text variant="headlineSmall" style={styles.title}>Time</Text>
            <View style={styles.headerActions}>
              {onSwitchToDate && (
                <Button
                  mode="text"
                  onPress={onSwitchToDate}
                  textColor="#6e1e96"
                  icon="calendar"
                  style={styles.switchButton}
                >
                  Date
                </Button>
              )}
              <Button
                mode="text"
                onPress={handleClear}
                textColor="#6e1e96"
                style={styles.clearButton}
              >
                Clear
              </Button>
            </View>
          </View>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            style={styles.closeButton}
          />
        </View>

        <View style={styles.timePickerContainer}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
            style={styles.timePicker}
            textColor="#1e293b"
          />
          {Platform.OS === 'ios' && (
            <Text variant="bodyLarge" style={styles.timeDisplay}>
              {formatTime(selectedTime)}
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Button
            mode="outlined"
            onPress={handleClear}
            style={styles.resetButton}
            textColor="#6e1e96"
          >
            Reset
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.doneButton}
            buttonColor="#6e1e96"
            textColor="#ffffff"
          >
            Done
          </Button>
        </View>
      </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchButton: {
    marginRight: 8,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  closeButton: {
    margin: 0,
  },
  timePickerContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  timePicker: {
    width: Platform.OS === 'ios' ? 200 : '100%',
  },
  timeDisplay: {
    marginTop: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  resetButton: {
    flex: 1,
    borderColor: '#cbd5e1',
  },
  doneButton: {
    flex: 1,
  },
});

export default FilterByTimeSheet;
