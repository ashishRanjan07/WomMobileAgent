import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../../../Assets/Colors';
import { FontSize } from '../../../Assets/Fonts';
import AppHeader from '../../../Components/AppHeader';

export default function OpenStatisticsProfile({ route, navigation }) {

    const data = route.params.e;
    const title = "Your Partners";
    const leftIconText = "Back";
    const leftIconBTN = () => { navigation.goBack() }
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

    return (
        <View>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <ScrollView>
                <View style={styles.card}>
                    <View style={styles.top}>
                        <Image source={require("../../../Assets/Images/man.png")} style={styles.imageStyle} />
                        <View style={{ paddingLeft: 10, justifyContent: 'space-evenly' }}>
                            <Text style={styles.companyName}>{data.partnership.organisation.org_id.name}</Text>
                            {/* <Text style={styles.industryName}>{data.about}</Text> */}
                            <Text>Area: {data.partnership.organisation.org_id.area}</Text>
                            <Text>About: {data.partnership.organisation.org_id.about}</Text>
                        </View>
                    </View>

                    <View style={{ height: 1, backgroundColor: Colors.managePartnerShipTopBarBackground, marginVertical: 15, }} />

                    <View style={{ flexDirection: 'row', marginTop: 50, marginBottom: 30, flex: 1, justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('screen').width / 1.2 }}>
                        <View style={{ marginVertical: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: FontSize.fontSize18, marginVertical: 10 }}>100</Text>
                            <Text style={{ color: Colors.black }}>Coupons Issued</Text>
                        </View>
                        <View style={{ marginVertical: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: FontSize.fontSize18, marginVertical: 10 }}>60</Text>
                            <Text style={{ color: Colors.black }}>Coupons Accepted</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.white,
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 10,
        marginVertical: 30,
        borderRadius: 20,
        elevation: 3,
        padding: 10,
        marginBottom: 100,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    companyName: {
        fontSize: FontSize.fontSize20,
        color: Colors.black,
        fontWeight: 'bold',
        // marginTop: 50,
    },
    industryName: {
        color: Colors.black,
        fontSize: FontSize.fontSize18,
        marginTop: 20,
        marginBottom: 30,
    },
})