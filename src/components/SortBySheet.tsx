import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, selectSortOption } from '../slices/todosSlice';
import { SortOption } from '../types';
import { Colors, Spacing, BorderRadius, FontSizes } from '../utils/constants';

interface SortBySheetProps {
  visible: boolean;
  onDismiss: () => void;
}

const SortBySheet: React.FC<SortBySheetProps> = ({ visible, onDismiss }) => {
  const dispatch = useDispatch();
  const sortOption = useSelector(selectSortOption);

  const sortOptions: { label: string; value: SortOption; icon: string }[] = [
    { label: 'Name (A-Z)', value: 'name-asc', icon: 'sort-alphabetical-ascending' },
    { label: 'Name (Z-A)', value: 'name-desc', icon: 'sort-alphabetical-descending' },
    { label: 'Date (Ascending)', value: 'date-asc', icon: 'sort-calendar-ascending' },
    { label: 'Date (Descending)', value: 'date-desc', icon: 'sort-calendar-descending' },
    { label: 'Time (Ascending)', value: 'time-asc', icon: 'sort-clock-ascending' },
    { label: 'Time (Descending)', value: 'time-desc', icon: 'sort-clock-descending' },
  ];

  const handleSelect = (option: SortOption) => {
    dispatch(setSortOption(option));
  };

  const handleReset = () => {
    dispatch(setSortOption('none'));
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
          <Text variant="headlineSmall" style={styles.title}>Sort todos by</Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            style={styles.closeButton}
          />
        </View>

        <View style={styles.optionsContainer}>
          {sortOptions.map((option) => {
            const isSelected = sortOption === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  isSelected && styles.optionItemSelected,
                ]}
                onPress={() => handleSelect(option.value)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <MaterialCommunityIcons
                    name={option.icon}
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
            onPress={handleReset}
            style={styles.resetButton}
            textColor={Colors.primary}
          >
            Reset
          </Button>
          <Button
            mode="contained"
            onPress={handleDone}
            style={styles.doneButton}
            buttonColor={Colors.primary}
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

export default SortBySheet;
