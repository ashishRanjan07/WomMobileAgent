import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';

import Colors from '../../Assets/Colors';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function SwipeablePartnerUp({data}) {
  useEffect(() => {
    setPartnership_offers(data.partnership_offers);
    setPartnership_required(data.partnership_required);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState();

  const [partnership_offers, setPartnership_offers] = useState([]);
  const [partnership_required, setPartnership_required] = useState([]);

  const handleModalView = e => {
    setModalType(e);
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        <Image
          source={require('../../Assets/Images/man.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.companyName}>{data.name}</Text>
        <Text style={styles.industryName}>{data.industry_id.title}</Text>
        <View style={styles.lineSeprator} />
        <View style={styles.touchHolder}>
          <TouchableOpacity
            onPress={() => handleModalView('Partnership Offers')}
            style={[styles.buttonText, {backgroundColor: Colors.green}]}>
            <Text style={styles.text2}>Partnership Offers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleModalView('Partnership Required')}
            style={[styles.buttonText, {backgroundColor: Colors.blue}]}>
            <Text style={styles.text2}>Partnership Required</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(!modalVisible)}>
            <Pressable style={styles.modalView}>
              <Text style={styles.modalTitle}>{modalType}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}>
                {modalType === 'Partnership Offers' ? (
                  <>
                    {partnership_offers.map((e, key) => (
                      <View key={key} style={styles.DisCardView}>
                        <Image
                          source={{uri: 'https://picsum.photos/200'}}
                          style={styles.DisCardImage}
                        />
                        <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                      </View>
                    ))}
                  </>
                ) : modalType === 'Partnership Required' ? (
                  <>
                    {partnership_required.map((e, key) => (
                      <View key={key} style={styles.DisCardView}>
                        <Image
                          source={{uri: 'https://picsum.photos/200'}}
                          style={styles.DisCardImage}
                        />
                        <Text style={styles.DisCardTitle}>{e.coupon_type}</Text>
                      </View>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsivePadding(10),
    borderRadius: responsivePadding(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
    padding: responsivePadding(10),
  },
  imageStyle: {
    height: Dimensions.get('screen').width * 0.6,
    width: Dimensions.get('screen').width * 0.6,
    marginTop: responsivePadding(20),
  },
  companyName: {
    fontSize: responsiveFontSize(20),
    color: Colors.dark_black,
    fontWeight: 'bold',
    marginTop: responsivePadding(50),
  },
  industryName: {
    color: Colors.dark_black,
    fontSize: responsiveFontSize(18),
    marginTop: responsivePadding(20),
    marginBottom: responsivePadding(20),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    paddingHorizontal: responsivePadding(15),
    paddingVertical: responsivePadding(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
    borderRadius: responsivePadding(10),
    width: Dimensions.get('screen').width * 0.9,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(20),
    marginBottom: responsivePadding(10),
  },
  DisCardView: {
    width: Dimensions.get('screen').width * 0.27,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(10),
    marginVertical: responsivePadding(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  DisCardImage: {
    width: Dimensions.get('screen').width * 0.2,
    height: Dimensions.get('screen').width * 0.2,
    margin: responsivePadding(10),
  },
  DisCardTitle: {
    width: '100%',
    paddingVertical: responsivePadding(7),
    paddingHorizontal: responsivePadding(5),
    borderBottomLeftRadius: responsivePadding(10),
    borderBottomRightRadius: responsivePadding(10),
    textAlign: 'center',
  },
  lineSeprator: {
    height: responsivePadding(1),
    backgroundColor: Colors.black,
    marginBottom: responsivePadding(5),
    width: '100%',
  },
  touchHolder: {
    width: '100%',
    marginVertical: responsivePadding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    padding: responsivePadding(10),
    alignItems: 'center',
    width: '45%',
    borderRadius: responsivePadding(10),
  },
  text2: {
    fontSize: responsiveFontSize(18),
    textAlign: 'center',
    color: Colors.white,
  },
});
