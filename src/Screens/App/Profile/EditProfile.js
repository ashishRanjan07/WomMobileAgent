import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../Assets/Colors';
import AddImageBTN from '../../../Components/AddImageBTN';
import AppHeader from '../../../Components/AppHeader';
import AuthBTN from '../../../Components/AuthBTN';
import Text_Input from '../../../Components/Text_Input';
import {GET_AGENT_ID} from '../../../API_Services/API_Services';
import {
  update_agent_details,
  update_agent_profile_image,
} from '../../../API_Services/Internal_API';
import {ImageURL} from '../../../API_Services/server_Address';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../../Component/Responsive';

export default function EditProfile({navigation, route}) {
  const title = 'Edit Profile';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color={Colors.white} />
  );

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [occupation, setOccupation] = useState();

  const [dob, setDOB] = useState();
  const [date, setDate] = useState(new Date());
  const [dobModal, setDOBmodal] = useState(false);

  const [oldImage, setOldImage] = useState();
  const [newImage, setNewImage] = useState();

  const [fixedPrice, setFixedPrice] = useState();
  const [profitSharing, setProfitSharing] = useState();

  useEffect(() => {
    let data = route.params.data;

    setName(data.name ? data.name : '');
    setEmail(data.user_id.username ? data.user_id.username : '');
    setPhone(data.phone ? data.phone : '');
    setOccupation(data.occupation ? data.occupation : '');
    setDOB(data.dob ? data.dob : '');
    setFixedPrice(data.fixed_price ? data.fixed_price : '');
    setProfitSharing(data.profit_sharing ? data.profit_sharing : '');
    setOldImage(data.profile_img ? ImageURL + data.profile_img : '');
  }, []);

  const handleAddImage = e => {
    setNewImage(e);
  };

  const handleUpdateBTN = async () => {
    if (newImage == null) {
      updateDetails();
      leftIconBTN();
    } else {
      await uploadImage();
      await updateDetails();
      leftIconBTN();
    }
  };

  const updateDetails = async () => {
    const agent_ID = await GET_AGENT_ID();

    let data = {
      agent_id: agent_ID,
      name: name,
      occupation: occupation,
      username: email,
      dob: dob,
      phone: phone,
      profit_sharing: profitSharing,
      fixed_price: fixedPrice,
    };

    const response = await update_agent_details(data);

    if (response.status) {
      Toast.show({
        type: 'success',
        text1: response.message,
      });
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
  };

  const uploadImage = async () => {
    const agent_ID = await GET_AGENT_ID();

    let data = new FormData();
    data.append('_id', agent_ID);
    data.append('profile_pic', {
      uri: newImage.uri,
      type: newImage.type,
      name: newImage.fileName,
    });
    data.append('img_key', oldImage);

    const response = await update_agent_profile_image(data);

    if (response?.status) {
      Toast.show({
        type: 'success',
        text1: response.error,
      });
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
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setDOBmodal(false);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getDate();
    setDOB(fDate);
    // console.log(fDate)
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />

        <View style={styles.container}>
          <AddImageBTN
            newIMGURI={e => handleAddImage(e)}
            imageLink={newImage ? newImage.uri : oldImage}
          />

          <Text_Input
            placeholder={'Full Name'}
            value={name}
            entered_data={e => setName(e)}
          />
          <Text_Input
            placeholder={'Email'}
            value={email}
            entered_data={e => setEmail(e)}
          />
          <Text_Input
            placeholder={'Phone Number'}
            value={phone}
            entered_data={e => setPhone(e)}
            keyboardType={'numeric'}
            maxLength={10}
          />
          <Text_Input
            placeholder={'Occupation'}
            value={occupation}
            entered_data={e => setOccupation(e)}
          />

          <Pressable
            style={styles.DOBBTNstyle}
            onPress={() => setDOBmodal(true)}>
            <Text style={styles.dobText}>{dob ? dob : 'Select DOB'}</Text>
          </Pressable>

          {dobModal && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              display={'default'}
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

          <Text_Input
            placeholder={'Fixed Price'}
            value={fixedPrice}
            entered_data={e => setFixedPrice(e)}
            keyboardType={'numeric'}
          />
          <Text_Input
            placeholder={'Profit Sharing'}
            value={profitSharing}
            entered_data={e => setProfitSharing(e)}
            keyboardType={'numeric'}
          />

          <Text style={{color: Colors.red}}>
            {profitSharing > 100 ? 'Profit % not more than 100' : null}
          </Text>

          <AuthBTN
            title={'Update Details'}
            handleBTN={() => handleUpdateBTN()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: responsivePadding(10),
    padding: responsivePadding(10),
    backgroundColor: Colors.white,
    paddingVertical: responsivePadding(20),
    borderRadius: responsivePadding(7),
    elevation: responsivePadding(7),
  },
  DOBBTNstyle: {
    marginVertical: responsivePadding(10),
    borderColor: Colors.border_grey,
    borderWidth: responsivePadding(1),
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.input_BackGround_Grey,
    borderRadius: responsivePadding(7),
    padding: responsivePadding(8),
    height: responsivePadding(50),
    justifyContent: 'center',
  },
  dobText: {
    color: Colors.black,
    fontWeight: '800',
    fontSize: responsiveFontSize(18),
  },
});
