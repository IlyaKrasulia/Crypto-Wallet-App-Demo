import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Referal } from 'screens/referral';
import { Home } from 'screens/home';
import { Staking } from 'screens/staking';
import { RootStackParamList } from './rootStack';
import TabBar from './components/TabBar';

export type MainTabsParamList = {
  Home: undefined;
  Staking: undefined;
  Referal: undefined;
};

export type MainTabsNavigationProp<RouteName extends keyof MainTabsParamList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, RouteName>,
    StackNavigationProp<RootStackParamList>
  >;

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
  const tabBar = useCallback(
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props: BottomTabBarProps) => <TabBar {...props} />,
    [],
  );

  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Staking'}
        component={Staking}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={'Referal'}
        component={Referal}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
