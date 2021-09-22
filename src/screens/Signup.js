import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  ScrollView,
} from "react-native";
import * as Google from "expo-google-app-auth";
import { BASE_URL } from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";
import messaging from "@react-native-firebase/messaging";

// const WithGoogle = () => {
//   return (
//     <WebView source={{ uri: "https://rapid-reads-ash.herokuapp.com/google" }} />
//   );
// };
const Signup = ({ navigation }) => {
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [pass1, setpass1] = useState();
  const [pass2, setpass2] = useState();
  const [name, setname] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: `497174468064-aqnuh4ge17lce7jrthts288022bv9et5.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `497174468064-ifjbp2k3c7faooi1oqp4n2lmpics8fmf.apps.googleusercontent.com`,
      webClientId:
        "497174468064-mftubbfd2ktjobnmmqod6d10sm0u5ta4.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

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
      fetch(BASE_URL + "/google-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user,
          email: userInfo.user.email,
          name: userInfo.user.name,
          id: userInfo.user.id,
          photoUrl: userInfo.user.photo,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success == true) {
            await AsyncStorage.setItem("token", data.userId);
            notificationOn();
            navigation.replace("Drawer");
          } else {
            alert("Something went wrong please try again..!");
            setname(null);
            setemail(null);
            setphone(null);
            setpass2(null);
            setpass1(null);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };
  // console.log(BASE_URL);
  const withGoogle = () => {
    const config = {
      androidClientId: `497174468064-fraqdrj25rl0n14493l4r9aa7v3rrobt.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `497174468064-ifjbp2k3c7faooi1oqp4n2lmpics8fmf.apps.googleusercontent.com`,
      iosClientId: `497174468064-40b012rufvnnfqeuq8r2nl7bd70r6062.apps.googleusercontent.com`,
      webClientId: `497174468064-mftubbfd2ktjobnmmqod6d10sm0u5ta4.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          // console.log(user);

          fetch(BASE_URL + "google-register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // user,
              email: user.email,
              name: user.name,
              id: user.id,
              photoUrl: user.photoUrl,
            }),
          })
            .then((res) => res.json())
            .then(async (data) => {
              console.log(data);
              if (data.success == true) {
                await AsyncStorage.setItem("token", data.userId);
                navigation.replace("Drawer");
              } else {
                alert("Something went wrong please try again..!");
                setname(null);
                setemail(null);
                setphone(null);
                setpass2(null);
                setpass1(null);
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

  const handleSubmit = () => {
    if (pass1 == pass2) {
      fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          password: pass1,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          if (data.success == true) {
            navigation.replace("Drawer");
            notificationOn();
            await AsyncStorage.setItem("token", data.userId);
          } else {
            alert(data.message);
            setname(null);
            setemail(null);
            setphone(null);
            setpass2(null);
            setpass1(null);
          }
        });
    } else {
      alert("Password Not Match");
      setpass1(null);
      setpass2(null);
    }
  };
  const sendotp = () => {
    setloading(true);
    if (!name || !email || !phone || !pass1 || !pass2) {
      alert("All fields are required !");
      setloading(false);
    } else {
      if (pass1 == pass2) {
        if (phone.length < 10) {
          alert("Invalid Phone Number");
          setloading(false);
          setphone(null);
        } else {
          fetch(BASE_URL + "/sendotp", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              phone: phone,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success == true) {
                navigation.navigate("Auth", {
                  screen: "otpverify",
                  params: {
                    phone: phone,
                    email: email,
                    password: pass1,
                    name: name,
                  },
                });
                setloading(false);
              } else {
                alert(data.message);
                setloading(false);
              }
            });
        }
      } else {
        alert("Password Not Matched");
        setpass1(null);
        setpass2(null);
        setloading(false);
      }
    }
  };
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
          {/* <Text style={styles.heading}>Turbo News</Text> */}
          <ScrollView>
            <View style={{ marginTop: "26%" }}>
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
                <Text style={styles.socialtext}>Signup Using Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialbutton}>
                <Image
                  source={require("../images/login/fb.png")}
                  style={{ width: 40, height: 40, marginHorizontal: 10 }}
                />
                <Text style={styles.socialtext}>Signup Using Facebook</Text>
              </TouchableOpacity>
              <View style={{ alignSelf: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Or</Text>
                <Text style={{ color: "white" }}>
                  Login using any mail account
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1 }}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={(text) => setname(text)}
                  />
                </View>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1 }}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setemail(text)}
                  />
                </View>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1 }}
                    placeholder="Phone number"
                    keyboardType="number-pad"
                    keyboardAppearance="dark"
                    value={phone}
                    onChangeText={(text) => setphone(text)}
                  />
                </View>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1 }}
                    placeholder="Password"
                    value={pass1}
                    onChangeText={(text) => {
                      setpass1(text);
                    }}
                  />
                </View>
                <View style={styles.searchbox}>
                  <TextInput
                    style={{ width: "90%", padding: 1 }}
                    placeholder="Confirm Password"
                    value={pass2}
                    onChangeText={(text) => setpass2(text)}
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
                ></View>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => sendotp()}>
                <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: "65%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={{ color: "white" }}>
                    Already Have An Account ?
                  </Text>
                  <Text style={{ color: "#099FFF" }}> Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;

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
    marginTop: "20%",
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
