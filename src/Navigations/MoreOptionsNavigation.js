import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import MoreOptions from '../Screens/App/MoreOptions/MoreOptions';
import CustomerList from '../Screens/App/MoreOptions/CustomerList';
import CreateCustomer from '../Screens/App/MoreOptions/CreateCustomer';
import CustomerProfile from '../Screens/App/MoreOptions/CustomerProfile';
import ManagePartnerShip from '../Screens/App/MoreOptions/ManagePartnerShip';
import OpenCompanyProfile from '../Screens/App/MoreOptions/OpenCompanyProfile';


export default function MoreOptionsNavigation() {
    return (
        <>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>

                <Stack.Screen name="MoreOptions" component={MoreOptions} />

                <Stack.Screen name="ManagePartnerShip" component={ManagePartnerShip} />

                <Stack.Screen name="CustomerList" component={CustomerList} />
                <Stack.Screen name="CreateCustomer" component={CreateCustomer} />
                <Stack.Screen name="CustomerProfile" component={CustomerProfile} />

                <Stack.Screen name="OpenCompanyProfile" component={OpenCompanyProfile} />

            </Stack.Navigator>
        </>
    )
}