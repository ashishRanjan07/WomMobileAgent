import React from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Colors from '../Assets/Colors';
import ForgotPass from '../Screens/Auth/ForgotPass';
import SignUpProfitPrice from '../Screens/Auth/SignUpProfitPrice';
import SignUpUploadDocuments from '../Screens/Auth/SignUpUploadDocuments';
import CreatePassword from '../Screens/Auth/CreatePassword';


export default function AuthNavigation() {
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>

                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />

                    {/* <Stack.Screen name="SignUpProfitPrice" component={SignUpProfitPrice} /> */}
                    {/* <Stack.Screen name="SignUpUploadDocuments" component={SignUpUploadDocuments} /> */}

                    <Stack.Screen name="ForgotPass" component={ForgotPass} />
                    <Stack.Screen name="CreatePassword" component={CreatePassword} />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}