// ThemeContext.js
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import lightTheme from '../theme/LightTheme';
import {
  ASYNC_KEYS,
  asyncGetData,
  asyncStoreData,
} from '../utils/store/AsyncStorageHelper';

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({children}: PropsWithChildren<{}>) => {
  const [isDark, setIsDark] = useState(false); // systemScheme === 'dark'
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from storage on mount
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await asyncGetData(ASYNC_KEYS.app_theme);
        if (storedTheme !== null) {
          setIsDark(storedTheme === 'dark');
        }
      } catch (e) {
        console.warn('Failed to load theme', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredTheme();
  }, []);

  // Save theme to storage when changed
  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    try {
      await asyncStoreData(ASYNC_KEYS.app_theme, newIsDark ? 'dark' : 'light');
    } catch (e) {
      console.warn('Failed to save theme', e);
    }
  };

  const theme = useMemo(() => (isDark ? lightTheme : lightTheme), [isDark]);

  if (isLoading) return null; // or splash/loading screen

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useUser must be used within a ThemeProvider');
  }
  return context;
};
