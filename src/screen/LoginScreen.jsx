import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { TextInput } from 'react-native-element-textinput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        const userData = {
            phone: phone,
            password: password,
            type: 'merchant',
        };

        axios.post('https://jaka-green.vercel.app/api/v1/auth/login', userData)
            .then(response => {
                console.log('Login successful:', response.data);
                AsyncStorage.setItem('userToken', response.data.data.token)
                    .then(() => {
                        console.log('Token stored successfully.');
                        navigation.navigate('AppStack');
                    })
                    .catch(error => {
                        console.error('Error storing token:', error);
                    });
            })
            .catch(error => {
                console.error('Login failed:', error);
                Alert.alert('Login Error', 'Invalid phone number or password. Please try again.');
            });
    };

    return (
        <View >
            <View style={styles.container}>
                <View style={styles.imageBehind}>
                    <Image style={styles.image} source={require('../assets/images/Background.png')} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.backgroundImageContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.signUpText}>Masuk<Text style={styles.headerText}> menggunakan nomor WhatsApp</Text></Text>
                        </View>
                    </View>
                    <View style={styles.signUpContainer}>
                        <TextInput
                            inputMode="numeric"
                            value={phone}
                            style={styles.input}
                            inputStyle={styles.inputStyle}
                            placeholderStyle={styles.placeholderStyle}
                            textErrorStyle={styles.textErrorStyle}
                            placeholder="Nomor Whatsapp"
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
                        <View style={styles.signUpButtonContainer}>
                            <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
                                <Text style={styles.signUpButtonText}>Masuk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.loginDefaultText}>Belum punya akun? <Text style={styles.loginBoldText}>Sign up</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    imageBehind: {
        backgroundColor: Colors.PRIMARY,
        height: Dimensions.get('window').height - 650,
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 750,
        top: 100,
    },
    contentContainer: {
        backgroundColor: Colors.WHITE,
        width: Dimensions.get('window').width - 30,
        height: 'auto',
        elevation: 5,
        top: -50,
        borderRadius: 15,
    },
    backgroundImageContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    signUpContainer: {
        padding: 20,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    signUpText: {
        fontFamily: Fonts.black,
        fontSize: 35,
        color: Colors.BLACK,
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
    loginButtonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: Dimensions.get('window').height - 630,
    },
    loginDefaultText: {
        fontFamily: Fonts.regular,
        color: Colors.BLACK,
    },
    loginBoldText: {
        fontFamily: Fonts.bold,
    },
});

export default LoginScreen;
