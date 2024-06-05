import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { ImageURL } from '../../API_Services/server_Address'
import Colors from '../../Assets/Colors'
import { FontSize } from '../../Assets/Fonts'


export default function ORG_Coupons({ coupon_data, data }) {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                coupon_data.map((e, key) => (
                    <TouchableOpacity key={key} onPress={() => navigation.navigate('OpenCouponDetails', { e, data })}>
                        {/* <TouchableOpacity key={key} onPress={() => navigation.navigate('OpenCouponDetails', e, data)}> */}

                        <Text style={styles.titleText}>{e.coupon_type}</Text>

                        <Image
                            source={{ uri: ImageURL + e.url }}
                            style={{
                                width: Dimensions.get('screen').width * 0.95,
                                height: e.coupon_type === 'Discount Coupons' ? Dimensions.get('screen').width * 0.69 :
                                    e.coupon_type === 'Brand Awareness Pamphlet' ? Dimensions.get('screen').width * 0.85 :
                                        e.coupon_type === 'Free Sample' ? Dimensions.get('screen').width * 0.385 : null
                            }}
                        />

                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    titleText: {
        color: Colors.dark_black,
        fontWeight: '500',
        fontSize: FontSize.fontSize16,
        marginVertical: 5,
    }
})