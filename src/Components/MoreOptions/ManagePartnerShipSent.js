import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Pre, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

import Colors from '../../Assets/Colors';
import { resend_partnership_request } from '../../API_Services/Internal_API';
import { ImageURL } from '../../API_Services/server_Address';

export default function ManagePartnerShipSent({ sentRequestList, requestWidraw, RFPlease }) {

    const navigation = useNavigation();

    const handleWidrow = (e) => {
        requestWidraw(e)
    }

    const handleReSend = async (e) => {

        let id = e.org_id._id
        let req_id = e.requested_id

        const response = await resend_partnership_request(id, req_id)

        if (response.status) {
            RFPlease()
            Toast.show({
                type: 'success',
                text1: response.message
            })
        } else {
            Toast.show({
                type: 'error',
                text1: response.message
            })
        }
    }

    return (
        <View>
            {
                sentRequestList.map((e, key) => (
                    <View key={key}>
                        <View style={styles.container}>
                            <View style={{ width: '2%', backgroundColor: e.request_declined ? Colors.red : Colors.white }} />
                            <View style={{ width: '98%', flexDirection: 'row', paddingVertical: 10, paddingLeft: 5 }}>
                                <View style={styles.firstComp}>
                                    <Pressable style={styles.oneFirstComp} onPress={() => navigation.navigate('OpenCompanyProfile', { e })}>
                                        <Image source={{
                                            uri: e.org_id.profile_img ? ImageURL + e.org_id.profile_img : "https://picsum.photos/200",
                                        }}
                                            style={styles.imageComp}
                                        />
                                    </Pressable>
                                    <View style={styles.twoFirstComp}>
                                        <Text style={[styles.ContentText, { fontWeight: 'bold', color: Colors.black }]}>{e.org_id.name}</Text>
                                        <Text style={styles.ContentText}>{e.org_id.about}</Text>
                                        <Text style={styles.ContentText}>{e.org_id.area}</Text>
                                        <Text style={[styles.ContentText, { fontWeight: 'bold', color: Colors.black, paddingTop: 10, paddingBottom: 5 }]}>
                                            {e.declined_reason ? e.declined_reason : e.validity ? e.validity : null}
                                        </Text>
                                    </View>
                                </View>


                                <View style={styles.secondComp}>
                                    <Pressable
                                        style={[styles.btnComp, { backgroundColor: e.request_declined ? Colors.resendBlue : Colors.black, }]}
                                        onPress={() => { e.request_declined ? handleReSend(e) : handleWidrow(e) }}
                                    >
                                        <Text style={styles.btnText}>{e.request_declined ? '  Resend  ' : 'Withdraw'}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: Colors.managePartnerShipTopBarBackground }} />
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // padding: 10,
        // paddingVertical: 5,
    },
    firstComp: {
        // backgroundColor: 'red',
        width: '65%',
        flexDirection: 'row',
        // marginBottom: 10,
    },
    oneFirstComp: {
        // backgroundColor: 'pink',
    },
    twoFirstComp: {
        paddingLeft: 10,
        width: '80%',
    },
    secondComp: {
        width: '35%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageComp: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: Colors.border_grey,
    },
    btnComp: {
        padding: 10,
        borderRadius: 7,
        elevation: 3,
    },
    btnText: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    ContentText: {
        // backgroundColor: 'red',
    }
})