import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  RefreshControl,
  ScrollView,
  Image,
  StatusBar,
  Pressable,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Colors from '../../../Assets/Colors';
import AppHeader from '../../../Components/AppHeader';
import {get_agent_statistics} from '../../../API_Services/Internal_API';
import StatisticsDataView from '../../../Components/Statistics/StatisticsDataView';

export default function Statistics() {
  const title = 'Your Partners';

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await get_agent_statistics();

    if (response.status) {
      setData(response.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
      setIsLoading(false);
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

  return (
    <SafeAreaView style={{backgroundColor: Colors.black}}>
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
        <AppHeader title={title} />

        <View style={{backgroundColor: Colors.white, height: '100%'}}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.black} />
            </View>
          ) : (
            <View>
              {data.length > 0 ? (
                <StatisticsDataView data={data} />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 20,
                    fontWeight: '500',
                  }}>
                  Not Found any Partnership
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
