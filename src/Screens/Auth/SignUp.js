import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

import {AuthContext} from '../../Component/Context';
import AuthScreenTitle from '../../Components/AuthScreenTitle';
import Text_Input from '../../Components/Text_Input';
import Colors from '../../Assets/Colors';
import AuthBTN from '../../Components/AuthBTN';
import AuthFooter from '../../Components/AuthFooter';
import {add_new_agent} from '../../API_Services/auth_API';
import { responsiveFontSize, responsivePadding } from '../../Component/Responsive';

export default function SignUp({navigation}) {
  const title = 'Sign Up';
  const {signUp_Details} = React.useContext(AuthContext);

  const [secureText, setSecureText] = useState(true);
  const [termCondition, setTermCondition] = useState(false);

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [occupation, setOccupation] = useState();
  const [password, setPassword] = useState();

  const [dob, setDOB] = useState();
  const [date, setDate] = useState(new Date());
  const [dobModal, setDOBmodal] = useState(false);

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

  const handleNextBTN = async () => {
    let data = {
      name: fullName,
      dob: dob,
      occupation: occupation,
      phone: phoneNumber,
      username: email,
      password: password,
    };
    console.log(data, 'Line 55');
    const response = await add_new_agent(data);
    console.log(response, 'Line 57');

    if (response.status) {
      Toast.show({
        type: 'success',
        text1: 'Details Updated Successfully',
      });

      const agentID = response.data.agent_id;
      const stepValue = response.data.agent_step;

      let step = stepValue === 1 ? 'one' : null;

      signUp_Details(agentID, step);
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

  const handleFooterBTN = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <ScrollView
          contentContainerStyle={styles.ScrollContainer}
          showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Assets/Images/wominsidelogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.agentView}>
          <Text style={styles.agentText}>Agent Signup</Text>
        </View>
          <AuthScreenTitle title={title} />

          <Text_Input
            entered_data={e => setFullName(e)}
            placeholder={'Full Name'}
          />
          <Text_Input entered_data={e => setEmail(e)} placeholder={'Email'} />
          <Text_Input
            entered_data={e => setPhoneNumber(e)}
            placeholder={'Phone Number'}
            keyboardType={'numeric'}
            maxLength={10}
          />

          {/* <Text_Input entered_data={(e) => setDOB(e)} placeholder={'YYYY/MM/DD'} /> */}
          <Pressable
            style={styles.DOBBTNstyle}
            onPress={() => setDOBmodal(true)}>
            <Text style={{color:Colors.grey,fontWeight:'bold',fontSize:responsiveFontSize(18)}}>{dob ? dob : 'Select DOB YYYY/MM/DD'}</Text>
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
            entered_data={e => setOccupation(e)}
            placeholder={'Occupation'}
          />

          <View style={styles.InputContainer}>
            <TextInput
              placeholder="Password"
              onChangeText={e => setPassword(e)}
              style={styles.InputField}
              secureTextEntry={secureText}
              placeholderTextColor={Colors.grey}
            />
            <Pressable onPress={() => setSecureText(!secureText)}>
              <Ionicons
                size={30}
                color={Colors.passwrod_eye}
                name={secureText ? 'eye-off-sharp' : 'eye-outline'}
              />
            </Pressable>
          </View>

          <View style={styles.TCContainer}>
            <Pressable onPress={() => setTermCondition(!termCondition)}>
              <MaterialIcons
                size={30}
                color={Colors.passwrod_eye}
                name={termCondition ? 'check-box' : 'check-box-outline-blank'}
              />
            </Pressable>
            <Text style={styles.termText}>
              I would like to receive your newsletter and other promotional
              information.
            </Text>
          </View>

          <AuthBTN title={'Next'} handleBTN={() => handleNextBTN()} />

          <AuthFooter
            text={'Already have an account? '}
            BTNText={'Log in'}
            handleBTN={() => handleFooterBTN()}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 10,
    flex: 1,
    // height: Dimensions.get('screen').height,
  },
  ScrollContainer: {
    // backgroundColor: Colors.white,
    // padding: 10,
    // display: 'flex',
    // flex: 1,
  },
  InputContainer: {
    marginVertical: responsivePadding(10),
    height:responsivePadding(50),
    width:'95%',
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.border_grey,
    borderWidth: 1,
    backgroundColor: Colors.input_BackGround_Grey,
    borderRadius: 7,
    justifyContent: 'space-around',
    paddingHorizontal: 7,
  },
  InputField: {
   width:'80%',
   fontSize:responsiveFontSize(18),
   fontWeight:'bold',
   color:Colors.black
  },
  TCContainer: {
    width:'95%',
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  termText: {
    width:'90%',
    color: Colors.dark_black,
    textAlign: 'justify',
    paddingLeft: 10,
    fontSize:responsiveFontSize(16)
  },

  DOBBTNstyle: {
    width:'95%',
    alignSelf:'center',
    marginVertical: 10,
    borderColor: Colors.border_grey,
    borderWidth: 1,
    backgroundColor: Colors.input_BackGround_Grey,
    borderRadius: 7,
    padding: 8,
    height: 50,
    justifyContent: 'center',
  },
  agentView: {
    marginVertical: responsivePadding(20),
    alignItems: 'center',
  },
  agentText: {
    fontSize: responsiveFontSize(20),
    fontWeight: '500',
    color: Colors.blue,
  },
  image: {
    height: responsivePadding(100),
    width: responsivePadding(300),
  },
});
