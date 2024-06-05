import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Colors from '../../Assets/Colors';
import AuthBTN from '../../Components/AuthBTN';
import AuthFooter from '../../Components/AuthFooter';
import AuthScreenTitle from '../../Components/AuthScreenTitle';
import Text_Input from '../../Components/Text_Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function ForgotPass({navigation}) {
  const title = 'Forgot Password';

  const [email, setEmail] = useState();

  const handleBtn = async () => {
    console.warn('Submit BTN Clicked');
  };

  const handleFooterBTN = async () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{width: '95%', alignSelf: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Assets/Images/wominsidelogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.agentView}>
          <Text style={styles.agentText}>Agent Forget Password</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <AuthScreenTitle title={title} />
        </View>

        <Text_Input
          placeholder={'Email'}
          entered_data={text => setEmail(text)}
        />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <AuthBTN title={'Submit'} handleBTN={() => handleBtn()} />
        </View>

        <AuthFooter
          text={'Back to '}
          BTNText={'Login'}
          handleBTN={() => handleFooterBTN()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
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
