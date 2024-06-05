import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import AppHeader from '../../../Components/AppHeader';
import AddImageBTN from '../../../Components/AddImageBTN';
import Text_Input from '../../../Components/Text_Input';
import Colors from '../../../Assets/Colors';
import {FontSize} from '../../../Assets/Fonts';
import {create_customer} from '../../../API_Services/Internal_API';
import {GET_AGENT_ID} from '../../../API_Services/API_Services';
import {responsivePadding} from '../../../Component/Responsive';

export default function CreateCustomer({navigation}) {
  const title = 'Your Customers';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const saveBTN = async () => {
    let agent_id = await GET_AGENT_ID();

    let data = {
      org_id: agent_id,
      full_name: fullName,
      phone: phoneNumber,
      email: email,
    };

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      fullName === '' ||
      email === '' ||
      phoneNumber === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
    } else {
      const response = await create_customer(data);
      // console.log('response create Customer', response)

      if (response?.status) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        setModalVisible(true);
        setTimeout(function () {
          setModalVisible(false);
          navigation.goBack();
        }, 2000);
      } else {
        let type = typeof response.message;
        if (type === 'string') {
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        } else {
          let repMSG = JSON.parse(JSON.stringify(response.message))[0].msg;

          Toast.show({
            type: 'error',
            text1: repMSG,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.black, flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.black} />
      <ScrollView>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <View style={{backgroundColor: Colors.white,height:'100%'}}>
          <View style={styles.container}>
            <AddImageBTN />

            <Text_Input
              placeholder={'Full Name'}
              entered_data={e => setFullName(e)}
            />
            <Text_Input
              placeholder={'Phone Number'}
              keyboardType={'numeric'}
              entered_data={e => setPhoneNumber(e)}
            />
            <Text_Input placeholder={'Email'} entered_data={e => setEmail(e)} />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.goBack()}>
                <Text style={[styles.btnText, {color: Colors.black}]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={() => saveBTN()}>
                <Text
                  style={[
                    styles.btnText,
                    {color: Colors.white, backgroundColor: Colors.black},
                  ]}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <View style={styles.LottieComp}>
                <LottieView
                  source={require('../../../Assets/GIF/50465.json')}
                  autoPlay
                />
              </View>
              <Text style={styles.LottieText}>Coupon shared</Text>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  btn: {
    width: '48%',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: Colors.black,
    marginVertical: 20,
  },
  btnText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FontSize.fontSize18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: 10,
  },
  LottieComp: {
    height: Dimensions.get('screen').width * 0.75,
    width: Dimensions.get('screen').width * 0.75,
  },
  LottieText: {
    textAlign: 'center',
    paddingBottom: 20,
    color: Colors.blackDark,
    fontSize: FontSize.fontSize20,
    fontWeight: 'bold',
  },
});
