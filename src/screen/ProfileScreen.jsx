import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  Linking,
  PermissionsAndroid
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomSheet from '@gorhom/bottom-sheet';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import ToggleSwitch from 'toggle-switch-react-native';
import DocumentBottomSheet from '../component/Settings/DocumentBottomSheet';
import ProfileSettingsSheet from '../component/Settings/ProfileSettingsSheet';
import ContactUsBottomSheet from '../component/Settings/ContactUsBottomSheet';
import TermsPrivacyBottomSheet from '../component/Settings/TermsPrivacyBottomSheet';

const ProfileScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [bottomSheets, setBottomSheets] = useState({
    documentManagement: false,
    profileSettings: false,
    contact: false,
    termsPrivacy: false,
  });
  const bottomSheetRef = useRef(null);
  const snapPoints = ['100%', '95%'];

  const updatePermissionsState = (notification, location) => {
    setNotificationEnabled(notification);
    setLocationEnabled(location);
  };

  const checkPermissions = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const notificationEnabled = await checkNotificationPermissionAndroid();
        const locationEnabled = await checkLocationPermissionAndroid();
        updatePermissionsState(notificationEnabled, locationEnabled);
      } else if (Platform.OS === 'ios') {
        const notificationEnabled = await checkNotificationPermissionIOS();
        const locationEnabled = await checkLocationPermissionIOS();
        updatePermissionsState(notificationEnabled, locationEnabled);
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  }, []);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);


  const checkNotificationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      return granted;
    } catch (error) {
      console.error('Error checking notification permission on Android:', error);
      return false;
    }
  };

  const checkNotificationPermissionIOS = async () => {
    try {
      const permission = await check(PERMISSIONS.IOS.NOTIFICATIONS);
      return permission === 'granted';
    } catch (error) {
      console.error('Error checking notification permission on iOS:', error);
      return false;
    }
  };

  const checkLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      return granted;
    } catch (error) {
      console.error('Error checking location permission on Android:', error);
      return false;
    }
  };

  const checkLocationPermissionIOS = async () => {
    try {
      const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return permission === 'granted';
    } catch (error) {
      console.error('Error checking location permission on iOS:', error);
      return false;
    }
  };

  const handleDenyPermission = async (permissionType) => {
    try {
      if (Platform.OS === 'android') {
        await Linking.openSettings();
      } else if (Platform.OS === 'ios') {
        // Handle iOS permission denial
      }
    } catch (error) {
      console.error('Error handling deny permission:', error);
    }
  };

  const handleNotificationToggle = async () => {
    try {
      if (notificationEnabled) {
        setNotificationEnabled(false);
        await handleDenyPermission('notification');
      } else {
        const permissionResult = await requestNotificationPermission();
        if (permissionResult === 'granted') {
          setNotificationEnabled(true);
        }
      }
    } catch (error) {
      console.error('Error handling notification toggle:', error);
    }
  };

  const handleLocationToggle = async () => {
    try {
      if (locationEnabled) {
        setLocationEnabled(false);
        await handleDenyPermission('location');
      } else {
        const permissionResult = await requestLocationPermission();
        if (permissionResult === 'granted') {
          setLocationEnabled(true);
        }
      }
    } catch (error) {
      console.error('Error handling location toggle:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        return PermissionsAndroid.request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      } else if (Platform.OS === 'ios') {
        return request(PERMISSIONS.IOS.NOTIFICATIONS);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        return PermissionsAndroid.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else if (Platform.OS === 'ios') {
        return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const toggleBottomSheet = (sheetName) => {
    setBottomSheets(prevState => ({
      ...prevState,
      [sheetName]: !prevState[sheetName],
    }));
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleSheetChanges = (index) => {
    console.log('handleSheetChanges', index);
  };

  const renderBottomSheetContent = (sheetName, closeBottomSheet) => {
    switch (sheetName) {
      case 'documentManagement':
        return (
          <View style={styles.bottomSheetContainer}>
            <DocumentBottomSheet onClose={closeBottomSheet} />
          </View>
        );
      case 'profileSettings':
        return (
          <View style={styles.bottomSheetContainer}>
            <ProfileSettingsSheet onClose={closeBottomSheet} />
          </View>
        );
      case 'contact':
        return (
          <View style={styles.bottomSheetContainer}>
            <ContactUsBottomSheet onClose={closeBottomSheet} />
          </View>
        );
      case 'termsPrivacy':
        return (
          <View style={styles.bottomSheetContainer}>
            <TermsPrivacyBottomSheet onClose={closeBottomSheet} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.profileContainer} onPress={() => toggleBottomSheet('profileSettings')}>
        <Image source={require('../assets/images/user-profile.jpg')} style={styles.profilePicture} />
        <View style={[styles.textContainer, { width: 320 }]}>
          <Text style={styles.textStyle}>Martha Banks</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.GREY} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsContainer} onPress={() => toggleBottomSheet('documentManagement')}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.GREENBRIGHT }]}>
          <FontAwesome5 name="address-card" size={18} solid color={Colors.WHITE} />
        </View>
        <View style={[styles.textContainer, { width: 340 }]}>
          <Text style={styles.settingsTextStyle}>Document Management</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.GREY} />
        </View>
      </TouchableOpacity>
      <View style={[styles.settingsContainer, { marginTop: 20 }]}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.PRIMARY }]}>
          <Ionicons name="notifications" size={18} solid color={Colors.WHITE} />
        </View>
        <View style={[styles.textContainer, { width: 340 }]}>
          <Text style={styles.settingsTextStyle}>Notifications</Text>
          <ToggleSwitch
            isOn={notificationEnabled}
            onColor={Colors.PRIMARY}
            offColor={Colors.BLACK}
            size="medium"
            onToggle={handleNotificationToggle}
          />
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.YELLOW }]}>
          <Entypo name="location-pin" size={23} solid color={Colors.WHITE} />
        </View>
        <View style={[styles.textContainer, { width: 340 }]}>
          <Text style={styles.settingsTextStyle}>Locations</Text>
          <ToggleSwitch
            isOn={locationEnabled}
            onColor={Colors.PRIMARY}
            offColor={Colors.BLACK}
            size="medium"
            onToggle={handleLocationToggle}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.settingsContainer} onPress={() => toggleBottomSheet('termsPrivacy')}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.GREY }]}>
          <FontAwesome6 name="crown" size={18} solid color={Colors.WHITE} />
        </View>
        <View style={[styles.textContainer, { width: 340 }]}>
          <Text style={styles.settingsTextStyle}>Terms & Privacy</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.GREY} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsContainer} onPress={() => toggleBottomSheet('contact')}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.RED }]}>
          <MaterialIcons name="question-answer" size={20} solid color={Colors.WHITE} />
        </View>
        <View style={[styles.textContainer, { width: 340 }]}>
          <Text style={styles.settingsTextStyle}>Contact Us</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.GREY} />
        </View>
      </TouchableOpacity>
      {Object.entries(bottomSheets).map(([key, value]) => (
        value && (
          <BottomSheet
            key={key}
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            animateOnMount={true}
            enableOverDrag={true}
            enablePanDownToClose={true}
            onClose={() => toggleBottomSheet(key)}
          >
            {renderBottomSheetContent(key, closeBottomSheet)}
          </BottomSheet>
        )
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    marginVertical: 20,
    backgroundColor: Colors.WHITE,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profilePicture: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  textContainer: {
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
  },
  bottomSheetContainer: {
  },
  switchContainerStyle: {
    width: 45,
    height: 25,
    borderRadius: 20,
    padding: 3,
  },
  switchCircleStyle: {
    width: 18,
    height: 18,
    borderRadius: 50,
  },
});

export default ProfileScreen;
