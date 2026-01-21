import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Chip, Menu, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilter, selectFilter } from '../slices/todosSlice';
import { FilterType } from '../types';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const [searchQuery, setSearchQuery] = useState(filter.value);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      dispatch(setFilter({ type: filter.type !== 'none' ? filter.type : 'name', value: query }));
    } else {
      dispatch(clearFilter());
    }
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterMenuVisible(false);
    if (searchQuery.trim()) {
      dispatch(setFilter({ type, value: searchQuery }));
    } else {
      dispatch(setFilter({ type, value: '' }));
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    dispatch(clearFilter());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search todos..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor="#6366f1"
          onClearIconPress={handleClear}
        />
        <Menu
          visible={filterMenuVisible}
          onDismiss={() => setFilterMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setFilterMenuVisible(true)}
              style={styles.filterButton}
              icon="filter"
              contentStyle={styles.filterButtonContent}
            >
              {filter.type !== 'none' ? filter.type : 'Filter'}
            </Button>
          }
        >
          <Menu.Item onPress={() => handleFilterTypeChange('name')} title="By Name" />
          <Menu.Item onPress={() => handleFilterTypeChange('date')} title="By Date" />
          <Menu.Item onPress={() => handleFilterTypeChange('time')} title="By Time" />
          <Menu.Item onPress={() => handleFilterTypeChange('none')} title="None" />
        </Menu>
      </View>
      {filter.type !== 'none' && filter.value && (
        <View style={styles.chipContainer}>
          <Chip
            icon="close"
            onClose={handleClear}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {filter.type}: {filter.value}
          </Chip>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  searchbar: {
    flex: 1,
    elevation: 2,
    backgroundColor: '#f8fafc',
  },
  searchInput: {
    fontSize: 14,
  },
  filterButton: {
    borderColor: '#6366f1',
  },
  filterButtonContent: {
    flexDirection: 'row',
  },
  chipContainer: {
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#e0e7ff',
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#6366f1',
  },
});

export default SearchBar;
