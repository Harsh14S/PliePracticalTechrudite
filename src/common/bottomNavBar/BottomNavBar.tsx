import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {ICONS} from '../../utils/assets/IconHelper';
import {SCREEN} from '../../utils/navigation/NavigationHelper';
import ButtonWrapper from '../button/ButtonWrapper';
import {createStyles} from './Styles';

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  // Only re-create styles when theme changes
  const styles = useMemo(() => createStyles({colors: theme, insets}), [theme]);

  return (
    <View style={[styles.dashboardTabView]}>
      {state.routes.map((route, index) => {
        let icon = ICONS.search_inactive;
        let filledIcon = ICONS.search_inactive;
        let label = 'Search';

        switch (route.name) {
          case SCREEN.events:
            icon = ICONS.event_inactive;
            filledIcon = ICONS.event_active;
            label = 'Events';
            break;
          case SCREEN.favorites:
            icon = ICONS.favorite_inactive;
            filledIcon = ICONS.favorite_active;
            label = 'Favorites';
            break;
          case SCREEN.profile:
            icon = ICONS.profile_inactive;
            filledIcon = ICONS.profile_inactive;
            label = 'Profile';
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <ButtonWrapper
            key={route.key}
            style={[
              styles.mainView,
              isFocused && {
                ...styles.focusedView,
              },
            ]}
            onPress={onPress}>
            <Animated.View style={[styles.animatedContainer]}>
              <Image
                source={isFocused ? filledIcon : icon}
                style={styles.image}
              />
              <Text style={styles.labelFocused}>{label}</Text>
            </Animated.View>
          </ButtonWrapper>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
