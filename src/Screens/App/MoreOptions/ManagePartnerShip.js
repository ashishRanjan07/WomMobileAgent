import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import AppHeader from '../../../Components/AppHeader';
import Colors from '../../../Assets/Colors';
import {FontSize} from '../../../Assets/Fonts';
import ManagePartnerShipSent from '../../../Components/MoreOptions/ManagePartnerShipSent';
import ManagePartnerShipRecived from '../../../Components/MoreOptions/ManagePartnerShipRecived';
import {
  decline_partnership_request,
  get_agent_partnership_request,
  accept_partnership_request,
} from '../../../API_Services/Internal_API';
import {responsivePadding} from '../../../Component/Responsive';

export default function ManagePartnerShip({navigation}) {
  const title = 'Your Partnersips';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color="#fff" />
  );

  const [sentView, setSentView] = useState(false);
  const [receivedRequestList, setReceivedRequestList] = useState([]);
  const [sentRequestList, setSentRequestList] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await get_agent_partnership_request();

    if (resp.status) {
      setReceivedRequestList(resp.data.received_request);
      setSentRequestList(resp.data.sent_request);
    } else {
      Toast.show({
        type: 'error',
        text1: resp.message,
      });
      setReceivedRequestList([]);
      setSentRequestList([]);
    }
  };

  const requestWidraw = async (selectedID, cancelResion, validity) => {
    let id = selectedID.org_id._id;
    let req_id = selectedID.requested_id;

    const response = await decline_partnership_request(
      id,
      req_id,
      cancelResion,
      validity,
    );

    if (response.status) {
      getData();
      // navigation.goBack()
      Toast.show({
        type: 'success',
        text1: response.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
  };

  const requestAccept = async e => {
    let id = e.org_id._id;
    let req_id = e.requested_id;

    const response = await accept_partnership_request(id, req_id);

    if (response.status) {
      getData();
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

  return (
    <SafeAreaView style={{backgroundColor: Colors.black, flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.black} />
      <AppHeader
        title={title}
        leftIconBTN={leftIconBTN}
        leftIcon={leftIcon}
        leftIconText={leftIconText}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.border_grey,
          height: '100%',
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <View style={styles.TopTabContainer}>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: sentView
                    ? Colors.managePartnerShipTopBarBackground
                    : Colors.white,
                },
              ]}
              onPress={() => setSentView(false)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: sentView ? '400' : 'bold'},
                ]}>
                Received
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tapBarBTN,
                {
                  backgroundColor: sentView
                    ? Colors.white
                    : Colors.managePartnerShipTopBarBackground,
                },
              ]}
              onPress={() => setSentView(true)}>
              <Text
                style={[
                  styles.topBarBTNText,
                  {fontWeight: sentView ? 'bold' : '400'},
                ]}>
                Sent
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: Colors.white}}>
            {sentView ? (
              <View>
                {sentRequestList.length > 0 ? (
                  <ManagePartnerShipSent
                    sentRequestList={sentRequestList}
                    requestWidraw={requestWidraw}
                    RFPlease={() => getData()}
                  />
                ) : (
                  <Text style={styles.NotDataText}>
                    Not Send Data Available
                  </Text>
                )}
              </View>
            ) : (
              <View>
                {receivedRequestList.length > 0 ? (
                  <ManagePartnerShipRecived
                    receivedRequestList={receivedRequestList}
                    requestWidraw={requestWidraw}
                    RFPlease={() => getData()}
                    requestAccept={requestAccept}
                  />
                ) : (
                  <Text style={styles.NotDataText}>
                    Not Recived Data Available
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    height: '100%',
    marginVertical: responsivePadding(20),
  },
  TopTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tapBarBTN: {
    backgroundColor: Colors.white,
    width: '47%',
    borderTopLeftRadius: responsivePadding(10),
    borderTopRightRadius: responsivePadding(10),
  },
  topBarBTNText: {
    padding: responsivePadding(10),
    textAlign: 'center',
    fontSize: FontSize.fontSize18,
    color: Colors.black,
    // fontWeight: 'bold',
  },
  NotDataText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: Dimensions.get('screen').width / 2,
    color: Colors.dark_black,
    fontWeight: 'bold',
    fontSize: FontSize.fontSize18,
  },
});
