import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import AppHeader from '../../../Components/AppHeader'
import Colors from '../../../Assets/Colors';

import { get_coupon_details } from '../../../API_Services/Internal_API';
import { GET_AGENT_ID } from '../../../API_Services/API_Services';
import ORG_Coupons from '../../../Components/Statistics/ORG_Coupons';


export default function OpenORGProfile({ route, navigation }) {

    const data = route.params.e;
    const title = "Your Partners";
    const leftIconText = "Back";
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color={Colors.white} />;
    const leftIconBTN = () => { navigation.goBack() }

    const [fetchedCoupons, setFetchedCoupons] = useState([])

    useEffect(() => {
        get_Data();

    }, [])

    const get_Data = async () => {
        let assigning_org_id = await GET_AGENT_ID()

        let data_pass = {
            "assigned_org_id": assigning_org_id,
            "assigning_org_id": data.partnership.organisation.org_id._id
        }

        const response = await get_coupon_details(data_pass)

        if (response.status) {
            setFetchedCoupons(response.data.coupons)
        } else {
            Toast.show({
                type: 'error',
                text1: response.message
            })
        }


    }

    return (
        <ScrollView>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <View style={styles.top}>
                <Image source={require("../../../Assets/Images/man.png")} style={styles.imageStyle} />
                <View style={{ paddingLeft: 10, justifyContent: 'space-evenly' }}>
                    <Text style={styles.companyName}>{data.partnership.organisation.org_id.name}</Text>
                    <Text>Area: {data.partnership.organisation.org_id.area}</Text>
                    <Text>About: {data.partnership.organisation.org_id.about}</Text>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: Colors.warm_grey, width: Dimensions.get('screen').width * 0.95, alignSelf: 'center', marginVertical: 5, }} />

            <View>
                {
                    fetchedCoupons.length > 0 ?
                        <ORG_Coupons coupon_data={fetchedCoupons} data={data} />
                        :
                        null
                }
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    top: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
    },
    imageStyle: {
        height: 100,
        width: 100
    },
})