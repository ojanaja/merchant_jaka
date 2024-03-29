/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import axios from 'axios';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Header from '../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({ navigation, route }) => {
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const storedPhoneNumber = await AsyncStorage.getItem('userData');
                if (storedPhoneNumber !== null) {
                    const parsedPhoneNumber = JSON.parse(storedPhoneNumber);
                    setPhoneNumber(parsedPhoneNumber);
                }
            } catch (error) {
                console.error('Error fetching phone number:', error);
            }
        };

        fetchPhoneNumber();
    }, []);

    const handleOTP = async () => {
        console.log(phoneNumber);
        const userOTP = {
            phone: phoneNumber,
            otp: code,
            type: 'merchant',
        };

        try {
            const response = await axios.post('https://jaka-itfair.vercel.app/api/v1/auth/verify-otp', userOTP);
            console.log('User OTP:', userOTP);
            console.log('Verification successful:', response.data);
            navigation.navigate('Login');
        } catch (error) {
            console.error('User OTP:', userOTP);
            console.error('Verification failed:', error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header goBack={true} name="OTP Verification" />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Masukkan kode verifikasi</Text>
                <OtpInput
                    numberOfDigits={6}
                    focusColor={Colors.PRIMARY}
                    hideStick
                    onFilled={(code) => setCode(code)}
                    theme={{
                        pinCodeTextStyle: styles.pinCodeTextStyle,
                        focusedPinCodeContainerStyle: styles.focusPinCodeContainerStyle,
                    }}
                />
                <Text style={styles.infoText}>Kami telah mengirim kode OTP ke email anda. Silahkan cek email anda.</Text>
                <TouchableOpacity onPress={handleOTP} style={styles.verifyButton}>
                    <Text style={styles.verifyButtonText}>Verifikasi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 20,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 90,
        fontFamily: Fonts.semibold,
        fontSize: 20,
    },
    contentContainer: {
        paddingHorizontal: 25,
        marginVertical: 20,
    },
    title: {
        color: Colors.BLACK,
        fontFamily: Fonts.bold,
        fontSize: 40,
        marginTop: 40,
        marginBottom: 10,
    },
    pinCodeTextStyle: {
        color: Colors.BLACK,
        fontFamily: Fonts.bold,
        fontSize: 25,
    },
    focusPinCodeContainerStyle: {
        borderWidth: 1,
    },
    infoText: {
        fontFamily: 'poppins',
        fontSize: 15,
        maxWidth: 400,
        marginTop: 10,
    },
    verifyButton: {
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    verifyButtonText: {
        color: Colors.WHITE,
        fontFamily: Fonts.bold,
        fontSize: 16,
    },
});

export default OTPScreen;
