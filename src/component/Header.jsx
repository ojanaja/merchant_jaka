import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ToggleSwitch from 'toggle-switch-react-native';
import axios from 'axios';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = (props) => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                console.log(id);
                if (id) {
                    setUserId(id);
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    const toggleSwitch = async () => {
        try {
            const response = await axios.post(`https://jaka-itfair.vercel.app/api/v1/penjamu-activities/${isEnabled ? 'deactivate' : 'activate'}/${userId}`);
            console.log(response.data);
            setIsEnabled(previousState => !previousState);
        } catch (error) {
            console.error('Toggle switch error:', error);
        }
    };

    return (
        <View style={styles.header}>
            <View>
                {props?.goBack === true ? (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={22} color={Colors.BLACK} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name="menu" size={25} />
                    </TouchableOpacity>
                )}
            </View>
            {props?.onlineSwitch === true ? (
                <Text style={styles.textWithSwitch}>{props?.name}</Text>
            ) : (
                <Text style={styles.textNoSwitch}>{props?.name}</Text>
            )}
            <View>
                {props?.onlineSwitch === true ? (
                    <ToggleSwitch
                        isOn={isEnabled}
                        onColor={Colors.PRIMARY}
                        offColor={Colors.BLACK}
                        size="medium"
                        animationSpeed={300}
                        onToggle={toggleSwitch}
                    />
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    textWithSwitch: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: Colors.BLACK,
    },
    textNoSwitch: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: Colors.BLACK,
    },
});

export default Header;
