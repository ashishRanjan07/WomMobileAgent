import React from 'react'
import { View, Text, ScrollView, Pressable, Image, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Colors from '../../Assets/Colors'
import { FontSize } from '../../Assets/Fonts'

export default function StatisticsDataView({ data }) {

    const navigation = useNavigation();

    const handleOpenDetail = async (e) => {
        navigation.navigate('OpenORGProfile', { e })
    }

    return (
        <View>
            {
                data.map((e, key) => (
                    <View key={key} style={styles.listContainer}>

                        <Text style={styles.industry_title_Style}>
                            {e.industry_title.toUpperCase()}
                        </Text>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {e.items.map((e, key2) => (
                                <Pressable key={key2} style={styles.card} onPress={() => handleOpenDetail(e)}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            // source={e.image}
                                            source={require('../../Assets/Images/man.png')}
                                            // source={e.images ? require('../../Assets/Images/man.png') : e.images}
                                            style={styles.imageStyle} />
                                    </View>

                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.CompanyName}>{e.partnership.organisation.org_id.name}</Text>

                                        <View style={styles.detailsText}>
                                            <Text style={styles.bottomText}>Area : </Text>
                                            <Text style={styles.bottomText}>{e.partnership.organisation.org_id.area}</Text>
                                        </View>

                                        <View style={styles.detailsText}>
                                            <Text style={styles.bottomText}>About : </Text>
                                            <Text style={styles.bottomText}>{e.partnership.organisation.org_id.about}</Text>
                                        </View>

                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>

                    </View>

                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    },
    industry_title_Style: {
        color: Colors.dark_black,
        fontWeight: 'bold',
    },
    imageStyle: {
        height: Dimensions.get('screen').width * 0.2,
        width: Dimensions.get('screen').width * 0.2,
    },
    card: {
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.86,
        // height: Dimensions.get('screen').height * 0.15,
        // justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 7,
        padding: 7,
    },
    bottomText: {
        fontSize: FontSize.fontSize10,
    },
    CompanyName: {
        fontSize: FontSize.fontSize20,
        color: Colors.black,
        flexShrink: 1,
        // paddingLeft: 10,
    },
    detailsContainer: {
        paddingLeft: 10,
        justifyContent: 'space-evenly'
    },
    detailsText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})