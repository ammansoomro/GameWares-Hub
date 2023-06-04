import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView, } from "react-native"; import React from 'react'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import ProductItem from "../components/ProductItem";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProducts } from "../ProductReducer";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const product = useSelector((state) => state.product.product);
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);


    const [location, setLocation] = useState("We are getting your location....");
    const [locationEnabled, setLocationEnabled] = useState(false);

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
            )
        } else {
            setLocationEnabled(enabled);
        }
    }

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }]

            )
        }
        const { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.country}`;
                setLocation(address);
                break;
            }
        }

    }

    useEffect(() => {
        if (product.length > 0) {
            console.log("Product is not empty");
            return;
        }

        const fetchProducts = async () => {
            const colRef = collection(db, "products");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
                items.push(doc.data());
            });
            items?.map((service) => dispatch(getProducts(service)));
        };
        fetchProducts();
    }, []);

    console.log(product);


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
                    <Ionicons name="ios-location" size={22} color="#0171CD" style={{ padding: 3 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                        <Text>{location}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
                        <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: "https://lh3.googleusercontent.com/ogw/AOLn63HHBMk7eA7hcQxitjhNGr1J6Hz9zfHftVRgIkJUTQ=s64-c-mo" }}
                        />
                    </Pressable>
                </View>

                {/* Search Bar */}
                <View
                    style={{
                        padding: 10,
                        margin: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderWidth: 0.8,
                        borderColor: "#C0C0C0",
                        borderRadius: 7,
                    }}
                >
                    <TextInput placeholder="Search for items or More" />
                    <Feather name="search" size={24} color="#0171CD" />
                </View>

                {/* Carousel */}
                <Carousel />

                {/* Services */}
                <Services />


                {/* Products */}
                <View style={{ padding: 10, flex: 1, textAlign: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10, textAlign: "center", justifyContent: "center" }}>Highlighted Products</Text>
                    <ScrollView style={{ height: "100%", flex: 1 }}
                        // Ifinite vertical scrolling
                        showsVerticalScrollIndicator={false}

                    >
                        {product.map((item) => (
                            <ProductItem key={item.id} item={item} />
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
                        marginBottom: 40,
                        margin: 15,
                        borderRadius: 7,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>{cart.length} items |  $ {total}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate("PickUp")}
                        style={{
                            // Row
                            flexDirection: "row",
                        }}
                    >
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "white", paddingHorizontal: 7 }}>Order</Text>
                        <MaterialIcons name="border-color" size={20} color="white" />
                    </Pressable>
                </Pressable>
            )}

        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})