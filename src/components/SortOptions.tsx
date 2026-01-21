import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, selectSortOption } from '../slices/todosSlice';
import { SortOption } from '../types';

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
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  label: {
    marginBottom: 8,
    color: '#64748b',
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    borderColor: '#cbd5e1',
  },
  chipSelected: {
    backgroundColor: '#6e1e96',
    borderColor: '#6e1e96',
  },
  chipText: {
    fontSize: 12,
    color: '#64748b',
  },
  chipTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default SortOptions;
