import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6e1e96',
    secondary: '#8b5cf6',
    tertiary: '#a855f7',
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceVariant: '#f1f5f9',
    error: '#ef4444',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onBackground: '#1e293b',
    onSurface: '#1e293b',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6e1e96',
    secondary: '#8b5cf6',
    tertiary: '#a855f7',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#334155',
    error: '#f87171',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onBackground: '#f1f5f9',
    onSurface: '#f1f5f9',
  },
};
