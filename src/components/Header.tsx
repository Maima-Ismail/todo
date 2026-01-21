import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightTheme } from '../utils/theme';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = 'User' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons 
          name="hand-wave" 
          size={24} 
          color={lightTheme.colors.primary} 
          style={styles.icon}
        />
        <Text style={styles.greeting}>
          Hi, <Text style={styles.userName}>{userName}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  userName: {
    color: lightTheme.colors.primary,
    fontWeight: '700',
  },
});

export default Header;
