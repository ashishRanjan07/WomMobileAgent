import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import Colors from '../Assets/Colors'
import { FontSize } from '../Assets/Fonts'

export default function AuthBTN({ title, handleBTN }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => handleBTN()}>
            <Text style={styles.BTNText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 7,
        height: 50,
    },
    BTNText: {
        color: Colors.white,
        fontSize: FontSize.fontSize18,
        fontWeight: 'bold',
    }
})