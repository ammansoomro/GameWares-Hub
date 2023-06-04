import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';

const OrderScreen = ({ navigation }) => {
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
        speed={0.7}
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

const styles = StyleSheet.create({});