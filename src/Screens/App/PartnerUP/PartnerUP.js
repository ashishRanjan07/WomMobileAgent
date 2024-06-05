import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Image,
  Animated,
  RefreshControl,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import Colors from '../../../Assets/Colors';
import FilterComp from '../../../Components/PartnerUPComp/FilterComp';
import {
  get_filter_partner_up,
  get_partner_up,
  send_partnership_request,
} from '../../../API_Services/Internal_API';
import SwipePartnerUp from '../../../Components/PartnerUPComp/SwipePartnerUp';
import SendRequestModal from '../../../Components/PartnerUPComp/SendRequestModal';
import GridView from '../../../Components/PartnerUPComp/GridView';
import { responsiveFontSize, responsivePadding } from '../../../Component/Responsive';

export default function PartnerUP({navigation}) {
  const [swipe, setSwipe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [partnerCompanydetail, setPartnerCompanydetail] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipesRef = useRef(null);

  //refreshing the screen
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // getData()
    wait(2000).then(() => setRefreshing(false));
  }, []);
  let scrollY = new Animated.Value(0);
  // refreshing the screen end

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });

    getData();
  }, [navigation]);

  const getData = async () => {
    setIsLoading(true);

    try {
      const response = await get_partner_up();
      // console.log('response get_partner_up', response);
      if (response.status) {
        setPartnerCompanydetail(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      // Alert.alert('Error getting users', '', [{ text: 'Retry', onPress: () => fetchUsers() }])
      setIsLoading(true);
    }
  };

  const handleLike = async () => {
    setModalVisible(true);
  };

  function handlePass() {
    Toast.show({
      type: 'success',
      text1: 'Next Profile',
    });
    nextUser();
  }

  function nextUser() {
    const nextIndex =
      partnerCompanydetail.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  const handleINDFilter = async e => {
    setIsLoading(true);
    let data = {industries: e};
    const response = await get_filter_partner_up(data);
    if (response.status) {
      setPartnerCompanydetail(response.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setPartnerCompanydetail([]);
      setIsLoading(false);
    }
  };

  const handleCouPonFilter = async e => {
    setIsLoading(true);
    let data = {coupon_types: e};
    const response = await get_filter_partner_up(data);
    if (response.status) {
      setPartnerCompanydetail(response.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setPartnerCompanydetail([]);
      setIsLoading(false);
    }
  };

  const handleModalView = () => {
    setModalVisible(!modalVisible);
    getData();
  };

  return (
    <SafeAreaView 
    style={{backgroundColor:Colors.white,flex:1}}
    >
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ScrollView 
      style={{backgroundColor:Colors.white}} 
      showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <View style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setSwipe(true)}
              style={styles.filterBTNStyle}>
              <MaterialCommunityIcons
                name="gesture-swipe"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSwipe(false)}
              style={styles.filterBTNStyle}>
              <Feather name="grid" size={25} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <FilterComp
          handleINDFilter={handleINDFilter}
          handleCouPonFilter={handleCouPonFilter}
        />

        <ScrollView
          style={{marginBottom: Dimensions.get('screen').height * 0.05}}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.blue} />
              <Text style={styles.loaderText}>Loding Data please wait...</Text>
            </View>
          ) : (
            <>
              {partnerCompanydetail.length > 1 ? (
                <View>
                  {swipe ? (
                    partnerCompanydetail.map(
                      (u, i) =>
                        currentIndex === i && (
                          <SwipePartnerUp
                            key={i}
                            ref={swipesRef}
                            currentIndex={currentIndex}
                            data={partnerCompanydetail}
                            handleLike={handleLike}
                            handlePass={handlePass}
                          />
                        ),
                    )
                  ) : (
                    <GridView data={partnerCompanydetail} />
                  )}
                </View>
              ) : (
                <Text
                  style={styles.noDataFound}>
                  DATA NOT AVAILABLE
                </Text>
              )}
            </>
          )}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <SendRequestModal
            handleModalView={() => handleModalView()}
            user={partnerCompanydetail[currentIndex]}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterBTNStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.black,
    padding: responsivePadding(10),
    paddingHorizontal: responsivePadding(15),
    borderRadius: responsivePadding(10),
    elevation: responsivePadding(3),
    marginHorizontal: responsivePadding(5),
  },
  loadingContainer:{
    width:'95%',
    alignSelf:'center',
    gap:responsivePadding(10),
    alignItems:'center',
    padding:responsivePadding(10)
  },
  loaderText:{
    fontSize:responsiveFontSize(20),
    fontWeight:'600',
    color:Colors.blue
  },
  noDataFound:{
    margin: responsivePadding(10),
    textAlign: 'center',
    textAlignVertical: 'center',
    height: Dimensions.get('screen').width,
    backgroundColor: Colors.white,
    elevation: responsivePadding(7),
    borderRadius: responsivePadding(10),
    color: Colors.dark_black,
  }
});
