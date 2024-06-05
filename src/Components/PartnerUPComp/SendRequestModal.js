import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-toast-message';

import Colors from '../../Assets/Colors';
import AuthBTN from '../AuthBTN';
import Text_Input from '../Text_Input';
import {send_partnership_request} from '../../API_Services/Internal_API';
import {responsiveFontSize, responsivePadding} from '../../Component/Responsive';

export default function SendRequestModal({handleModalView, user}) {
  const [radioValue, setRadioValue] = useState(null);
  const [profitSharing, setProfitSharing] = useState(null);
  const [fixedPrice, setFixedPrice] = useState(null);

  const handleSendReqBTN = async () => {
    const partner_id = user._id;

    var data = {
      partner_id: partner_id,
      fixed_price: fixedPrice,
      profit_sharing: profitSharing,
    };

    if (profitSharing > 100) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter valid Profit Sharing',
      });
    } else if (!fixedPrice && !profitSharing) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Value',
      });
    } else {
      const response = await send_partnership_request(data);

      if (response?.status) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });
        handleModalView();
      } else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
        handleModalView();
      }
    }
  };

  return (
    <Pressable style={styles.modalContainer} onPress={() => handleModalView()}>
      <Pressable style={styles.modalView}>
        <Text style={styles.modalTitle}>How would you like to Partner up</Text>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioBTN}
            onPress={() => setRadioValue('PS')}>
            <Fontisto
              name={
                radioValue === 'PS' ? 'radio-btn-active' : 'radio-btn-passive'
              }
              size={responsiveFontSize(30)}
              color={Colors.black}
            />
            <Text style={styles.radioBTNText}>Profit Sharing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioBTN}
            onPress={() => setRadioValue('FP')}>
            <Fontisto
              name={
                radioValue === 'FP' ? 'radio-btn-active' : 'radio-btn-passive'
              }
              size={responsiveFontSize(30)}
              color={Colors.black}
            />
            <Text style={styles.radioBTNText}>Fixed Price</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineView} />

        {radioValue === 'PS' ? (
          <View>
            <Text_Input
              placeholder={'% Per Billing'}
              keyboardType={'numeric'}
              entered_data={text => setProfitSharing(text)}
            />
            <Text style={{color: Colors.red}}>
              {profitSharing > 100 ? 'Not more than 100%' : null}
            </Text>
            <AuthBTN title={'Submit'} handleBTN={() => handleSendReqBTN()} />
          </View>
        ) : radioValue === 'FP' ? (
          <View>
            <Text_Input
              placeholder={'₹ Per Coupon Shared'}
              keyboardType={'numeric'}
              entered_data={text => setFixedPrice(text)}
            />
            <AuthBTN title={'Submit'} handleBTN={() => handleSendReqBTN()} />
          </View>
        ) : (
          <View />
        )}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: responsivePadding(20),
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(10),
    padding: responsivePadding(15),
    borderRadius: responsivePadding(7),
    paddingVertical: responsivePadding(20),
    // height: Dimensions.get('screen').width,
    justifyContent: 'space-evenly',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    color: Colors.dark_black,
    alignSelf: 'center',
  },
  radioContainer: {
    width:'90%',
    alignSelf:'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: responsivePadding(20),
  },
  lineView: {
    height: responsivePadding(1),
    backgroundColor: Colors.black,
    marginTop: responsivePadding(10),
    marginBottom: responsivePadding(20),
  },
  radioBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:responsivePadding(5)
  },
  radioBTNText: {
    paddingLeft: responsivePadding(5),
  },
});
