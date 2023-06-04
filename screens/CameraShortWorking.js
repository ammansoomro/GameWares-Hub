import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraComponent = () => {
    const navigation = useNavigation();
    const [camera, setcamera] = useState(null);
    const takePicture = async () => {
        const photo = await camera.takePictureAsync();
        const fileUri = FileSystem.documentDirectory + 'photo.jpg';
        await FileSystem.copyAsync({ from: photo.uri, to: fileUri, });
        await AsyncStorage.setItem('photoUri', fileUri);
        navigation.navigate('Home'); 
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={(ref) => setcamera(ref)}
            />
            <Button title="Capture" onPress={takePicture} style={{ alignSelf: 'center', marginVertical: 16 }} />
            <Button title="Go Back"
                onPress={() => navigation.goBack()}
                style={{ alignSelf: 'center', marginVertical: 16 }} />
        </View>
    );
};

export default CameraComponent;