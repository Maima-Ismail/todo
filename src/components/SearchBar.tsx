import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, selectFilter, selectSortOption, selectAllTodos } from '../slices/todosSlice';
import { Colors, Spacing, FontSizes, BorderRadius } from '../utils/constants';

interface SearchBarProps {
  onFilterPress: () => void;
  onSortPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterPress, onSortPress }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sortOption = useSelector(selectSortOption);
  const allTodos = useSelector(selectAllTodos);
  const [searchQuery, setSearchQuery] = useState('');
  
  const hasTodos = allTodos.length > 0;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Search by name or description on the filtered list
    dispatch(setNameFilter(query.trim()));
  };

  const handleClear = () => {
    setSearchQuery('');
    dispatch(setNameFilter(''));
  };

  const hasActiveFilter = filter.dateTimeFilter !== undefined;
  const hasActiveSort = sortOption !== 'none';

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Searchbar
          placeholder="Search by name or description..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor={Colors.primary}
          onClearIconPress={handleClear}
        />
        <View style={styles.actionButtons}>
          <IconButton
            icon="filter"
            iconColor={hasActiveFilter ? Colors.primary : Colors.textSecondary}
            size={24}
            onPress={onFilterPress}
            disabled={!hasTodos}
            style={[
              styles.actionButton,
              hasActiveFilter && styles.actionButtonActive,
              !hasTodos && styles.actionButtonDisabled,
            ]}
          />
          <IconButton
            icon="sort"
            iconColor={hasActiveSort ? Colors.primary : Colors.textSecondary}
            size={24}
            onPress={onSortPress}
            disabled={!hasTodos}
            style={[
              styles.actionButton,
              hasActiveSort && styles.actionButtonActive,
              !hasTodos && styles.actionButtonDisabled,
            ]}
          />
        </View>
      </View>
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchbar: {
    flex: 1,
    elevation: 0,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
  },
  searchInput: {
    fontSize: FontSizes.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionButton: {
    margin: 0,
  },
  actionButtonActive: {
    backgroundColor: Colors.chipBackground,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
});

export default SearchBar;
