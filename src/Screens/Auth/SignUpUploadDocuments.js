import React, {useState, useContext} from 'react';
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
import AuthScreenTitle from '../../Components/AuthScreenTitle';
import AuthDocUploadBTN from '../../Components/AuthDocUploadBTN';
import AuthBTN from '../../Components/AuthBTN';
import {upload_agent_documents} from '../../API_Services/auth_API';

export default function SignUpUploadDocuments({agentID}) {
  const {signOut} = useContext(AuthContext);

  const [adharCard, setAdharCard] = useState();
  const [panCard, setPanCard] = useState();
  const [birthCer, setBirthCer] = useState();

  const handleReviewBTN = async () => {
    if (
      !adharCard ||
      !panCard ||
      !birthCer ||
      adharCard === '' ||
      panCard === '' ||
      birthCer === ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please Select All Images',
      });
    } else {
      var data = new FormData();
      data.append('agent_id', agentID);
      data.append('files', adharCard);
      data.append('files', panCard);
      data.append('files', birthCer);

      const response = await upload_agent_documents(data);
      console.log(response, 'Line 42');

      if (response.status) {
        Toast.show({
          type: 'success',
          text1: response.message,
        });

        signOut();
      } else {
        Toast.show({
          type: 'error',
          text1: response.message,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View
        style={styles.contentHolder}>
             <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Assets/Images/wominsidelogo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <AuthScreenTitle title={'Upload Document'} />
        <Text style={styles.heading}>
          Upload the required documents securely here.
        </Text>
        <View style={styles.buttonHolder}>
          <AuthDocUploadBTN
            title={'Aadhar Card'}
            filePath={adharCard}
            selectedFlePath={e => setAdharCard(e)}
          />
        </View>
        <View style={styles.buttonHolder}>
        <AuthDocUploadBTN
          title={'Pan Card'}
          filePath={panCard}
          selectedFlePath={e => setPanCard(e)}
        />
        </View>
        <View style={styles.buttonHolder}>
        <AuthDocUploadBTN
          title={'Birth Certificate'}
          filePath={birthCer}
          selectedFlePath={e => setBirthCer(e)}
        />
        </View>
        <View style={{width:'95%',alignSelf:'center'}}>
        <AuthBTN
          title={'Submit for review'}
          handleBTN={() => handleReviewBTN()}
        />
        </View>
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScrollContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    flex: 1,
    // height: Dimensions.get('screen').height,
  },
  heading: {
    color: Colors.dark_black,
  },
  buttonHolder: {
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.grey,
    borderColor: Colors.grey,
  },
  contentHolder:{
    gap:10,
    marginHorizontal: 20,
    width: '95%',
    alignSelf: 'center',
  }
});
