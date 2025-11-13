import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, { FunctionComponent } from 'react';

import RootStack, { RootStackParamList } from './rootStack';

export const navigationContainerRef =
  createNavigationContainerRef<RootStackParamList>();

const RootNavigator: FunctionComponent = () => (
  <NavigationContainer ref={navigationContainerRef}>
    <RootStack />
  </NavigationContainer>
);

export default RootNavigator;
