import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, FontSizes } from '../utils/constants';

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
          color={Colors.primary} 
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
    paddingHorizontal: Spacing.md + 4,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: Spacing.sm,
  },
  greeting: {
    fontSize: FontSizes.xxl,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  userName: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default Header;
