import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {AuthContext} from '../../Component/Context';
import Colors from '../../Assets/Colors';
import {FontSize} from '../../Assets/Fonts';
import AuthBTN from '../../Components/AuthBTN';
import AuthScreenTitle from '../../Components/AuthScreenTitle';
import Text_Input from '../../Components/Text_Input';
import {update_agent_profit} from '../../API_Services/auth_API';

export default function SignUpProfitPrice({agentID}) {
  const {signUp_Details} = React.useContext(AuthContext);

  const [percent, setPercent] = useState();
  const [price, setPrice] = useState();

  const handleNextBTN = async () => {
    let data = {
      agent_id: agentID,
      profit_sharing: percent,
      fixed_price: price,
    };

    const response = await update_agent_profit(data);

    if (response.status) {
      Toast.show({
        type: 'success',
        text1: 'Details Updated Successfully',
      });

      const agentID = response.data.agent_id;
      const stepValue = response.data.agent_step;

      let step = stepValue === 2 ? 'two' : null;

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

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View
        style={{alignSelf: 'flex-start', width: '90%', marginHorizontal: 20}}>
           <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Assets/Images/wominsidelogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <AuthScreenTitle title={'How to'} />
        <Text style={styles.titleStyle}>Profit Sharing</Text>

        <Text_Input
          placeholder={'% Per Billing'}
          entered_data={text => setPercent(text)}
          keyboardType={'numeric'}
        />

        <Text style={styles.titleStyle}>Fixed Price</Text>

        <Text_Input
          placeholder={'₹ Per Coupon Shared'}
          entered_data={text => setPrice(text)}
          keyboardType={'numeric'}
        />

        <AuthBTN title={'Next'} handleBTN={() => handleNextBTN()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  ScrollContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    flex: 1,
    // height: Dimensions.get('screen').height,
  },
  titleStyle: {
    color: Colors.dark_black,
    fontWeight: '600',
    marginVertical: 10,
    fontSize: FontSize.fontSize16,
  },
});
