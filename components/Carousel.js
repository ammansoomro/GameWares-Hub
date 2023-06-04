import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        "https://blog.playstation.com/tachyon/2023/04/3bc0c92664b681e28f3c7be6359057b4de960f3d.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1.5",
        "https://blog.playstation.com/uploads/2023/05/28d9e1d58fc52680bd0bbbd0eba0edb086c2f8aa.jpg",
        "https://blog.playstation.com/tachyon/2023/05/4dd6f5f601208a9b1813aafe75a89b5a402d770d.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1.5",
        "https://blog.playstation.com/uploads/2023/05/8838b63857cbf6eea0846a07c04524ec10c66895.jpg",
    ];
    return (
        <View>
            <SliderBox
                images={images}
                autoPlay
                circleLoop
                dotColor={"#13274F"}
                inactiveDotColor="#90A4AE"
                ImageComponentStyle={{
                    borderRadius: 6,
                    width: "94%",
                }}

            />
        </View>
    );
};

export default Carousel;

