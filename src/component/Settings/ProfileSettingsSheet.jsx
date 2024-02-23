import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { TextInput } from 'react-native-element-textinput';

const ProfileSettingsSheet = ({ onClose }) => {
    const [value, setValue] = useState('');
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topButton} onPress={onClose}>
                <Text style={styles.topButtonText}>Done</Text>
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/user-profile.jpg')} style={styles.profilePicture} />
                </TouchableOpacity>
                <Text style={styles.profileText}>Martha Banks</Text>
                <Text style={styles.profileMemberText}>Gold Member</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>INFORMATIONS</Text>
                <TextInput
                    inputMode="numeric"
                    value={value}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    placeholder="Whatsapp Number"
                    placeholderTextColor={Colors.GREY}
                    onChangeText={text => {
                        setValue(text);
                    }}
                />
                <TextInput
                    mode="default"
                    value={value}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    placeholder="NIM"
                    placeholderTextColor={Colors.GREY}
                    onChangeText={text => {
                        setValue(text);
                    }}
                />
            </View>
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
    profileContainer: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    profileText: {
        fontFamily: Fonts.bold,
        color: Colors.BLACK,
        fontSize: 22,
        marginTop: 10,
    },
    profileMemberText: {
        fontFamily: Fonts.regular,
        color: Colors.GREY,
        fontSize: 14,
        marginTop: 5,
        marginBottom: 20,
    },
    infoContainer: {
        height: '100%',
        backgroundColor: Colors.BROKENWHITE,
    },
    infoText: {
        marginTop: 15,
        marginBottom: 10,
        color: Colors.GREY,
        marginHorizontal: 15,
    },
    input: {
        width: '100%',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.GREY,
        marginVertical: 1,
    },
    inputStyle: { fontFamily: Fonts.regular, fontSize: 15 },
    placeholderStyle: { fontFamily: Fonts.regular, fontSize: 15 },
    textErrorStyle: { fontFamily: Fonts.regular, fontSize: 15 },
});

export default ProfileSettingsSheet;

