import React from 'react'
import { View, Image, StyleSheet, StatusBar } from 'react-native'

import imagesPath from '../../Assets/ImagesPath'
import Colors from '../../Assets/Colors'

export default function Splash() {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                barStyle="dark-content"
            />
            <Image source={imagesPath.app_logo2} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
})