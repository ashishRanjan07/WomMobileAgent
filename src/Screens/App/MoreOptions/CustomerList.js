import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import AppHeader from '../../../Components/AppHeader';
import Colors from '../../../Assets/Colors';
import {FontSize} from '../../../Assets/Fonts';
import {get_all_customer} from '../../../API_Services/Internal_API';

export default function CustomerList({navigation}) {
  const title = 'Your Customers';
  const leftIconText = 'Back';
  const leftIconBTN = () => {
    navigation.goBack();
  };
  const leftIcon = (
    <Ionicons name="chevron-back-outline" size={25} color={Colors.white} />
  );

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
    getData();
  }, [navigation]);

  const getData = async () => {
    setIsLoading(true);
    const response = await get_all_customer();
    if (response.status) {
      setList(response.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setIsLoading(false);
      setList([]);
    }
  };

  // refreshing the screen
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

  return (
    <SafeAreaView >
        <StatusBar barStyle={"dark-content"} backgroundColor={Colors
        .black}/>
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <AppHeader
          title={title}
          leftIconBTN={leftIconBTN}
          leftIcon={leftIcon}
          leftIconText={leftIconText}
        />
        <View style={{padding: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateCustomer')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name="add-circle-outline"
              size={Dimensions.get('screen').width * 0.2}
              color={Colors.black}
            />
            <Text style={{color: Colors.black, fontSize: FontSize.fontSize16}}>
              Create Customer
            </Text>
          </TouchableOpacity>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.black} />
            </View>
          ) : (
            <>
              {list.length ? (
                <View>
                  {list.map((e, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          navigation.navigate('CustomerProfile', {e})
                        }
                        style={styles.listContainer}>
                        <View style={{margin: 5}}>
                          {/* <Image source={{ uri: e.image }} style={styles.imageStyle} /> */}
                          <Image
                            source={{uri: 'https://picsum.photos/200'}}
                            style={styles.imageStyle}
                          />
                        </View>

                        <View style={{paddingLeft: 10}}>
                          <Text style={styles.title}>{e.full_name}</Text>
                          <Text>{e.email}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('screen').width * 0.3,
                  }}>
                  <Text>Not found any customers</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: Dimensions.get('screen').width * 0.165,
    width: Dimensions.get('screen').width * 0.165,
    borderRadius: 100,
  },
  title: {
    fontSize: FontSize.fontSize18,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
