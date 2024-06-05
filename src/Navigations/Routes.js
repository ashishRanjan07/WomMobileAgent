import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { AuthContext } from '../Component/Context';
import Splash from '../Screens/Auth/Splash'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import SignUpProfitPrice from '../Screens/Auth/SignUpProfitPrice';
import SignUpUploadDocuments from '../Screens/Auth/SignUpUploadDocuments';

export default function Routaes() {

    const initialLoginState = {
        isLoading: true,
        details: null,
        userToken: null,
        agentID: null,
        step: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    details: action.details,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    agentID: null,
                    step: null,
                    isLoading: false,
                };
            case 'SIGNUP_DETAIL':
                return {
                    ...prevState,
                    agentID: action.id,
                    step: action.step,
                    isLoading: false,
                };
            case 'SIGN_STEP':
                return {
                    ...prevState,
                    agentID: action.id,
                    step: action.step,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (token, details) => {
            const userToken = token;
            const userName = JSON.stringify(details);

            try {
                await AsyncStorage.setItem('token', userToken);
                await AsyncStorage.setItem('details', userName);

                dispatch({ type: 'LOGIN', id: userName, token: userToken });

            } catch (e) {
                Toast.show({
                    type: 'error',
                    text1: 'SIGNIN ROUTES'
                })
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('step');
            } catch (e) {
                console.log(e);
                Toast.show({
                    type: 'error',
                    text1: 'SIGN OUT ROUTES'
                })
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp_Details: async (agentID, step) => {

            try {
                await AsyncStorage.setItem('agentID', agentID);

                await AsyncStorage.setItem('step', step);
                dispatch({ type: 'SIGNUP_DETAIL', id: agentID, step: step });

            } catch (e) {
                Toast.show({
                    type: 'error',
                    text1: 'SIGNUP DETAIL ROUTES'
                })
            }
        },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (token !== null) {
                    const fetdetails = JSON.parse(await AsyncStorage.getItem('details'));
                    const details = fetdetails.user

                    dispatch({ type: 'RETRIEVE_TOKEN', token: token, details: details });

                } else {

                    let agent_id = await AsyncStorage.getItem('agentID');

                    if (agent_id !== null) {
                        let agent_step = await AsyncStorage.getItem('step');

                        dispatch({ type: 'SIGN_STEP', id: agent_id, step: agent_step });

                    }
                    else {
                        dispatch({ type: 'LOGOUT' });
                    }


                }

            } catch (e) {
                console.log(e);
            }

        }, 2000);
    }, []);


    if (loginState.isLoading) {
        return (
            <Splash />
        )
    }

    return (
        <AuthContext.Provider value={authContext}>

            {/* {loginState.userToken !== null ? <AppNavigation /> : <AuthNavigation />} */}

            {
                loginState.userToken !== null ? <AppNavigation /> :
                    loginState.step === 'one' ? <SignUpProfitPrice agentID={loginState.agentID} /> :
                        loginState.step === 'two' ? <SignUpUploadDocuments agentID={loginState.agentID} /> :
                            <AuthNavigation />
            }

        </AuthContext.Provider>
    )
}