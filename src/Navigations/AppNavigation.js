import React from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Colors from '../Assets/Colors';

import ProfileNavigation from './ProfileNavigation'
import PartnerUpNavigation from './PartnerUpNavigation'
import StatisticsNavigation from './StatisticsNavigation'
import MoreOptionsNavigation from './MoreOptionsNavigation'

export default function AppNavigation() {
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: Colors.black,
                        tabBarHideOnKeyboard: true,
                    }}>

                    <Tab.Screen
                        name="ProfileNavigation"
                        component={ProfileNavigation}
                        options={{
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-circle-outline" color={color} size={size} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="PartnerUpNavigation"
                        component={PartnerUpNavigation}
                        options={{
                            tabBarLabel: 'Partner Up',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="handshake-o" color={color} size={size} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="StatisticsNavigation"
                        component={StatisticsNavigation}
                        options={{
                            tabBarLabel: 'Statistics',
                            tabBarIcon: ({ color, size }) => (
                                <Entypo name="bar-graph" color={color} size={size} />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="MoreOptionsNavigation"
                        component={MoreOptionsNavigation}
                        options={{
                            tabBarLabel: 'More Options',
                            tabBarIcon: ({ color, size }) => (
                                <Entypo name="menu" color={color} size={size} />
                            ),
                        }}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}