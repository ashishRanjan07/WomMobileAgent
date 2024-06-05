import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../Assets/Colors'
import { FontSize } from '../Assets/Fonts'

export default function AuthScreenTitle({ title }) {
    return (
        <View style={styles.container}>
            <Text style={styles.containerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        // marginHorizontal: 10,
    },
    containerText: {
        color: Colors.dark_black,
        fontSize: FontSize.fontSize30,
        fontWeight: 'bold',
    }
})