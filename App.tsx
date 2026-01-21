import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './src/store';
import { lightTheme } from './src/utils/theme';
import HomeScreen from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={lightTheme}>
          <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
            <HomeScreen />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
