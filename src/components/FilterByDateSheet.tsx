import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Modal, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { setDateTimeFilter, selectFilter } from '../slices/todosSlice';
import { Colors, Spacing, BorderRadius } from '../utils/constants';

interface FilterByDateSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSwitchToTime?: () => void;
}

const FilterByDateSheet: React.FC<FilterByDateSheetProps> = ({ visible, onDismiss, onSwitchToTime }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (visible) {
      if (filter.dateTimeFilter && filter.dateTimeFilter.type === 'date' && filter.dateTimeFilter.value) {
        const dateValue = filter.dateTimeFilter.value;
        const dateStr = dateValue.includes(' to ') ? dateValue.split(' to ')[0] : dateValue;
        setSelectedDate(new Date(dateStr));
      } else {
        const today = new Date();
        today.setHours(12, 0, 0, 0);
        setSelectedDate(today);
      }
      setShowDatePicker(false);
    }
  }, [visible, filter.dateTimeFilter]);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleApply = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      dispatch(setDateTimeFilter({ type: 'date', value: dateStr }));
    }
    onDismiss();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
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
              <Text variant="headlineSmall" style={styles.title}>Filter by Date</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onDismiss}
                style={styles.closeButton}
              />
            </View>

            <View style={styles.datePickerContainer}>
              {!showDatePicker ? (
                <TouchableOpacity
                  style={styles.dateDisplayButton}
                  onPress={() => {
                    if (Platform.OS === 'android') {
                      setShowDatePicker(true);
                    } else {
                      setShowDatePicker(true);
                    }
                  }}
                >
                  <Text variant="titleLarge" style={styles.dateDisplayText}>
                    {selectedDate ? formatDate(selectedDate) : 'Select date'}
                  </Text>
                  <Text variant="bodyMedium" style={styles.dateDisplayHint}>
                    Tap to select date
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  {Platform.OS === 'ios' ? (
                    <View style={styles.pickerContainer}>
                      <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                        style={styles.iosPicker}
                      />
                      <View style={styles.pickerActions}>
                        <Button
                          mode="text"
                          onPress={() => setShowDatePicker(false)}
                          textColor={Colors.primary}
                        >
                          Done
                        </Button>
                      </View>
                    </View>
                  ) : (
                    <DateTimePicker
                      value={selectedDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (event.type === 'set' && date) {
                          setSelectedDate(date);
                        } else if (event.type === 'dismissed') {
                          setShowDatePicker(false);
                        }
                      }}
                      minimumDate={new Date()}
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
                disabled={!selectedDate}
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
  datePickerContainer: {
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDisplayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    width: '100%',
  },
  dateDisplayText: {
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  dateDisplayHint: {
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

export default FilterByDateSheet;
