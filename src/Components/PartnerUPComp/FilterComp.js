import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import Colors from '../../Assets/Colors'
import { FontSize } from '../../Assets/Fonts'

import IndustryFilter from './IndustryFilter'
import PartnerShipRequiredFilter from './PartnerShipRequiredFilter'

export default function FilterComp({ handleINDFilter, handleCouPonFilter }) {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <Text style={styles.tittleStyle}>Filters</Text>

            <IndustryFilter tittle={"Industry"} handleBTN={(e) => handleINDFilter(e)} />

            <PartnerShipRequiredFilter tittle={"Partnership Required"} handleBTN={(e) => handleCouPonFilter(e)} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        padding: 10,
    },
    tittleStyle: {
        fontSize: FontSize.fontSize18,
        color: Colors.black,
        fontWeight: 'bold',
    }
})