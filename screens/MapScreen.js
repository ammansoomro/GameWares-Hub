import React, { useEffect, useState } from 'react';
import { View, Image, Alert, StyleSheet, Text, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';


const Maps = ({ navigation }) => {
  const [location, setLocation] = useState("We are getting your location....");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }]
      );
    } else {
      setLocationEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      setUserLocation({ latitude, longitude });
      let response = await Location.reverseGeocodeAsync({ latitude, longitude });
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.country}`;
        setLocation(address);
        break;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Text>Home Page</Text>
      </View>

      {/* <Text style={styles.heading}>You are Here!</Text> */}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={
          userLocation
            ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
            : null
        }
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        toolbarEnabled={true}
        onMapReady={() => {
          if (Platform.OS === 'android') {
            MapView.getNativeMapRef().current.getCamera().then((camera) => {
              camera.zoomControlEnabled = true;
              camera.zoomGesturesEnabled = true;
              camera.toolbarEnabled = true;
              MapView.getNativeMapRef().current.setCamera(camera);
            });
          }
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  map: {
    flex: 1,
  },
  image: {
    height: 200,
    width: '100%',
  },
});


export default Maps;
