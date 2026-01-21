import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Modal, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { setDateTimeFilter, selectFilter } from '../slices/todosSlice';
import { Colors, Spacing, BorderRadius, FontSizes } from '../utils/constants';

interface FilterByTimeSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSwitchToDate?: () => void;
}

const FilterByTimeSheet: React.FC<FilterByTimeSheetProps> = ({ visible, onDismiss, onSwitchToDate }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Initialize with existing filter if present, or default to current time
  useEffect(() => {
    if (visible) {
      if (filter.dateTimeFilter && filter.dateTimeFilter.type === 'time' && filter.dateTimeFilter.value) {
        // Parse time value (format: "HH:MM")
        const [hours, minutes] = filter.dateTimeFilter.value.split(':');
        const time = new Date();
        time.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        setSelectedTime(time);
      } else {
        // Default to current time
        setSelectedTime(new Date());
      }
      setShowTimePicker(false);
    }
  }, [visible, filter.dateTimeFilter]);

  const handleTimeChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedTime(date);
    }
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
              <Text variant="headlineSmall" style={styles.title}>Filter by Time</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onDismiss}
                style={styles.closeButton}
              />
            </View>

            <View style={styles.timePickerContainer}>
              {!showTimePicker ? (
                <TouchableOpacity
                  style={styles.timeDisplayButton}
                  onPress={() => {
                    if (Platform.OS === 'android') {
                      setShowTimePicker(true);
                    } else {
                      setShowTimePicker(true);
                    }
                  }}
                >
                  <Text variant="titleLarge" style={styles.timeDisplayText}>
                    {formatTime(selectedTime)}
                  </Text>
                  <Text variant="bodyMedium" style={styles.timeDisplayHint}>
                    Tap to select time
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  {Platform.OS === 'ios' ? (
                    <View style={styles.pickerContainer}>
                      <DateTimePicker
                        value={selectedTime}
                        mode="time"
                        display="spinner"
                        onChange={handleTimeChange}
                        style={styles.iosPicker}
                      />
                      <View style={styles.pickerActions}>
                        <Button
                          mode="text"
                          onPress={() => setShowTimePicker(false)}
                          textColor={Colors.primary}
                        >
                          Done
                        </Button>
                      </View>
                    </View>
                  ) : (
                    <DateTimePicker
                      value={selectedTime}
                      mode="time"
                      display="default"
                      onChange={(event, date) => {
                        setShowTimePicker(false);
                        if (event.type === 'set' && date) {
                          setSelectedTime(date);
                        } else if (event.type === 'dismissed') {
                          setShowTimePicker(false);
                        }
                      }}
                    />
                  )}
                </>
              )}
            </View>

            <View style={styles.footer}>
              <Button
                mode="contained"
                onPress={handleApply}
                style={styles.doneButton}
                buttonColor={Colors.primary}
                textColor={Colors.textOnPrimary}
                disabled={!selectedTime}
              >
                Apply Filter
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
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeButton: {
    margin: 0,
  },
  timePickerContainer: {
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDisplayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    width: '100%',
  },
  timeDisplayText: {
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  timeDisplayHint: {
    color: Colors.textSecondary,
  },
  pickerContainer: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    width: '100%',
  },
  iosPicker: {
    width: '100%',
    height: 200,
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
  footer: {
    padding: Spacing.md,
marginBottom: Spacing.lg,
  },
  doneButton: {
    width: '100%',
  },
});

export default FilterByTimeSheet;
