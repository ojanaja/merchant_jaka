import { Platform, PermissionsAndroid, ImagePicker } from 'react-native';

const openCamera = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera();
            } else {
                console.log('Camera permission denied');
            }
        } else {
            launchCamera();
        }
    } catch (error) {
        console.error('Error requesting camera permission:', error);
    }
};

const launchCamera = () => {
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log('Image response:', response);
        }
    });
};

export { openCamera };
