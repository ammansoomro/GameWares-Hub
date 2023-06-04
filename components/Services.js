import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image,Pressable } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: "12",
            image: "https://i.insider.com/5ee8cfc6191824168f10a07a?width=700",
            name: "Consoles",

        },
        {
            id: "0",
            image: "https://www.logotypes101.com/logos/799/666EC0AB3C56DABE6DBEC7B0CE2624A6/ps.png",
            name: "PS Plus",

        },
        {
            id: "11",
            image: "https://gmedia.playstation.com/is/image/SIEPDC/3d-pulse-headset-screenshot-04-en-03sep21?$1600px$",
            name: "Acessories"
        },
        {
            id: "13",
            image: "https://s.yimg.com/os/creatr-uploaded-images/2022-12/bee32270-8204-11ed-bfbd-8608bf6f6c80",
            name: "Games",
        },

    ];
    return (
        <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}>Services Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {services.map((service, index) => (
                    <TouchableOpacity style={{ margin: 10, backgroundColor: "white", padding: 20, borderRadius: 7 }} key={index}>
                        <Image source={{ uri: service.image }} style={{ width: 70, height: 70 }} />

                        <Text style={{ textAlign: "center", marginTop: 10 }}>{service.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})