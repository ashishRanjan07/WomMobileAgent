import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import PartnerUP from '../Screens/App/PartnerUP/PartnerUP';
import OpenGridProfile from '../Screens/App/PartnerUP/OpenGridProfile';

export default function PartnerUpNavigation() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="PartnerUP" component={PartnerUP} />
        <Stack.Screen name="OpenGridProfile" component={OpenGridProfile} />
      </Stack.Navigator>
    </>
  );
}
