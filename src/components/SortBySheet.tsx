import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text, Button, IconButton, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, selectSortOption } from '../slices/todosSlice';
import { SortOption } from '../types';

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
                    color={isSelected ? '#6e1e96' : '#64748b'}
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
                    color="#6e1e96"
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
            textColor="#6e1e96"
          >
            Reset
          </Button>
          <Button
            mode="contained"
            onPress={handleDone}
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
    maxHeight: '70%',
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
  title: {
    fontWeight: '700',
    color: '#1e293b',
  },
  closeButton: {
    margin: 0,
  },
  optionsContainer: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  optionItemSelected: {
    backgroundColor: '#f3e8ff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    color: '#64748b',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#6e1e96',
    fontWeight: '600',
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

export default SortBySheet;
