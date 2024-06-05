import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Colors from '../Assets/Colors'
import { responsiveFontSize, responsivePadding } from '../Component/Responsive'

export default function AuthFooter({ text, BTNText, handleBTN }) {
    return (
        <View style={styles.container}>
            <Text style={styles.footerText}>{text}</Text>
            <Pressable onPress={() => handleBTN()}>
                <Text style={[styles.footerText, { color: Colors.auth_btn_text }]}>{BTNText}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: responsivePadding(20),
    },
    footerText: {
        fontSize: responsiveFontSize(18),
        color: Colors.black,
        fontWeight: '500',
    }
})