import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Profile from '../Screens/App/Profile/Profile'
import EditProfile from '../Screens/App/Profile/EditProfile';

export default function ProfileNavigation() {
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>

                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />

            </Stack.Navigator>
        </>
    )
}