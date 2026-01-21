import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, selectFilter } from '../slices/todosSlice';
import { Colors, Spacing, BorderRadius } from '../utils/constants';

interface FilterSelectionSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSelectDate: () => void;
  onSelectTime: () => void;
}

const FilterSelectionSheet: React.FC<FilterSelectionSheetProps> = ({
  visible,
  onDismiss,
  onSelectDate,
  onSelectTime,
}) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const hasActiveFilter = filter.dateTimeFilter !== undefined;

  const filterOptions = [
    { label: 'Filter by Date', value: 'date', icon: 'calendar' },
    { label: 'Filter by Time', value: 'time', icon: 'clock-outline' },
  ];

  const handleSelect = (value: 'date' | 'time') => {
    onDismiss();
    if (value === 'date') {
      onSelectDate();
    } else {
      onSelectTime();
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilter());
  };

  const handleDone = () => {
    onDismiss();
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
              <Text variant="headlineSmall" style={styles.title}>Filter todos by</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onDismiss}
                style={styles.closeButton}
              />
            </View>

            <View style={styles.optionsContainer}>
              {filterOptions.map((option) => {
                const isSelected = filter.dateTimeFilter?.type === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemSelected,
                    ]}
                    onPress={() => handleSelect(option.value as 'date' | 'time')}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionContent}>
                      <MaterialCommunityIcons
                        name={option.icon as any}
                        size={20}
                        color={isSelected ? Colors.primary : Colors.textSecondary}
                        style={styles.optionIcon}
                      />
                      <Text
                        variant="bodyLarge"
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color={Colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.footer}>
              <Button
                mode="outlined"
                onPress={handleClearFilters}
                style={styles.resetButton}
                textColor={Colors.primary}
                disabled={!hasActiveFilter}
              >
                Clear Filters
              </Button>
              <Button
                mode="contained"
                onPress={handleDone}
                style={styles.doneButton}
                buttonColor={Colors.primary}
                textColor={Colors.textOnPrimary}
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
  optionsContainer: {
    paddingVertical: Spacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  optionItemSelected: {
    backgroundColor: Colors.chipBackground,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: Spacing.md,
  },
  optionText: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  resetButton: {
    flex: 1,
    borderColor: Colors.divider,
  },
  doneButton: {
    flex: 1,
  },
});

export default FilterSelectionSheet;
