import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraComponent = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();

            // Save image to file storage
            const fileUri = FileSystem.documentDirectory + 'photo.jpg';
            await FileSystem.copyAsync({
                from: photo.uri,
                to: fileUri,
            });

            // Save image URI to AsyncStorage
            await AsyncStorage.setItem('photoUri', fileUri);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={(ref) => setCameraRef(ref)}
            />

            <Button title="Capture" onPress={takePicture} style={{ alignSelf: 'center', marginVertical: 16 }} />
            <Button title="Go Back"
                onPress={() => navigation.navigate('Home')}
                style={{ alignSelf: 'center', marginVertical: 16 }} />
        </View>
    );
};

export default CameraComponent;