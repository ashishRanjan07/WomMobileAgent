import React, {useContext} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';

import Colors from '../../../Assets/Colors';
import {AuthContext} from '../../../Component/Context';
import {responsiveFontSize, responsivePadding} from '../../../Component/Responsive';

export default function MoreOptions({navigation}) {
  const {signOut} = useContext(AuthContext);

  const OptionList = [
    {
      id: 1,
      title: 'Manage Partnerships',
      logo: require('../../../Assets/Images/image45.png'),
      handleBTN: 'ManagePartnerShip',
    },
    // { 'id': 2, "title": "Manage Users", "logo": require("../../../Assets/Images/image46.png"), "handleBTN": "ManageUsers" },
    {
      id: 3,
      title: 'Customer List',
      logo: require('../../../Assets/Images/image47.png'),
      handleBTN: 'CustomerList',
    },
    // { 'id': 4, "title": "My Coupons", "logo": require("../../../Assets/Images/image48.png"), "handleBTN": "" },
  ];

  const handleLogOut = () => {
    Alert.alert('Do your want to Logout? ', ' ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        // style: "cancel"
      },
      {
        text: 'Log Out',
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View style={styles.OptionList}>
          {OptionList.map((e, key) => (
            <TouchableOpacity
              key={key}
              style={styles.BoxCardContainer}
              onPress={() => navigation.navigate(e.handleBTN)}>
              <Text style={styles.cardViewText}>{e.title}</Text>
              <Image source={e.logo} style={styles.imageStyle} resizeMode='contain' />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.cardView,{height:responsivePadding(50),justifyContent:'center',alignItems:'baseline'}]}
          onPress={() => handleLogOut()}>
          <Text style={styles.cardViewText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: responsivePadding(15),
    backgroundColor:Colors.white
  },
  OptionList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cardView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsivePadding(15),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
    borderRadius: responsivePadding(8),
    marginVertical: responsivePadding(10),
  },
  cardViewText: {
    fontSize:responsiveFontSize(18),
    fontWeight: '600',
    width:'100%',
    color: Colors.dark_black,
    height:responsivePadding(45)
  },
  BoxCardContainer: {
    backgroundColor: Colors.white,
    width: Dimensions.get('screen').width * 0.45,
    height: Dimensions.get('screen').width * 0.5,
    marginVertical: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: responsivePadding(2),
    },
    shadowRadius: responsivePadding(3),
    elevation: responsivePadding(5),
    borderRadius: 7,
  },
  imageStyle: {
    width: '100%',
    height: responsivePadding(100),
    marginTop: responsivePadding(30),
    alignSelf: 'flex-end',
    marginVertical: responsivePadding(10),
  },
});
