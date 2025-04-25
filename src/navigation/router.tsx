import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SystemBars} from 'react-native-edge-to-edge';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {useAuthContext} from '../context/AuthContext';
import {isAndroid} from '../utils/ui/UiHelper';
import AuthRouter from './AuthRouter';
import TabRouter from './TabRouter';
import SplashScreen from '../screens/splash_screen/SplashScreen';

const RootStack = createNativeStackNavigator();

function Router() {
  const inset = useSafeAreaInsets();

  const {isLoggedIn, isSplashCompleted} = useAuthContext();

  return (
    <SafeAreaProvider
      style={isAndroid && {paddingBottom: inset.bottom, flex: 1}}>
      <NavigationContainer>
        <SystemBars style={'dark'} />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!isSplashCompleted ? (
            <RootStack.Screen name="Splash" component={SplashScreen} />
          ) : isLoggedIn ? (
            <RootStack.Screen name="MainTabs" component={TabRouter} />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthRouter} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Router;
