import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Animated,
  Image,
  StatusBar,
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Colors from '../../../Assets/Colors';
import {FontSize, Fonts} from '../../../Assets/Fonts';
import DetailView from '../../../Components/ProfileComp/DetailView';
import {get_agent} from '../../../API_Services/Internal_API';
import {ImageURL} from '../../../API_Services/server_Address';
import {responsiveFontSize, responsivePadding} from '../../../Component/Responsive';

export default function Profile({navigation}) {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);

  const getData = async () => {
    const response = await get_agent();

    if (response.status) {
      setData(response.data);
      setLoading(false);
    }
  };

  //refreshing the screen
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  let scrollY = new Animated.Value(0);
  // refreshing the screen end

  const handleEditProfileBTN = async () => {
    setModalVisible(false);
    navigation.navigate('EditProfile', {data});
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.black} barStyle="dark-content" />
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.blue} />
            <Text style={styles.loadingText}>Profile Data is loading...</Text>
          </View>
        ) : (
          <>
            <View style={styles.blackCard} />
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={styles.editIcon}>
                  <Entypo
                    name="dots-three-vertical"
                    size={responsiveFontSize(30)}
                    color={Colors.black}
                  />
                </Pressable>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  <Pressable
                    style={styles.centeredView}
                    onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={{width:'100%'}} onPress={() => handleEditProfileBTN()}>
                        <Text style={styles.modalText}>Edit Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </Modal>

                <Image
                  source={{
                    // uri: "https://picsum.photos/200",
                    uri: data.profile_img
                      ? ImageURL + data.profile_img
                      : 'https://picsum.photos/200',
                    height: Dimensions.get('screen').width * 0.4,
                    width: Dimensions.get('screen').width * 0.4,
                  }}
                  style={styles.imageStyle}
                />
                <View style={styles.detailsHolder}>
                  <Text style={styles.name}>
                    {data.name ? data.name : 'Agent Name'}
                  </Text>
                  <Text style={styles.occupations}>
                    {data.occupation ? data.occupation : 'Occupation'}
                  </Text>
                </View>
              </View>
            </View>

            <DetailView
              title={'Email'}
              // text={data.user_id.username ? data.user_id.username : "example@assertit.io"}
              text={
                data.user_id.username
                  ? data.user_id.username
                  : 'example@assertit.io'
              }
            />
            <DetailView
              title={'Phone Number'}
              text={data.phone ? data.phone : '9711425957'}
            />
            <DetailView title={'D.O.B.'} text={data.dob ? data.dob : 'D.O.B'} />
            <DetailView
              title={'Fixed Price'}
              text={data.fixed_price ? '₹ ' + data.fixed_price : '₹ 100'}
            />
            <DetailView
              title={'Profit Sharing'}
              text={data.profit_sharing ? data.profit_sharing + ' %' : 'XXX %'}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsivePadding(10),
    backgroundColor: Colors.white,
  },
  blackCard: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'flex-end',
    padding: responsivePadding(10),
    height: Dimensions.get('window').height / 4,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsivePadding(30),
  },

  card: {
    backgroundColor: Colors.white,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -Dimensions.get('window').height / 4,
    padding: responsivePadding(10),
    borderRadius: responsivePadding(10),
    elevation: responsivePadding(7),
  },
  imageStyle: {
    borderWidth: responsivePadding(1),
    borderRadius: responsivePadding(10000),
    borderColor: Colors.lightgrey,
    backgroundColor: Colors.input_BackGround_Grey,
  },
  editIcon: {
    alignSelf: 'flex-end',
    paddingTop: responsivePadding(10),
  },
  centeredView: {
    // flex: 1,
  },
  modalView: {
    margin: responsivePadding(20),
    backgroundColor: Colors.white,
    borderRadius: responsivePadding(10),
    // padding: responsivePadding(20),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: responsivePadding(5),
    width: Dimensions.get('screen').width * 0.5,
    alignSelf: 'flex-end',
  },
  modalText: {
    borderWidth:responsivePadding(2),
    padding:responsivePadding(20),
    borderColor:Colors.white,
    borderRadius:responsivePadding(10),
    width:'100%',
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '500',
    fontSize: FontSize.fontSize16,
  },
  detailsHolder: {
    width: '100%',
    padding: responsivePadding(10),
    alignItems: 'center',
    gap: responsivePadding(10),
  },
  name: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: Colors.blue,
  },
  occupations: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: Colors.black,
  },
  loadingText: {
    fontSize: responsiveFontSize(18),
    color: Colors.blue,
  },
});
