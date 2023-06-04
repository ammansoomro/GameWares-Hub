import { Pressable, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementQty, incrementQty } from '../ProductReducer';
import { addToCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { useSelector } from 'react-redux'
const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item))
    dispatch(incrementQty(item))
  }

  const IncreaseQuantity = () => {
    dispatch(incrementQty(item))
    dispatch(incrementQuantity((item)))
  }

  const DecreaseQuantity = () => {
    dispatch(decrementQty(item))
    dispatch(decrementQuantity((item)))
  }


  const cart = useSelector((state) => state.cart.cart);
  return (

    <View>
      <Pressable
        style={{ backgroundColor: "#FFF", padding: 10, borderRadius: 8, alignItems: "center", justifyContent: "space-between", flexDirection: "row", margin: 14, shadowColor: "#000",  shadowOffset: {
            width: 0,
            height: 2,
          }, shadowOpacity: 0.2, shadowRadius: 2.8, }}>
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View>


        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              width: 83,
              marginBottom: 5,
            }}
          >
            {item.name}
          </Text>
          <Text>
            ${item.price}
          </Text>
        </View>


        {cart.some((p) => p.id === item.id) ? (<>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#0171CD", alignItems: "center", justifyContent: "center", }} onPress={DecreaseQuantity}>
              <Text style={{ fontSize: 18, fontWeight: "600", paddingHorizontal: 6, textAlign: "center" }}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 24, fontWeight: "500", paddingHorizontal: 7 }}>{item.quantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#0171CD", alignItems: "center", justifyContent: "center", }} onPress={IncreaseQuantity}>
              <Text style={{ fontSize: 14, fontWeight: "600", paddingHorizontal: 8, textAlign: "center" }}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </>) : (<TouchableOpacity
          onPress={addItemToCart}
          style={{
            width: 80,
            backgroundColor: "#0171CD",
            borderRadius: 5,
            padding: 7,

          }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}>
            Buy Now</Text>

        </TouchableOpacity>)}


      </Pressable>

    </View>
  )
}

export default ProductItem

