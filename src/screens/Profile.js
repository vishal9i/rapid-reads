import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Bookmarked from "../components/Bookmarked";
import Liked from "../components/Liked";
import { BASE_URL } from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const [active, setActive] = useState("likes");
  const [userdata, setuserdata] = useState();
  const [liked, setliked] = useState();
  const [bookmarks, setbookmarks] = useState();
  let isFocused = useIsFocused();

  const getuserdata = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log();
        setuserdata(data.data);
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
  //Upload Image Starts from here

  const updateimage = async (image) => {
    const token = await AsyncStorage.getItem("token");
    // const cleanurl = image.replace('file://', '');
    console.log(image, token);
    const imagedata = new FormData();
    imagedata.append("profilePic", {
      type: "image/jpg",
      uri: image,
      name: "profile.jpg",
    });

    fetch(BASE_URL + "/upload-image", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        userid: token,
      },
      body: imagedata,
    })
      .then((res) => res.json())
      .then(async (data) => {
        data.success == true
          ? await AsyncStorage.setItem("image", data.profilePic)
          : alert("image not uploaded try again !");
        getuserdata();
      })
      .catch((e) => console.log(e));
  };

  // const getimage = async () => {
  //   const proimage = await AsyncStorage.getItem("image");
  //   setproimage(proimage);
  // };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // getimage();
  // getbalace();
  // console.log(image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      updateimage(result.uri);
    }
  };
  //update image ends here

  useEffect(() => {
    if (isFocused) {
      getBookmarks();
      getLikedPost();
      getuserdata();
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.ProfileBox}>
        <TouchableOpacity style={styles.imagecontainer} onPress={pickImage}>
          <Image
            source={
              userdata
                ? { uri: userdata.avatar }
                : require("../images/profile/avatar.png")
            }
            style={{
              height: 100,
              width: 100,
              overflow: "hidden",
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
        <View style={{ bottom: 40 }}>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "b612",
            }}
          >
            {userdata ? userdata.name : null}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 25,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontFamily: "b612" }}>LIKES</Text>
              <Text style={{ fontWeight: "bold", fontFamily: "b612" }}>
                {userdata ? userdata.liked_articles.length : 0}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontFamily: "b612" }}>SHARES</Text>
              <Text style={{ fontWeight: "bold", fontFamily: "b612" }}>0</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontFamily: "b612" }}>
                BOOKMARKS
              </Text>
              <Text style={{ fontWeight: "bold", fontFamily: "b612" }}>
                {userdata ? userdata.bookmarked_articles.length : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#099FFF",
          width: "100%",
          justifyContent: "flex-start",
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: active == "likes" ? "black" : "#099FFF",
            width: "50%",
            alignItems: "center",
            paddingVertical: 10,
          }}
          onPress={() => setActive("likes")}
        >
          <Text style={{ color: "white", fontFamily: "b612" }}>LIKES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: active == "bookmarks" ? "black" : "#099FFF",
            width: "50%",
            alignItems: "center",
            paddingVertical: 10,
          }}
          onPress={() => setActive("bookmarks")}
        >
          <Text style={{ color: "white", fontFamily: "b612" }}>BOOKMARKS</Text>
        </TouchableOpacity>
      </View>

      {active == "likes" ? (
        <View>
          {userdata
            ? userdata.liked_articles.map((item, index) => {
                return (
                  <Liked props={item} key={index} navigation={navigation} />
                );
              })
            : null}
        </View>
      ) : (
        <View>
          {userdata.bookmarked_articles.map((item, index) => {
            return (
              <Bookmarked props={item} key={index} navigation={navigation} />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: "10%",
    paddingTop: "15%",
    backgroundColor: "#1c1c1c",
    height: "100%",
  },
  ProfileBox: {
    width: "100%",
    backgroundColor: "#099FFF",
    marginTop: "30%",
    height: "30%",
    borderRadius: 7,
  },
  imagecontainer: {
    alignSelf: "center",
    backgroundColor: "white",
    // width: 100,
    // height: 100,
    borderRadius: 50,
    bottom: 50,
  },
  activebutton: {
    backgroundColor: "black",
  },
});
