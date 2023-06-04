import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if ( !selectedTime || !delivery) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    if (selectedTime && delivery) {
      navigation.replace("Cart", {
        selectedTime: selectedTime,
        no_Of_days: delivery,

      })
    }
  }

  return (
    <>

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
        <Image
          source={{ uri: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/06/ps-store-2744241.jpg?tf=1200x" }}
          style={{
            width: "100%",
            height: 250,
            resizeMode: "cover",

          }}
        />
        <View
          style={{
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 10,
              padding: 20,
              color: '#0C5A9A'
            }}>
              Delivery Form</Text>
          </View>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingVertical: 10,
            color: '#1178B5'

          }}> Enter Address </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#BBBBBB',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginTop: 8,
              marginHorizontal: 10,
            }}
          />


          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingVertical: 10,
            color: '#1178B5'

          }}>Select Time</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedTime(item.time)}
                style={
                  selectedTime.includes(item.time)
                    ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "#0171CD",
                      borderWidth: 2,
                    }
                    : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
                }
              >
                <Text>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 10,
            paddingVertical: 10,
            color: '#1178B5'
          }}>Delivery Date
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, i) => (
              <Pressable
                style={
                  delivery.includes(item.name)
                    ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "#0171CD",
                      borderWidth: 2,
                    }
                    : {
                      margin: 10,
                      borderRadius: 7,
                      padding: 10,
                      borderColor: "gray",
                      borderWidth: 0.7,
                    }
                }
                onPress={() => setDelivery(item.name)}
                key={i}
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {total === 0 ? (
        null
      ) : (
        <Pressable
          style={{
            backgroundColor: "#0171CD",
            padding: 10,
            marginBottom: 20,
            marginHorizontal: 10,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto"
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{cart.length} items |  $ {total}</Text>
          </View>
          <Pressable onPress={proceedToCart}
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white", paddingHorizontal: 7 }}>CheckOut</Text>
            <Ionicons name="cart" size={20} color="white" />
          </Pressable>

        </Pressable>

      )}

    </>
  );
};


const styles = StyleSheet.create({});
export default PickUpScreen;