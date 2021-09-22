import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL, Image_Url } from "../../config.json";

const Liked = (props) => {
  // console.log('====================================');
  // console.log(props.props.text);
  // console.log('====================================');
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
        onPress={() =>
          props.navigation.navigate("App", {
            screen: "Saved",
            params: { id: props.props._id },
          })
        }
      >
        <Image
          source={{ uri: `${props.props.image}` }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 7,
            overflow: "hidden",
            marginHorizontal: 5,
          }}
        />
        <View style={{ width: "70%" }}>
          <Text
            style={{
              color: "white",
              marginHorizontal: 5,
              textAlign: "left",
            }}
          >
            {props.props.headline}
          </Text>
        </View>
        {/* {props.props.save == true ? (
          <FontAwesome
            name="heart"
            size={24}
            color="#099FFF"
            style={{ marginHorizontal: 5 }}
          />
        ) : (
          <FontAwesome
            name="heart-o"
            size={24}
            color="#099FFF"
            style={{ marginHorizontal: 5 }}
          />
        )} */}
        <FontAwesome
          name="heart"
          size={24}
          color="#099FFF"
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Liked;

const styles = StyleSheet.create({});
