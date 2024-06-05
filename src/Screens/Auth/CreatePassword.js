import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import Colors from '../../Assets/Colors'
import AuthBTN from '../../Components/AuthBTN'
import AuthFooter from '../../Components/AuthFooter'
import AuthScreenTitle from '../../Components/AuthScreenTitle'
import Text_Input from '../../Components/Text_Input'

export default function CreatePassword({ navigation }) {

    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();

    const handleBtn = async () => {
        console.log('Enterd Details', password, rePassword)
        console.warn('Submit BTN Clicked')
    }

    const handleFooterBTN = async () => {
        navigation.navigate('Login')
    }

    return (
        <ScrollView contentContainerStyle={styles.ScrollContainer}>

            <AuthScreenTitle title={'Create Password'} />

            <Text_Input enteredText={(e) => setPassword(e)} placeholder={'Enter Password'} />
            <Text_Input enteredText={(e) => setRePassword(e)} placeholder={'Re-enter Password'} />

            <AuthBTN title={'Create'} handleBTN={() => handleBtn()} />

            <AuthFooter
                text={'Back to '}
                BTNText={'Login'}
                handleBTN={() => handleFooterBTN()}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ScrollContainer: {
        backgroundColor: Colors.white,
        padding: 10,
        flex: 1,
        // height: Dimensions.get('screen').height,
    }
})