import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, selectSortOption } from '../slices/todosSlice';
import { SortOption } from '../types';
import { Colors, Spacing, FontSizes } from '../utils/constants';

const SortOptions: React.FC = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector(selectSortOption);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Name ↑', value: 'name-asc' },
    { label: 'Name ↓', value: 'name-desc' },
    { label: 'Date ↑', value: 'date-asc' },
    { label: 'Date ↓', value: 'date-desc' },
    { label: 'Time ↑', value: 'time-asc' },
    { label: 'Time ↓', value: 'time-desc' },
    { label: 'None', value: 'none' },
  ];

  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        Sort By:
      </Text>
      <View style={styles.chipContainer}>
        {sortOptions.map((option) => (
          <Chip
            key={option.value}
            selected={sortOption === option.value}
            onPress={() => dispatch(setSortOption(option.value))}
            style={[
              styles.chip,
              sortOption === option.value && styles.chipSelected,
            ]}
            textStyle={[
              styles.chipText,
              sortOption === option.value && styles.chipTextSelected,
            ]}
            mode={sortOption === option.value ? 'flat' : 'outlined'}
          >
            {option.label}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  label: {
    marginBottom: Spacing.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    borderColor: Colors.divider,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.textOnPrimary,
    fontWeight: '600',
  },
});

export default SortOptions;
