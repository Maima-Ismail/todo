import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setSortOption, setDateTimeFilter, selectFilter, selectSortOption } from '../slices/todosSlice';
import { Colors, Spacing, FontSizes } from '../utils/constants';

const ActiveFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sortOption = useSelector(selectSortOption);

  const hasActiveFilter = filter.dateTimeFilter !== undefined;
  const hasActiveSort = sortOption !== 'none';

  if (!hasActiveFilter && !hasActiveSort) {
    return null;
  }

  const getSortLabel = (option: string) => {
    const labels: { [key: string]: string } = {
      'name-asc': 'Name (A-Z)',
      'name-desc': 'Name (Z-A)',
      'date-asc': 'Date ↑',
      'date-desc': 'Date ↓',
      'time-asc': 'Time ↑',
      'time-desc': 'Time ↓',
    };
    return labels[option] || option;
  };

  const getFilterLabel = () => {
    if (filter.dateTimeFilter) {
      const value = filter.dateTimeFilter.value;
      // Handle old range format for backward compatibility
      const displayValue = value.includes(' to ') ? value.split(' to ')[0] : value;
      return `${filter.dateTimeFilter.type}: ${displayValue}`;
    }
    return `${filter.type}: ${filter.value}`;
  };

  return (
    <View style={styles.container}>
      {hasActiveFilter && (
        <View style={styles.section}>
          <Text variant="labelMedium" style={styles.sectionTitle}>Active Filter:</Text>
          <Chip
            icon="filter"
            onClose={() => {
              // Clear date/time filter, keep name filter if exists
              if (filter.dateTimeFilter) {
                dispatch(setDateTimeFilter({ type: filter.dateTimeFilter.type, value: '' }));
              } else {
                dispatch(clearFilter());
              }
            }}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {getFilterLabel()}
          </Chip>
        </View>
      )}
      {hasActiveSort && (
        <View style={styles.section}>
          <Text variant="labelMedium" style={styles.sectionTitle}>Active Sort:</Text>
          <Chip
            icon="sort"
            onClose={() => dispatch(setSortOption('none'))}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {getSortLabel(sortOption)}
          </Chip>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    marginRight: Spacing.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chip: {
    backgroundColor: Colors.chipBackground,
    borderColor: Colors.chipBorder,
    borderWidth: 1,
  },
  chipText: {
    color: Colors.chipText,
    fontSize: FontSizes.sm,
  },
});

export default ActiveFilters;
