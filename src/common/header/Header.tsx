import React, {memo, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {createStyles} from './Styles';

function Header() {
  const {theme} = useTheme();
  // Only re-create styles when theme changes
  const styles = useMemo(() => createStyles({colors: theme}), [theme]);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerProfileNameText}>Hello Renzo!</Text>
      <Text style={styles.headerInviteText}>Are you ready to dance?</Text>
    </View>
  );
}

export default memo(Header);
