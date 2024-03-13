import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            description: '',
            imageUri: null,
            loading: false,
            errorMessage: '',
            isProcessing: false,
        };
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value });
    };

    handleImagePicker = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.launchImageLibraryAndSave();
                } else {
                    console.log('Storage permission denied');
                }
            } else {
                this.launchImageLibraryAndSave();
            }
        } catch (error) {
            console.error('Error requesting storage permission:', error);
        }
    };

    launchImageLibraryAndSave = async () => {
        this.setState({ isProcessing: true });
        launchImageLibrary({ mediaType: 'photo', includeBase64: false }, async (response) => {
            this.setState({ isProcessing: false });
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('Image response:', response.assets[0].uri);
                // Resize the image before setting the state
                const resizedImageUri = await this.resizeImage(response.assets[0].uri);
                this.setState({ imageUri: resizedImageUri }); // Set resized image URI
            }
        });
    };

    resizeImage = async (uri) => {
        try {
            const resizedImage = await ImageResizer.createResizedImage(
                uri,
                800, // width
                600, // height
                'JPEG', // format
                70, // quality
            );
            return resizedImage.uri;
        } catch (error) {
            console.error('Error resizing image:', error);
            return uri; // Return original URI if resizing fails
        }
    };

    addProduct = async () => {
        const { productName, productPrice, description, imageUri } = this.state;
        this.setState({ errorMessage: '', loading: true });

        if (productName && productPrice && description && imageUri) {
            try {
                // Retrieve the user ID from AsyncStorage
                const userId = await AsyncStorage.getItem('userId');
                const userToken = await AsyncStorage.getItem('userToken');

                // Construct FormData object
                const formData = new FormData();
                formData.append('merchant_id', userId);
                formData.append('name', productName);
                formData.append('price', productPrice);
                formData.append('description', description);
                formData.append('filename', {
                    uri: imageUri,
                    type: 'image/jpeg', // Adjust accordingly if the image type is different
                });

                // Send the Axios POST request
                const response = await axios.post('https://jaka-itfair.vercel.app/api/v1/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Ensure correct content type
                        // 'Authorization': `Bearer ${userToken}`,
                    },
                });

                // Check the response structure and access the appropriate properties
                const { data } = response; // Assuming the response data contains the product details
                const { product_name, product_price, id } = data; // Update property names if needed

                this.props.closeModal();
                this.props.addProduct({
                    product_name,
                    product_price,
                    id,
                });
            } catch (error) {
                this.setState({ errorMessage: 'Network Error. Please try again.', loading: false });
                console.error('Add product error:', error);
            }
        } else {
            this.setState({ errorMessage: 'Please fill in all fields.', loading: false });
        }
    };


    render() {
        const { isOpen, closeModal } = this.props;
        const { loading, errorMessage, description, imageUri, isProcessing } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Product</Text>

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, 'productName')}
                        placeholder="Product Name" />

                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, 'productPrice')}
                        placeholder="Product Price" />

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, 'description')}
                        placeholder="Description" />

                    {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}

                    <TouchableOpacity onPress={this.handleImagePicker}>
                        <Text>Select Image</Text>
                    </TouchableOpacity>

                    {isProcessing && <Text style={styles.message}>Please Wait...</Text>}
                    {errorMessage && <Text style={styles.message}>{errorMessage}</Text>}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.addProduct}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: 'tomato' }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default AddProductModal;

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: 'rgba(0,0,0,0.3)',
        marginBottom: 15,
        fontSize: 18,
        padding: 10,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    message: {
        color: 'tomato',
        fontSize: 17,
    },
});
