import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Google from "expo-google-app-auth";
import { authorize } from "react-native-app-auth";
import { BASE_URL } from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";

const Forgot1 = ({ navigation }) => {
  const [loading, setloading] = useState();
  const [phone, setphone] = useState();
  //   const { phone, email, password, name } = route.params;

  const sendotp = () => {
    if (phone.length < 10) {
      alert("Invalid Phone Number");
    } else {
      fetch(BASE_URL + "/forgot/sendotp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          phone: phone,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success == true) {
            navigation.navigate("Auth", {
              screen: "forgot2",
              params: { phone: phone },
            });
          } else {
            alert(data.message);
          }
        });
    }
  };

  const verify = () => {
    setloading(true);
    fetch(BASE_URL + "/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        phone: phone,
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          handleregister();
        } else {
          alert(data.message);
          setloading(false);
        }
      });
  };

  // useEffect(() => {
  //   messaging()
  //     .getToken()
  //     .then((token) => {
  //       console.log(token);
  //     });
  // }, []);

  return (
    <View>
      <ImageBackground
        source={require("../images/login/bg.jpg")}
        style={styles.background}
        blurRadius={3}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(19, 19, 19, 0.65)",
          }}
        >
          <ScrollView>
            {/* <Text style={styles.heading}>Turbo News</Text> */}
            <Image
              source={require("../images/login/Logo.png")}
              style={{
                width: wp("100%"),
                height: hp("17%"),
                marginTop: hp("10%"),
                alignSelf: "center",
              }}
            />
            <View style={{ marginTop: "8%" }}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1, fontFamily: "b612" }}
                    placeholder="Enter Phone Number"
                    value={phone}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={(text) => setphone(text)}
                  />
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* <Text style={{ color: "white", fontFamily: "b612" }}>
                      Forgot your Password ?
                    </Text> */}
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => sendotp()}>
                <Text
                  style={{ color: "white", fontSize: 16, fontFamily: "b612" }}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                  onPress={() => navigation.navigate("Login")}
                  disabled={loading}
                >
                  <Text style={{ color: "white", fontFamily: "b612" }}>
                    already have an account ?
                  </Text>
                  <Text style={{ color: "#099fff", fontFamily: "b612" }}>
                    {" "}
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Forgot1;
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#099FFF",
    alignSelf: "center",
    marginTop: "30%",
  },
  socialbutton: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 7,
    marginVertical: 10,
    alignItems: "center",
    width: "68%",
  },
  socialtext: {
    color: "gray",
    fontFamily: "b612",
  },
  searchbox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 7,
    paddingVertical: 5,
    width: "70%",
    marginVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#099FFF",
    borderRadius: 7,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    paddingHorizontal: "28%",
  },
});
