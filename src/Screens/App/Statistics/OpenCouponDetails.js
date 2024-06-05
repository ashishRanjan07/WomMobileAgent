import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../Assets/Colors';
import { FontSize } from '../../../Assets/Fonts';
import AppHeader from '../../../Components/AppHeader';

export default function OpenCouponDetails({ route, navigation }) {

    const user_Data = route.params.data;
    const coupon_Data = route.params.e;

    const data = route.params.e;
    const title = "Your Partners";
    const leftIconText = "Back";
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;
    const leftIconBTN = () => { navigation.goBack() }


    return (
        <ScrollView>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <View style={styles.containier}>

                <View style={styles.top}>
                    <Image source={require("../../../Assets/Images/man.png")} style={styles.imageStyle} />
                    <View style={{ paddingLeft: 10, justifyContent: 'space-evenly' }}>

                        <Text style={styles.companyName}>{user_Data?.partnership?.organisation?.org_id.name}</Text>

                        <Text>{user_Data.partnership.organisation.org_id.area}</Text>

                        <Text>{user_Data?.partnership?.organisation?.org_id.about}</Text>

                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: Colors.warm_grey, width: '95%', alignSelf: 'center', marginVertical: 20, }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={[styles.scanCouponStyle, { backgroundColor: '#F5782F' }]}>
                        <Text style={styles.valueText}>{coupon_Data.scan_coupon}</Text>
                        <Text style={styles.titleText}>Coupons</Text>
                        <Text style={styles.titleText}>shared</Text>
                    </View>

                    <View style={[styles.scanCouponStyle, { backgroundColor: '#F28694' }]}>
                        <Text style={styles.valueText}>{coupon_Data.scan_coupon}</Text>
                        <Text style={styles.titleText}>Coupons</Text>
                        <Text style={styles.titleText}>scaned</Text>
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    containier: {
        margin: 15,
        backgroundColor: Colors.white,
        elevation: 5,
        borderRadius: 20,
        paddingBottom: 30,
        padding: 10,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    scanCouponStyle: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        elevation: 5,
        borderRadius: 20,
    },
    valueText: {
        color: Colors.white,
        fontSize: FontSize.fontSize20,
        fontWeight: '700',
        marginVertical: 3,
    },
    titleText: {
        color: Colors.white,
        marginVertical: 3,
        fontSize: FontSize.fontSize16,
    }
})