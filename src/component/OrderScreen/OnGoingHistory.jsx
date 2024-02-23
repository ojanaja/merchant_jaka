import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const OnGoingHistory = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    Array.from({ length: 20 }, (_, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.historyDetailsContainer}
                        >
                            <View style={styles.historyHeader}>
                                <Text style={styles.historyHeaderText}>24 Jan, 22:17</Text>
                                <Text style={styles.historyHeaderText}>Rp 90.000</Text>
                            </View>
                            <View style={styles.historyDetails}>
                                <Image source={require('../../assets/images/food_icons.png')} style={styles.historyIcons} />
                                <View style={styles.historyInfo}>
                                    <Text style={styles.historyInfoTextStore}>Mie Gacoan, Bandung Cibiru</Text>
                                    <View style={styles.historyInfoStatusContainer}>
                                        <FontAwesome5 name="walking"
                                            size={12}
                                            color={Colors.PRIMARY} />
                                        <Text
                                            style={styles.historyInfoTextStatus}>On going</Text>
                                    </View>
                                    <Text style={styles.historyInfoTextOrder}>4 Mie Gacoan lv 2, 2 Mie Gacoan lv 1</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.BROKENWHITE
    },
    historyDetailsContainer: {
        height: 'auto',
        width: Dimensions.get('window').width - 30,
        backgroundColor: Colors.WHITE,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        padding: 15,
    },
    historyIcons: {
        width: 70,
        height: 70,
    },
    historyInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    historyDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    historyHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    historyHeaderText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: Colors.BLACK
    },
    historyInfoTextStore: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.BLACK,
    },
    historyInfoTextStatus: {
        fontFamily: Fonts.semibold,
        fontSize: 14,
        color: Colors.BLACK,

    },
    historyInfoTextOrder: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.GREYTEXT,
    },
    historyInfoStatusContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
})

export default OnGoingHistory