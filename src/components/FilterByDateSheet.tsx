import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { setDateTimeFilter, clearFilter, selectFilter } from '../slices/todosSlice';

interface FilterByDateSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSwitchToTime?: () => void;
}

const FilterByDateSheet: React.FC<FilterByDateSheetProps> = ({ visible, onDismiss, onSwitchToTime }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    // Clear date filter, keep name filter if exists
    dispatch(setDateTimeFilter({ type: 'date', value: '' }));
  };

  const handleApply = () => {
    if (selectedStartDate) {
      const startStr = selectedStartDate.toISOString().split('T')[0];
      if (selectedEndDate) {
        const endStr = selectedEndDate.toISOString().split('T')[0];
        dispatch(setDateTimeFilter({ type: 'date', value: `${startStr} to ${endStr}` }));
      } else {
        dispatch(setDateTimeFilter({ type: 'date', value: startStr }));
      }
    }
    onDismiss();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        transparent
        animationType="slide"
        onRequestClose={onDismiss}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text variant="headlineSmall" style={styles.title}>Dates</Text>
                <View style={styles.headerActions}>
                  {onSwitchToTime && (
                    <Button
                      mode="text"
                      onPress={onSwitchToTime}
                      textColor="#6e1e96"
                      icon="clock-outline"
                      style={styles.switchButton}
                    >
                      Time
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

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.dateSelectionContainer}>
            <View style={styles.dateSection}>
              <Text variant="labelLarge" style={styles.sectionLabel}>Start Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartPicker(true)}
              >
                <Text variant="bodyLarge" style={styles.dateButtonText}>
                  {selectedStartDate ? formatDate(selectedStartDate) : 'Select start date'}
                </Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={selectedStartDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowStartPicker(false);
                    if (date) {
                      setSelectedStartDate(date);
                      if (!selectedEndDate || date > selectedEndDate) {
                        setSelectedEndDate(null);
                      }
                    }
                  }}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.dateSection}>
              <Text variant="labelLarge" style={styles.sectionLabel}>End Date (Optional)</Text>
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  !selectedStartDate && styles.dateButtonDisabled,
                ]}
                onPress={() => selectedStartDate && setShowEndPicker(true)}
                disabled={!selectedStartDate}
              >
                <Text variant="bodyLarge" style={[
                  styles.dateButtonText,
                  !selectedStartDate && styles.dateButtonTextDisabled,
                ]}>
                  {selectedEndDate ? formatDate(selectedEndDate) : 'Select end date'}
                </Text>
              </TouchableOpacity>
              {showEndPicker && selectedStartDate && (
                <DateTimePicker
                  value={selectedEndDate || selectedStartDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowEndPicker(false);
                    if (date && date >= selectedStartDate) {
                      setSelectedEndDate(date);
                    }
                  }}
                  minimumDate={selectedStartDate}
                />
              )}
            </View>
          </View>
        </ScrollView>

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
            disabled={!selectedStartDate}
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
    maxHeight: '90%',
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
  scrollView: {
    flex: 1,
  },
  dateSelectionContainer: {
    padding: 16,
  },
  dateSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    marginBottom: 8,
    color: '#64748b',
    fontWeight: '600',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  dateButtonDisabled: {
    opacity: 0.5,
  },
  dateButtonText: {
    color: '#1e293b',
    fontWeight: '500',
  },
  dateButtonTextDisabled: {
    color: '#94a3b8',
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

export default FilterByDateSheet;
