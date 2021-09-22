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

const Login = ({ navigation }) => {
  const [username, setusername] = useState();
  const [pass, setpass] = useState();
  const [loading, setloading] = useState();

  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);
  const notificationOn = () => {
    messaging()
      .getToken()
      .then((ntoken) => {
        fetch(BASE_URL + "/notify-me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ntoken: ntoken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success == true) {
              null;
            } else {
              alert(data.message);
            }
          });
      });
  };

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user.id);
      fetch(BASE_URL + "/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          googleid: userInfo.user.id,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          // console.log(data);
          if (data.success == true) {
            await AsyncStorage.setItem("token", data.userId);
            notificationOn();
            navigation.replace("Drawer");
          } else {
            alert(data.message);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = () => {
    setloading(true);
    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.success == true) {
          await AsyncStorage.setItem("token", data.userId);
          notificationOn();
          navigation.replace("Drawer");
          setloading(false);
        } else {
          alert(data.message);
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const withGoogle = () => {
    const config = {
      issuer: "https://digi-rapid-reads-backend.herokuapp.com/",
      clientId:
        "497174468064-fraqdrj25rl0n14493l4r9aa7v3rrobt.apps.googleusercontent.com",
      androidStandaloneAppClientId: `497174468064-ifjbp2k3c7faooi1oqp4n2lmpics8fmf.apps.googleusercontent.com`,
      iosClientId: `497174468064-40b012rufvnnfqeuq8r2nl7bd70r6062.apps.googleusercontent.com`,
      webClientId: `497174468064-mftubbfd2ktjobnmmqod6d10sm0u5ta4.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    authorize(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          // console.log(user);

          fetch(BASE_URL + "google-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              googleid: user.id,
            },
          })
            .then((res) => res.json())
            .then(async (data) => {
              console.log(data);
              if (data.success == true) {
                await AsyncStorage.setItem("token", data.userId);
                navigation.replace("Drawer");
              } else {
                alert(data.message);
              }
            });
        } else {
          alert("google signin cancelled");
        }
      })
      .catch((err) => {
        console.log(err);
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
              <TouchableOpacity
                style={styles.socialbutton}
                onPress={() => signin()}
              >
                <Image
                  source={require("../images/login/google.png")}
                  style={{
                    width: 40,
                    height: 40,
                    marginHorizontal: 10,
                  }}
                />
                <Text style={styles.socialtext}>Login Using Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialbutton}>
                <Image
                  source={require("../images/login/fb.png")}
                  style={{ width: 40, height: 40, marginHorizontal: 10 }}
                />
                <Text style={styles.socialtext}>Login Using Facebook</Text>
              </TouchableOpacity>
              <View style={{ alignSelf: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Or</Text>
                <Text style={{ color: "white", fontFamily: "b612" }}>
                  Login using any mail account
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1, fontFamily: "b612" }}
                    placeholder="Email Address"
                    value={username}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(text) => setusername(text)}
                  />
                </View>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1, fontFamily: "b612" }}
                    placeholder="Password"
                    value={pass}
                    onChangeText={(text) => setpass(text)}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                  onPress={() =>
                    navigation.navigate("Auth", { screen: "forgot1" })
                  }
                >
                  <Text style={{ color: "white", fontFamily: "b612" }}>
                    Forgot your Password ?
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontFamily: "b612" }}
                >
                  Log In
                </Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={{ color: "white", fontFamily: "b612" }}>
                    Don't have an account ?
                  </Text>
                  <Text style={{ color: "#099fff", fontFamily: "b612" }}>
                    {" "}
                    Signup
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

export default Login;

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
