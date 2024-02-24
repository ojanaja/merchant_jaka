/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-element-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleRegister = () => {
        if (!name || !phone || !password) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Form ada yang belum terisi',
                textBody: 'Isi formnya dengan benar yuk!',
                button: 'close',
            });
            return;
        }

        setIsLoading(true);

        const userData = {
            name: name,
            phone: phone,
            password: password,
            address: address,
            lat: lat,
            lng: lng,
            type: 'merchant',
        };

        AsyncStorage.setItem('userData', JSON.stringify(userData))
            .then(() => {
                axios.post('https://jaka-green.vercel.app/api/v1/auth/register', userData)
                    .then(response => {
                        console.log('User Data:', userData);
                        console.log('Registration successful:', response.data);
                        // navigation.navigate('OTP', { nim: nim });
                    })
                    .catch(error => {
                        console.error('User Data:', userData);
                        console.error('Registration failed:', error);
                    })
                    .finally(() => {
                        setIsLoading(false); // Set loading state back to false regardless of success or failure
                    });
            })
            .catch(error => {
                console.error('Error storing user data:', error);
                setIsLoading(false); // Set loading state back to false if AsyncStorage fails
            });
    };

    return (
        <AlertNotificationRoot>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.backgroundImageContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.signUpText}>Buat Akun<Text style={styles.headerText}> menggunakan email dan nomor WhatsApp</Text></Text>
                            </View>
                            <Image style={styles.imageBackground} source={require('../assets/images/Background.png')} />
                        </View>
                        <View style={styles.signUpContainer}>
                            <View>
                                <TextInput
                                    inputMode="text"
                                    value={name}
                                    style={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    textErrorStyle={styles.textErrorStyle}
                                    placeholder="Nama Toko"
                                    placeholderTextColor={Colors.GREY}
                                    onChangeText={text => {
                                        setName(text);
                                    }}
                                />
                                <TextInput
                                    inputMode="text"
                                    value={address}
                                    style={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    textErrorStyle={styles.textErrorStyle}
                                    placeholder="Alamat"
                                    placeholderTextColor={Colors.GREY}
                                    onChangeText={text => {
                                        setAddress(text);
                                    }}
                                />
                                <TextInput
                                    inputMode="numeric"
                                    value={phone}
                                    style={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    textErrorStyle={styles.textErrorStyle}
                                    placeholder="Nomer Whatsapp"
                                    placeholderTextColor={Colors.GREY}
                                    onChangeText={text => {
                                        setPhone(text);
                                    }}
                                />
                                <TextInput
                                    mode="password"
                                    value={password}
                                    style={styles.input}
                                    inputStyle={styles.inputStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    textErrorStyle={styles.textErrorStyle}
                                    placeholder="Password"
                                    placeholderTextColor={Colors.GREY}
                                    onChangeText={text => {
                                        setPassword(text);
                                    }}
                                />
                            </View>
                            <View style={styles.signUpButtonContainer}>
                                <TouchableOpacity style={styles.signUpButton} onPress={handleRegister} disabled={isLoading}>
                                    {isLoading ? (
                                        <ActivityIndicator size="large" color={Colors.WHITE} />
                                    ) : (
                                        <Text style={styles.signUpButtonText}>Daftar</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginDefaultText}>Sudah punya akun? <Text style={styles.loginBoldText}>Masuk</Text></Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </AlertNotificationRoot>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        top: Dimensions.get('window').height - 870,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
    },
    contentContainer: {
        backgroundColor: Colors.WHITE,
        width: Dimensions.get('window').width - 30,
        height: 'auto',
        elevation: 5,
        borderRadius: 15,
    },
    backgroundImageContainer: {
        height: '40%',
        backgroundColor: Colors.PRIMARY,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    signUpContainer: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    imageBackground: {
        width: Dimensions.get('window').width - 650,
        height: Dimensions.get('window').height - 790,
        top: 15,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        padding: 25,
    },
    signUpText: {
        fontFamily: Fonts.black,
        fontSize: 35,
        color: Colors.WHITE,
    },
    headerText: {
        fontFamily: Fonts.regular,
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 5,
    },
    inputStyle: { fontFamily: Fonts.regular, fontSize: 15 },
    placeholderStyle: { fontFamily: Fonts.regular, fontSize: 15 },
    textErrorStyle: { fontFamily: Fonts.regular, fontSize: 15 },
    signUpButtonContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    signUpButton: {
        width: Dimensions.get('window').width - 70,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    signUpButtonText: {
        fontFamily: Fonts.bold,
        color: Colors.WHITE,
        fontSize: 18,
    },
    loginDefaultText: {
        fontFamily: Fonts.regular,
        color: Colors.BLACK,
    },
    loginBoldText: {
        fontFamily: Fonts.bold,
    },
    loginButton: {
        marginTop: 20,
    },
});

export default RegisterScreen;
