import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {AuthContext} from '../../Component/Context';
import Colors from '../../Assets/Colors';
import AuthBTN from '../../Components/AuthBTN';
import AuthFooter from '../../Components/AuthFooter';
import AuthScreenTitle from '../../Components/AuthScreenTitle';
import Text_Input from '../../Components/Text_Input';
import {login_agent} from '../../API_Services/auth_API';
import {
  responsiveFontSize,
  responsivePadding,
} from '../../Component/Responsive';

export default function Login({navigation}) {
  const title = 'Login';
  const {signIn} = React.useContext(AuthContext);

  const [secureText, setSecureText] = useState(true);

  const [email, setEmail] = useState();
  const [password, setPasword] = useState();

  const handleLoginBTN = async () => {
    var data = {
      username: email,
      password: password,
    };
    console.log(data, 'Line 31');
    const response = await login_agent(data);

    if (response.success) {
      if (response.user.role === 'agent') {
        var token = response.token;
        var details = response;
        signIn(token, details);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please use valid Credentials for Agent APP',
        });
      }
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
    navigation.navigate('SignUp');
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
          <Text style={styles.agentText}>Agent Login</Text>
        </View>
        <AuthScreenTitle title={title} />
        <Text_Input
          placeholder={'Email'}
          entered_data={text => setEmail(text)}
        />
        <View style={styles.passwordHolder}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={e => setPasword(e)}
            secureTextEntry={secureText}
            placeholderTextColor={Colors.grey}
          />
          <Pressable onPress={() => setSecureText(!secureText)}>
            <Ionicons
              size={responsivePadding(30)}
              color={Colors.passwrod_eye}
              name={secureText ? 'eye-off-sharp' : 'eye-outline'}
            />
          </Pressable>
        </View>
        <Pressable
          style={styles.forgetContainer}
          onPress={() => navigation.navigate('ForgotPass')}>
          <Text style={styles.forgetText}>Forgot password?</Text>
        </Pressable>
        <AuthBTN title={title} handleBTN={() => handleLoginBTN()} />

        <AuthFooter
          text={'Don’t have an account? '}
          BTNText={'Sign up'}
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
  ScrollContainer: {
    backgroundColor: Colors.white,
    padding: responsivePadding(10),
    flex: 1,
  },
  forgetContainer: {
    width: '50%',
    marginHorizontal: responsivePadding(10),
    alignSelf: 'flex-end',
    marginVertical: responsivePadding(10),
  },
  forgetText: {
    textAlign: 'right',
    color: Colors.blue,
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
  },
  passwordHolder: {
    height: responsivePadding(50),
    borderWidth: 1,
    borderColor: Colors.border_grey,
    backgroundColor: Colors.input_BackGround_Grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsivePadding(5),
  },
  passwordInput: {
    width: '80%',
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: Colors.black,
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
