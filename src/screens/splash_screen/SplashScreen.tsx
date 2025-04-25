import React, {useEffect, useMemo} from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {ICONS} from '../../utils/assets/IconHelper';
import {createStyles} from './Styles';
import {useAuthContext} from '../../context/AuthContext';
import {rehydrateAuth} from '../../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';

function SplashScreen() {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  const {setIsSplashCompleted, setIsLoggedIn} = useAuthContext();
  const {loading, token} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  async function initializeData() {
    dispatch(rehydrateAuth());
    setTimeout(() => {
      setIsSplashCompleted(true);
    }, 1500);
  }
  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (token) {
      setIsSplashCompleted(true);
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Image source={ICONS.logo} style={styles.logoIcon} />
    </View>
  );
}

export default SplashScreen;
