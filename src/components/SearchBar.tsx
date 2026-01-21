import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, selectFilter, selectSortOption } from '../slices/todosSlice';

interface SearchBarProps {
  onFilterPress: () => void;
  onSortPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterPress, onSortPress }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sortOption = useSelector(selectSortOption);
  const [searchQuery, setSearchQuery] = useState('');

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
          iconColor="#6e1e96"
          onClearIconPress={handleClear}
        />
        <View style={styles.actionButtons}>
          <IconButton
            icon="filter"
            iconColor={hasActiveFilter ? '#6e1e96' : '#64748b'}
            size={24}
            onPress={onFilterPress}
            style={[
              styles.actionButton,
              hasActiveFilter && styles.actionButtonActive,
            ]}
          />
          <IconButton
            icon="sort"
            iconColor={hasActiveSort ? '#6e1e96' : '#64748b'}
            size={24}
            onPress={onSortPress}
            style={[
              styles.actionButton,
              hasActiveSort && styles.actionButtonActive,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchbar: {
    flex: 1,
    elevation: 0,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    margin: 0,
  },
  actionButtonActive: {
    backgroundColor: '#f3e8ff',
  },
});

export default SearchBar;
