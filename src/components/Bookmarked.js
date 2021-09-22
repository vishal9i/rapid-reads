import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL, Image_Url } from "../../config.json";

const Bookmarked = (props) => {
  // console.log('====================================');
  // console.log(props);
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
          <Ionicons
            name="bookmark"
            size={24}
            color="#099FFF"
            style={{ marginHorizontal: 5 }}
          />
        ) : (
          <Ionicons
            name="bookmark-outline"
            size={24}
            color="#099FFF"
            style={{ marginHorizontal: 5 }}
          />
        )} */}
        <Ionicons
          name="bookmark"
          size={24}
          color="#099FFF"
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Bookmarked;

const styles = StyleSheet.create({});
