import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import Colors from '../Assets/Colors'
import { FontSize } from '../Assets/Fonts'

export default function AppHeader({ title, leftIcon, leftIconBTN, leftIconText }) {
    return (
        <View style={styles.container}>
            <View style={styles.topContaner}>
                <Pressable onPress={leftIconBTN} style={styles.leftIconContainer} >
                    {leftIcon}
                    <Text style={styles.leftIconText}>{leftIconText}</Text>
                </Pressable>

            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black,
    },
    topContaner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 10
    },
    leftIconText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize18
    },
    title: {
        color: Colors.white,
        fontSize: FontSize.fontSize24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    leftIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})