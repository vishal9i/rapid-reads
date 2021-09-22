import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Share,
  Modal,
  TextInput,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Octicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import Slider from "react-native-slider";
import {
  Avatar,
  Title,
  Drawer,
  Caption,
  Paragraph,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { BASE_URL } from "../../config.json";

export default function DrawerContaints({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [tmodalOpen, setTmodalOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);
  const [svalue, setsvalue] = useState();

  const [notification, setnotification] = useState(true);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const notificationOn = () => {
    messaging()
      .getToken()
      .then((ntoken) => {
        fetch(BASE_URL + "notify-me", {
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

  const notificationOff = () => {
    messaging()
      .getToken()
      .then((ntoken) => {
        fetch(BASE_URL + "/notify-me", {
          method: "DELETE",
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
  const notificationhandler = () => {
    if (notification == true) {
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    notificationOff();
    navigation.navigate("Auth", { screen: "Login" });
  };

  // console.log(props);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.headingcontainer}>
          <Title style={{ color: "white", fontFamily: "b612" }}>Menu</Title>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Octicons name="three-bars" size={26} color="white" />
          </TouchableOpacity>
        </View>

        <Drawer.Section>
          {/* <TouchableRipple
            onPress={() => {
              notificationhandler();
            }}
          >
            <View style={styles.preference}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../images/menu/Notification.png")}
                  style={{ height: hp(4), width: wp(8), marginLeft: wp(2) }}
                />
                <Text
                  style={{
                    color: "white",
                    marginLeft: wp(9),
                    fontFamily: "b612",
                  }}
                >
                  Notification
                </Text>
              </View>
              <View pointerEvents="none">
                <Switch value={notification} color="#fff" />
              </View>
            </View>
          </TouchableRipple> */}
          {/* <DrawerItem
            icon={() => (
              <Image
                source={require("../images/menu/Subscribe.png")}
                style={{ height: hp(5), width: wp(10) }}
              />
            )}
            label="Subscription"
            labelStyle={{ color: "white", fontFamily: "b612" }}
            onPress={() => navigation.navigate("App", { screen: "Subscribe" })}
          /> */}
          {/* <DrawerItem
            icon={() => (
              <Image
                source={require('../images/menu/font.png')}
                style={{ height: hp(5), width: wp(10) }}
              />
            )}
            label="Change Font Size"
            labelStyle={{ color: 'white' ,fontFamily:'b612',}}
            onPress={() => {
              setFontOpen(true);
            }}
          /> */}
          <Modal
            visible={fontOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setFontOpen(false)}
          >
            <View style={{ flex: 1, backgroundColor: "#000000aa" }}>
              <View style={styles.fontmodalcontent}>
                <Slider
                  value={svalue}
                  onValueChange={(value) => setsvalue(value)}
                  minimumTrackTintColor="#00aaff"
                  maximumTrackTintColor="#f2f4f5"
                  thumbTintColor="#00aaff"
                  style={styles.fontstyle}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ color: "#575656", fontSize: 16 }}>Small</Text>
                  <Text style={{ color: "#575656", fontSize: 16 }}>Normal</Text>
                  <Text style={{ color: "#575656", fontSize: 16 }}>Large</Text>
                </View>
              </View>
            </View>
          </Modal>
          <DrawerItem
            icon={() => (
              <Image
                source={require("../images/menu/Rating.png")}
                style={{ height: hp(5), width: wp(10) }}
              />
            )}
            label="Rate us on Play Store"
            labelStyle={{ color: "white", fontFamily: "b612" }}
          />
          <DrawerItem
            icon={() => (
              <Image
                source={require("../images/menu/Feedback.png")}
                style={{ height: hp(5), width: wp(10) }}
              />
            )}
            label="Feedback"
            labelStyle={{ color: "white", fontFamily: "b612" }}
            onPress={() => {
              Linking.openURL(
                "mailto:support@domain.com?subject=mailsubject&body=mailbody"
              );
            }}
          />
          <DrawerItem
            icon={() => (
              <MaterialIcons name="category" size={24} color="white" />
            )}
            label="Curate Your Feed"
            labelStyle={{ color: "white", fontFamily: "b612" }}
            onPress={() => navigation.navigate("Tab", { screen: "Home" })}
          ></DrawerItem>
          <DrawerItem
            icon={() => (
              <Image
                source={require("../images/menu/Share.png")}
                style={{ height: hp(4), width: wp(8) }}
              />
            )}
            label="Invite your friends"
            labelStyle={{ color: "white", fontFamily: "b612" }}
            onPress={onShare}
          ></DrawerItem>
          {/* <DrawerItem
            icon={() => (
             <FontAwesome name="share" size={25} color="#fff"/>
              
            )}
            label="Refer Code"
            labelStyle={{ color: 'white' ,fontFamily:'b612', }}
            onPress={() => {
              setReferOpen(true);
            }}
          /> */}
          <Modal
            visible={referOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setReferOpen(false)}
          >
            <View style={{ flex: 1, backgroundColor: "#000000aa" }}>
              <View style={styles.refermodalcontent}>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 17,
                    fontFamily: "b612",
                  }}
                >
                  Your referral code
                </Text>
                <View style={styles.signbox}>
                  <TextInput
                    placeholder="9dskfksdfk23nrn545a"
                    placeholderTextColor="#fff"
                    style={{ textAlign: "center", fontSize: 19 }}
                  />
                </View>
                <View
                  style={{ paddingVertical: 20, paddingHorizontal: wp(25) }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#00aaff",
                        textAlign: "center",
                        fontSize: 15,
                        fontFamily: "b612",
                      }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <View style={{ marginHorizontal: wp(7), marginVertical: hp(5) }}>
          <Modal visible={tmodalOpen} animationType="slide" transparent={true}>
            <View style={{ flex: 1, backgroundColor: "#000000aa" }}>
              <View style={styles.tmodalcontent}>
                <MaterialIcons
                  name="close"
                  size={25}
                  color="grey"
                  onPress={() => setTmodalOpen(false)}
                />
                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#34abeb",
                      fontWeight: "700",
                      paddingVertical: 10,
                      fontFamily: "b612",
                    }}
                  >
                    Terms & Conditions
                  </Text>
                  <Paragraph style={{ fontSize: 14, fontFamily: "Helvetica" }}>
                    This Privacy Policy describe how Wiley collects and uses the
                    personal information you provide to Wiley. It also describes
                    the choices available to you regarding our use of your
                    personal information and how you can access and update this
                    information.
                  </Paragraph>

                  <Paragraph
                    style={{
                      fontSize: 14,
                      marginVertical: 10,
                      fontFamily: "Helvetica",
                    }}
                  >
                    This Privacy Policy describes how Wiley collects and uses
                    the personal information you provide to Wiley.
                  </Paragraph>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => setTmodalOpen(true)}>
            <Text style={{ color: "white", fontFamily: "b612" }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>

          <Modal visible={modalOpen} animationType="slide" transparent={true}>
            <View style={{ backgroundColor: "#000000cc", flex: 1 }}>
              <View style={styles.modalcontent}>
                <MaterialIcons
                  name="close"
                  size={25}
                  color="#c4c7cc"
                  onPress={() => setModalOpen(false)}
                />
                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#34abeb",
                      fontWeight: "700",
                      paddingVertical: 10,
                      fontFamily: "b612",
                    }}
                  >
                    Privacy Policy
                  </Text>
                  <Paragraph style={{ fontSize: 14, fontFamily: "Helvetica" }}>
                    This Privacy Policy describe how Wiley collects and uses the
                    personal information you provide to Wiley. It also describes
                    the choices available to you regarding our use of your
                    personal information and how you can access and update this
                    information.
                  </Paragraph>

                  <Paragraph
                    style={{
                      fontSize: 14,
                      marginVertical: 10,
                      fontFamily: "Helvetica",
                    }}
                  >
                    This Privacy Policy describes how Wiley collects and uses
                    the personal information you provide to Wiley.
                  </Paragraph>
                </View>
                <View style={{ marginVertical: 40, marginHorizontal: 10 }}>
                  <TouchableOpacity>
                    <Text style={styles.ptext}>Security</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.ptext}>Cookies</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.ptext}>Third Party Websites</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Text style={{ color: "white", fontFamily: "b612" }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <Modal
            visible={signOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setSignOpen(false)}
          >
            <View style={{ flex: 1, backgroundColor: "#000000aa" }}>
              <View style={styles.signmodalcontent}>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 17,
                    fontFamily: "b612",
                  }}
                >
                  Sign in with
                </Text>
                <View style={styles.signbox}>
                  <TextInput
                    placeholder="Got a referral code? "
                    placeholderTextColor="#fff"
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "b612",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 20,
                      borderRadius: 20,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={require("../images/login/google.png")}
                      style={{
                        height: hp(5),
                        width: wp(9),
                        alignSelf: "center",
                      }}
                    />
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 16,
                        margin: 10,
                        fontFamily: "b612",
                      }}
                    >
                      Google
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 20,
                      flexDirection: "row",
                      borderRadius: 20,
                    }}
                  >
                    {/* <FontAwesome name='facebook' size={25} color="#4a4a80"/> */}
                    <Image
                      source={require("../images/login/fb.png")}
                      style={{
                        height: hp(4),
                        width: wp(9),
                        alignSelf: "center",
                      }}
                    />
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 16,
                        margin: 10,
                        fontFamily: "b612",
                      }}
                    >
                      Facebook
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      width: wp(40),
                      borderRadius: 20,
                      flexDirection: "row",
                    }}
                  >
                    <Entypo
                      name="mail-with-circle"
                      size={30}
                      color="#33b5f5"
                      style={{ marginHorizontal: 10, marginVertical: 5 }}
                    />
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 16,
                        margin: 10,
                        fontFamily: "b612",
                      }}
                    >
                      Mail
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.linestyle} />

                <Text
                  style={{
                    fontSize: 12,
                    color: "#324ca8",
                    textAlign: "center",
                    paddingVertical: 15,
                    fontFamily: "b612",
                  }}
                >
                  By clicking ,you agree to our{" "}
                  <Text style={{ color: "#fff", fontFamily: "b612" }}>
                    {" "}
                    Privacy Policy{" "}
                  </Text>{" "}
                  and{" "}
                  <Text style={{ color: "#fff", fontFamily: "b612" }}>
                    {" "}
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity onPress={() => setSignOpen(true)}>
            <Text style={{ color: "white", fontFamily: "b612" }}>Sign-in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("App", { screen: "video" })}
          >
            <Text style={{ color: "white", fontFamily: "b612" }}>Video</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
          <Text style={{ color: "#099FFF", fontFamily: "b612" }}>LOG OUT</Text>
        </TouchableOpacity>
        <Caption style={{ alignSelf: "center", marginVertical: 10 }}>
          Version 1.0
        </Caption>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(2),
    // paddingHorizontal: wp(2),
    backgroundColor: "#099FFF",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  headingcontainer: {
    backgroundColor: "#00aaff",
    padding: hp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: hp(4),
    paddingVertical: hp(1),
    borderRadius: 50,
    backgroundColor: "white",
  },
  modalcontent: {
    backgroundColor: "#fff",
    marginTop: hp(25),
    borderRadius: 3,
    flex: 1,
    padding: 15,
  },
  ptext: {
    color: "#34abeb",
    fontSize: 15,
    fontFamily: "b612",
  },
  tmodalcontent: {
    backgroundColor: "#fff",
    marginTop: hp(40),
    borderRadius: 7,
    flex: 1,
    padding: 15,
  },
  signmodalcontent: {
    backgroundColor: "#00aaff",
    marginTop: hp(50),
    borderRadius: 3,
    flex: 1,
    padding: 15,
  },
  signbox: {
    marginVertical: 15,
    borderColor: "#fff",
    borderWidth: wp(0.4),
    borderRadius: 25,
    padding: 10,
  },
  linestyle: {
    marginTop: hp(2),
    borderColor: "#c7c7c9",
    borderWidth: 0.4,
    paddingHorizontal: 20,
  },
  refermodalcontent: {
    backgroundColor: "#00aaff",
    marginTop: hp(65),
    borderRadius: 5,
    flex: 1,
    padding: 15,
  },
  fontmodalcontent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flex: 1,
    marginVertical: hp(35),
    marginHorizontal: wp(5),
  },
  fontstyle: {
    marginVertical: hp(4),
    marginHorizontal: 15,
  },
});
