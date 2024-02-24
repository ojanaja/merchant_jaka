/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera } from 'react-native-image-picker';

const DocumentBottomSheet = ({ onClose }) => {
    const openCamera = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCameraAndSave();
                } else {
                    console.log('Camera permission denied');
                }
            } else {
                launchCameraAndSave();
            }
        } catch (error) {
            console.error('Error requesting camera permission:', error);
        }
    };

    const launchCameraAndSave = async () => {
        launchCamera({ mediaType: 'photo', saveToPhotos: true }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('Image response:', response);
                //fetch to API
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topButton} onPress={onClose}>
                <Text style={styles.topButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsContainer} onPress={openCamera}>
                <View style={[styles.iconContainer, { backgroundColor: Colors.GREY }]}>
                    <FontAwesome5 name="address-card" size={18} solid color={Colors.WHITE} />
                </View>
                <View style={[styles.textContainer, { width: 340 }]}>
                    <Text style={styles.settingsTextStyle}>Verifikasi KTM</Text>
                    <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.GREY} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    topButton: {
        alignItems: 'flex-end',
        paddingHorizontal: 15,
    },
    topButtonText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.PRIMARY,
    },
    settingsContainer: {
        backgroundColor: Colors.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.GREY,
    },
    iconContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    settingsTextStyle: {
        fontFamily: Fonts.semibold,
        color: Colors.BLACK,
        fontSize: 15,
    }, textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: Fonts.semibold,
        color: Colors.BLACK,
        fontSize: 18,
    },
});

export default DocumentBottomSheet;
