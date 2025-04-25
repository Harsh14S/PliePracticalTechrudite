import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import EventsScreen from '../screens/events_screen/EventsScreen';
import {bottomTabData, SCREEN} from '../utils/navigation/NavigationHelper';
import CustomTabBar from '../common/bottomNavBar/BottomNavBar';
import {View} from 'react-native';
import FavoritesScreen from '../screens/favorite_screen/FavoritesScreen';

const Tab = createBottomTabNavigator();

function TabRouter(): React.ReactElement {
  const screenComponents = {
    [SCREEN.search]: () => <View></View>,
    [SCREEN.events]: EventsScreen,
    [SCREEN.favorites]: FavoritesScreen,
    [SCREEN.profile]: () => <View></View>,
  };

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
      initialRouteName={SCREEN.events}>
      {bottomTabData.map((item, index) => {
        const ScreenComponent = screenComponents[item.screenName];
        if (!ScreenComponent) {
          return null;
        }
        return (
          <Tab.Screen
            key={index}
            name={item.screenName}
            component={ScreenComponent}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default TabRouter;
