import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

MapboxGL.setAccessToken('pk.eyJ1Ijoib2phbmFqYTAzIiwiYSI6ImNsczJmdnFmcDBpbWUya29lMXo3YjZhOW4ifQ.BNLM-X1rsyOLt_EA7xfrlw');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    map: {
        flex: 1,
        height: '100%',
    },
    signUpButton: {
        position: 'absolute',
        bottom: 20, // Adjust as needed
        left: 35, // Adjust as needed
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
});

export default class ShowMaps extends Component {
    state = {
        userLocation: null,
        route: null,
    };

    async componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
                this.handleUserLocationUpdate(); // Initial update
                // this.locationInterval = setInterval(this.handleUserLocationUpdate, 60000); // Update every 1 minute
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        // Clear the locationInterval if it's defined
        if (this.locationInterval) {
            clearInterval(this.locationInterval);
        }
    }

    handleUserLocationUpdate = async (location) => {
        this.setState({ userLocation: location });

        console.log('location', location);

        // Define destination or receive it from props
        const destination = [0, 0]; // Example coordinates
        const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${destination[0]},${destination[1]}?geometries=geojson&access_token=pk.eyJ1Ijoib2phbmFqYTAzIiwiYSI6ImNsczJmdnFmcDBpbWUya29lMXo3YjZhOW4ifQ.BNLM-X1rsyOLt_EA7xfrlw`);
        const data = await response.json();
        this.setState({ route: data.routes[0].geometry });

        if (this.props.onUserLocationUpdate) {
            this.props.onUserLocationUpdate(location.coords); // Pass only the coordinates
        }
    };

    render() {
        const { userLocation, route } = this.state;
        const { closeBottomSheet } = this.props;

        return (
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map} attributionEnabled={false}>
                    <MapboxGL.UserLocation
                        visible={true}
                        animated={true}
                        showsUserHeadingIndicator={true}
                        onUpdate={this.handleUserLocationUpdate}
                    />
                    {userLocation && (
                        <MapboxGL.Camera
                            minZoomLevel={15}
                            animationDuration={3000}
                            followUserLocation={true}
                            followUserMode="compass"
                            animationMode="easeTo"
                            centerCoordinate={userLocation.coords}
                        />
                    )}
                </MapboxGL.MapView>
                <TouchableOpacity style={styles.signUpButton} onPress={() => closeBottomSheet({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude })}>
                    <Text style={styles.signUpButtonText}>Gunakan Lokasi Sekarang</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
