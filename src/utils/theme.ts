import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Colors } from './constants';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    tertiary: Colors.tertiary,
    background: Colors.background,
    surface: Colors.surface,
    surfaceVariant: Colors.surfaceVariant,
    error: Colors.error,
    onPrimary: Colors.textOnPrimary,
    onSecondary: Colors.textOnPrimary,
    onBackground: Colors.textPrimary,
    onSurface: Colors.textPrimary,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    tertiary: Colors.tertiary,
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#334155',
    error: '#f87171',
    onPrimary: Colors.textOnPrimary,
    onSecondary: Colors.textOnPrimary,
    onBackground: '#f1f5f9',
    onSurface: '#f1f5f9',
  },
};
