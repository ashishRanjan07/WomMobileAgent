import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../Assets/Colors'
import { FontSize } from '../../Assets/Fonts'
import { responsivePadding } from '../../Component/Responsive'

export default function DetailView({ title, text }) {
    return (
        <View style={styles.container} >
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
            <Text style={styles.detailText}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: responsivePadding(15),
    },
    titleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleText: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: FontSize.fontSize20
    },
    detailText: {
        textAlign: 'justify',
        marginTop: responsivePadding(15),
        color: Colors.black,
        letterSpacing: 0.5
    }

})