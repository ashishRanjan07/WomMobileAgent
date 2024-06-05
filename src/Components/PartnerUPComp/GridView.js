import React from 'react'
import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Assets/Colors';

export default function GridView({ data }) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                data.map(
                    (u, i) =>
                        <Pressable key={i} style={styles.gridComp}
                            onPress={() => navigation.navigate('OpenGridProfile', u)}
                        >
                            <Image source={require("../../Assets/Images/man.png")} style={styles.imageGridStyle} />
                            <Text style={styles.companyName}>{u.name}</Text>
                            <Text style={styles.industryName}>{u.about}</Text>
                        </Pressable>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width * 0.95,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        paddingVertical: 20,
        elevation: 7,
        borderRadius: 10,
    },
    gridComp: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7,
        width: Dimensions.get('screen').width * 0.43,
    },
    imageGridStyle: {
        height: Dimensions.get('screen').width * 0.37,
        width: Dimensions.get('screen').width * 0.37
    }
})