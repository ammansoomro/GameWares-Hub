import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      await sendNotification();
      navigation.navigate("Home");
    }, 3000);
  }, []);

  const sendNotification = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      // Ask for permission if not granted
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission denied for sending notifications');
        return;
      }

      // Get the push token
      const pushToken = (await Notifications.getExpoPushTokenAsync()).data;

      // Send a notification using the obtained token
      // Replace "YOUR_SERVER_KEY" with your Firebase Cloud Messaging server key

      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAA0CloAhc:APA91bEHpliPd7ZHODj6CKqclyszZNdfRjX-bi-6hMucVuBxN-EpHHsVNdX0JApzvsT5MT1ZysA77ESl5s5dKNzC_be_wW3ZizW2lIz-X8mg6-gPMNKQJ1atE0OZLFKq-Z0izA0s6d1n',
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Order Placed',
          body: 'Your order has been placed successfully.',
          sound: 'default',
          priority: 'high',
          vibrate: true,
        }),
      });

      if (response.ok) {
        console.log('Notification sent successfully');
      } else {
        console.log('Failed to send notification');
      }
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  return (
    <SafeAreaView>
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
      <LottieView
        source={require("../assets/order.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 70,
          justifyContent: "center",
        }}
        autoPlay
        loop={true}
        speed={1}
      />

      <Text
        style={{
          marginTop: 49,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>
    </SafeAreaView>
  );
};

export default OrderScreen;
