import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DataProvider from './src/context/DataContext';
import {ThemeProvider} from './src/context/ThemeContext';
import Router from './src/navigation/router';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {AuthProvider} from './src/context/AuthContext';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      {/* Redux context */}
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <SafeAreaProvider>
              <Router />
            </SafeAreaProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
