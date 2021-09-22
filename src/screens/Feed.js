import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BASE_URL, Image_Url } from "../../config.json";
// import { TextInput } from 'react-native-paper';
import FlipPage, { FlipPagePage } from "react-native-flip-page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Tts from "react-native-tts";
import SoundPlayer from "react-native-sound-player";

const Feed = ({ navigation }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [articles, setarticles] = useState([]);
  const [liked, setliked] = useState();
  const [bookmarks, setbookmarks] = useState();
  const [seenArticles, setseenArticles] = useState([]);
  const [listening, setlistening] = useState(false);
  let [articlecount, setarticlecount] = useState(0);

  let isFocused = useIsFocused();
  const getArticals = async () => {
    // console.log("hii");
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/user-prefered-articles", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setarticles(data.data);
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

  const handleseen = (prop) => {
    const newlist = [...seenArticles, articles[prop]._id];
    setseenArticles(newlist);
    // console.log(seenArticles);
    setarticlecount(articlecount + 1);
    // audioadd();
    // console.log(articlecount);
  };

  const clearactivity = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/view-articles", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
      body: JSON.stringify({
        articles: seenArticles,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          // setseenArticles([]);
        } else {
          null;
        }
      });
  };

  if (articlecount > 2) {
    setmodalVisible(true);
    setarticlecount(0);
    try {
      SoundPlayer.playUrl(
        "https://res.cloudinary.com/projects-9i/raw/upload/v1630484908/digi-rapid/advertisement/audio/k0slnbnxalumpmymbixs.mp3"
      );
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    setTimeout(() => {
      setmodalVisible(false);
    }, 40000);
  }

  const videoadd = () => {};

  const startlisten = (articlebody) => {
    setlistening(true);
    Tts.setDucking(true);
    Tts.setDefaultRate(0.52);
    Tts.setDefaultPitch(1);
    Tts.setDefaultVoice("en-in-x-ene-network");
    // Tts.setDefaultVoice("hi-in-x-hid-network");
    Tts.speak(articlebody);
  };
  const stoplisten = () => {
    Tts.stop();
    setlistening(false);
  };

  useEffect(() => {
    if (isFocused) {
      getBookmarks();
      getLikedPost();
      getArticals();

      return () => {
        console.log("returned");
        clearactivity();
      };
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        display: articles.length == 0 ? "none" : null,
      }}
    >
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ImageBackground
            source={require("../images/add1.jpg")}
            style={{ height: "100%" }}
          ></ImageBackground>
        </View>
      </Modal>
      {articles ? (
        <FlipPage
          style={styles.wrapper}
          horizontal={false}
          onFinish={() => getArticals()}
          onPageChange={(pageIndex) => handleseen(pageIndex)}
        >
          {articles.map((item, index) => {
            return (
              <FlipPagePage key={index}>
                <View style={{ backgroundColor: "#fff" }}>
                  <ImageBackground
                    source={{ uri: `${item.image}` }}
                    style={styles.background}
                    blurRadius={8}
                  >
                    <ImageBackground
                      source={{ uri: `${item.image}` }}
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
                                ? liked.some((i) => i == item._id)
                                  ? dislikepost(item._id)
                                  : likepost(item._id)
                                : likepost(item._id)
                            }
                          >
                            {liked ? (
                              liked.some((i) => i == item._id) ? (
                                <FontAwesome
                                  name="heart"
                                  size={24}
                                  color="#099FFF"
                                />
                              ) : (
                                <FontAwesome
                                  name="heart-o"
                                  size={24}
                                  color="#099FFF"
                                />
                              )
                            ) : (
                              <FontAwesome
                                name="heart-o"
                                size={24}
                                color="#099FFF"
                              />
                            )}
                          </TouchableOpacity>
                          <Text
                            style={{
                              // color: "white",
                              fontFamily: "b612",
                              marginVertical: 5,
                            }}
                          >
                            {item.likes_count} Likes
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.bottommenulogo, { padding: "3.5%" }]}
                          onPress={onShare}
                        >
                          <AntDesign
                            name="sharealt"
                            size={24}
                            color="#099FFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.bottommenulogo, { padding: "3%" }]}
                          onPress={() =>
                            bookmarks
                              ? bookmarks.some((i) => i == item._id)
                                ? removebookmark(item._id)
                                : addbookmark(item._id)
                              : addbookmark(item._id)
                          }
                        >
                          {bookmarks ? (
                            bookmarks.some((i) => i == item._id) ? (
                              <Ionicons
                                name="ios-bookmark"
                                size={24}
                                color="#099FFF"
                              />
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
                          <Text
                            style={{ color: "#099FFF", fontFamily: "b612" }}
                          >
                            World
                          </Text>
                          <Text
                            style={{
                              // color: "white",
                              fontSize: 18,
                              fontFamily: "b612",
                            }}
                          >
                            {item.headline}
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
                          {item.body.split(" ").slice(0, 40).join(" ") + "..."}
                        </Text>
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() =>
                            navigation.navigate("App", {
                              screen: "Complete Article",
                              params: { link: item.link },
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
                        <TouchableOpacity
                          style={{ flexDirection: "row", alignItems: "center" }}
                          onPress={() =>
                            listening ? stoplisten() : startlisten(item.body)
                          }
                        >
                          <MaterialIcons
                            name="multitrack-audio"
                            size={24}
                            color={"gray"}
                          />
                          <Text
                            style={{
                              color: "#099FFF",
                              fontFamily: "b612",
                              marginVertical: 10,
                              fontSize: 12,
                              marginHorizontal: 4,
                            }}
                          >
                            Click Here to Listen Article
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </FlipPagePage>
            );
          })}
        </FlipPage>
      ) : (
        <View>
          <Text>no articles available</Text>
        </View>
      )}

      {/* <Swiper
        autoplay={true}
        showsPagination={false}
        style={styles.wrapper}
        showsButtons={true}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper> */}
    </View>

    // <FlipPage>
    //   <FlipPagePage>
    //     <Text>vishal</Text>
    //   </FlipPagePage>
    //   <FlipPagePage>
    //     <Text>Ashok</Text>
    //   </FlipPagePage>
    //   <FlipPagePage>
    //     <Text>kongre</Text>
    //   </FlipPagePage>
    // </FlipPage>
  );
};

export default Feed;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: hp("100%"),
    paddingTop: "10%",
  },
  background2: {
    width: wp(95),
    height: hp("35%"),
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
