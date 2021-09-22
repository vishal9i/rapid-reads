import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  TextInput,
  StatusBar,
  keyboardOffset,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import KeyboardStickyView from "rn-keyboard-sticky-view";
import { DrawerActions } from "@react-navigation/routers";
import Swiper from "react-native-swiper";
import { BASE_URL, Image_Url } from "../../config.json";
// import { TextInput } from 'react-native-paper';
import FlipPage, { FlipPagePage } from "react-native-flip-page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Saved = ({ route, navigation }) => {
  const { id } = route.params;
  const [articledata, setarticledata] = useState();
  const [liked, setliked] = useState();
  const [bookmarks, setbookmarks] = useState();
  let isFocused = useIsFocused();

  const getArticals = () => {
    fetch(BASE_URL + "/article-by-id", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        articleid: id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setarticledata(data.data);
        } else {
          alert(data.message);
        }
      });
  };
  const getBookmarks = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/bookmarks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setbookmarks(data.articles);
        } else {
          alert("something went wrong. in likes");
        }
      });
  };

  const getLikedPost = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/likes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setliked(data.articles);
        } else {
          alert("something went wrong. in likes");
        }
      });
  };

  const likepost = async (artid) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/like-article", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: artid,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          getLikedPost();
          getArticals();
        } else {
          alert("something went wrong.");
        }
      });
  };
  const dislikepost = async (artid) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/dislike-article", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: artid,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          getLikedPost();
        } else {
          alert("something went wrong.");
        }
      });
  };
  const addbookmark = async (artid) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/add-bookmark", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: artid,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          getBookmarks();
        } else {
          alert("something went wrong.");
        }
      });
  };
  const removebookmark = async (artid) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/remove-bookmark", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        articleid: artid,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          getBookmarks();
        } else {
          alert("something went wrong.");
        }
      });
  };

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

  useEffect(() => {
    if (isFocused) {
      getArticals();
      getBookmarks();
      getLikedPost();
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "110%",
        display: articledata ? null : "none",
      }}
    >
      {articledata && (
        <View style={{ backgroundColor: "#fff" }}>
          <ImageBackground
            source={{ uri: `${articledata.image}` }}
            style={styles.background}
            blurRadius={8}
          >
            <ImageBackground
              source={{ uri: `${articledata.image}` }}
              style={styles.background2}
            >
              <TouchableOpacity
                style={{ padding: 20, alignItems: "flex-end" }}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image
                  source={require("../images/feed/Menu.png")}
                  style={styles.menulogo}
                />
              </TouchableOpacity>
            </ImageBackground>

            <View
              style={{
                // backgroundColor: "#061d2b",
                height: hp(53),
                // bottom: keyboardOffset,
                // flex: 1,
                width: wp(95),
                alignSelf: "center",
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  marginHorizontal: 10,
                  backgroundColor: "#1c1c1c",
                  width: wp(35),
                  height: hp(5),
                  borderRadius: 25,
                  alignSelf: "flex-start",
                  bottom: hp(2),
                }}
              >
                <Image
                  source={require("../images/feed/Logo_Name.png")}
                  style={{
                    width: wp(27),
                    height: hp(2),
                    alignSelf: "center",
                    marginVertical: 8,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  bottom: hp(9),
                  // marginTop: hp('25%'),
                }}
              >
                <View>
                  <TouchableOpacity
                    style={[
                      styles.bottommenulogo,
                      { paddingTop: "20%", alignItems: "center" },
                    ]}
                    onPress={() =>
                      liked
                        ? liked.some((i) => i == articledata._id)
                          ? dislikepost(articledata._id)
                          : likepost(articledata._id)
                        : likepost(articledata._id)
                    }
                  >
                    {liked ? (
                      liked.some((i) => i == articledata._id) ? (
                        <FontAwesome name="heart" size={24} color="#099FFF" />
                      ) : (
                        <FontAwesome name="heart-o" size={24} color="#099FFF" />
                      )
                    ) : (
                      <FontAwesome name="heart-o" size={24} color="#099FFF" />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={{
                      //   color: "white",
                      fontFamily: "b612",
                      marginVertical: 5,
                    }}
                  >
                    {articledata.likes_count} Likes
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.bottommenulogo, { padding: "3.5%" }]}
                  onPress={onShare}
                >
                  <AntDesign name="sharealt" size={24} color="#099FFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bottommenulogo, { padding: "3%" }]}
                  onPress={() =>
                    bookmarks
                      ? bookmarks.some((i) => i == articledata._id)
                        ? removebookmark(articledata._id)
                        : addbookmark(articledata._id)
                      : addbookmark(articledata._id)
                  }
                >
                  {bookmarks ? (
                    bookmarks.some((i) => i == articledata._id) ? (
                      <Ionicons name="ios-bookmark" size={24} color="#099FFF" />
                    ) : (
                      <Ionicons
                        name="ios-bookmark-outline"
                        size={24}
                        color="#099FFF"
                      />
                    )
                  ) : (
                    <Ionicons
                      name="ios-bookmark-outline"
                      size={24}
                      color="#099FFF"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", bottom: hp(7) }}>
                <View style={styles.verticalline}></View>

                <View style={{ width: wp("80%") }}>
                  <Text style={{ color: "#099FFF", fontFamily: "b612" }}>
                    World
                  </Text>
                  <Text
                    style={{
                      // color: "white",
                      fontSize: 18,
                      fontFamily: "b612",
                    }}
                  >
                    {articledata.headline}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 15,
                  marginVertical: 10,
                  bottom: hp(7),
                }}
              >
                <Text
                  style={{
                    // color: "white",
                    fontSize: 16,
                    fontFamily: "Helvetica",
                  }}
                >
                  {articledata.body}
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("App", {
                      screen: "Complete Article",
                      params: { link: articledata.link },
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#099FFF",
                      fontFamily: "b612",
                      marginVertical: 10,
                      fontSize: 12,
                    }}
                  >
                    Click Here for more
                  </Text>
                  <Text
                    style={{
                      color: "#099FFF",
                      fontFamily: "b612",
                      marginVertical: 10,
                      fontSize: 12,
                      marginHorizontal: 4,
                    }}
                  >
                    / few hours ago
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: hp("110%"),
    paddingTop: "10%",
  },
  background2: {
    width: wp(95),
    height: hp("40%"),
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },

  menulogo: {
    backgroundColor: "#1c1c1c",
    width: 35,
    height: 35,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  bottommenulogo: {
    backgroundColor: "#1c1c1c",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  verticalline: {
    height: hp(8),
    borderWidth: 1,
    borderColor: "#099FFF",
    width: 1,
    marginHorizontal: 10,
  },
  wrapper: { paddingVertical: 10 },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
