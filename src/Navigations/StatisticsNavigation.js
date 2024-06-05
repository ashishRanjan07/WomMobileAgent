import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Statistics from '../Screens/App/Statistics/Statistics';
import OpenStatisticsProfile from '../Screens/App/Statistics/OpenStatisticsProfile';
import OpenORGProfile from '../Screens/App/Statistics/OpenORGProfile';
import OpenCouponDetails from '../Screens/App/Statistics/OpenCouponDetails';

export default function StatisticsNavigation() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen
          name="OpenStatisticsProfile"
          component={OpenStatisticsProfile}
        />
        <Stack.Screen name="OpenORGProfile" component={OpenORGProfile} />
        <Stack.Screen name="OpenCouponDetails" component={OpenCouponDetails} />
      </Stack.Navigator>
    </>
  );
}
