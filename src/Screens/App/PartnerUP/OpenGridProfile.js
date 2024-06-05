import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Dimensions, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../../Components/AppHeader';
import AuthBTN from '../../../Components/AuthBTN';
import SwipeablePartnerUp from '../../../Components/PartnerUPComp/SwipeablePartnerUp';
import SendRequestModal from '../../../Components/PartnerUPComp/SendRequestModal';

export default function OpenGridProfile({ route, navigation }) {

    const title = route.params.name;
    const leftIconText = "Back";
    const leftIconBTN = () => { navigation.goBack() }
    const leftIcon = <Ionicons name="chevron-back-outline" size={25} color="#fff" />;

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalView = () => {
        setModalVisible(!modalVisible)
        leftIconBTN()
    }

    return (
        <ScrollView>
            <AppHeader title={title} leftIconBTN={leftIconBTN} leftIcon={leftIcon} leftIconText={leftIconText} />

            <SwipeablePartnerUp data={route.params} />

            <View style={styles.BTNView}>
                <AuthBTN title={'Send Partnership Request'} handleBTN={() => setModalVisible(!modalVisible)} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <SendRequestModal handleModalView={() => handleModalView()} user={route.params} />
            </Modal>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    BTNView: {
        width: Dimensions.get('window').width * 0.95,
        margin: 10,
    }
})