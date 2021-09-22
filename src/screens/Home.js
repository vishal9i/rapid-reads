import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  LogBox,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import {
  Feather,
  SimpleLineIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { BASE_URL, Image_Url } from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [categories, setcategories] = useState();
  const [preferences, setpreferences] = useState();
  const [sdata, setsdata] = useState();
  const getusercategories = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/user-preference-category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setpreferences(data.preferences.preferred_categories);
      });
  };
  const getcategories = () => {
    fetch(BASE_URL + "/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setcategories(data.data);
      });
  };
  const removepreference = async (catName) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/remove-user-preference-category", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        categoryname: catName,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          // alert(data.message);
          getusercategories();
        } else {
          alert(data.message);
        }
      });
  };
  const addcategory = async (catName) => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "/add-user-preference-category", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
        categoryname: catName,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          // alert(data.message);
          getusercategories();
        } else {
          alert(data.message);
        }
      });
  };

  // console.log(preferences);

  const getsearchdata = () => {
    fetch(BASE_URL + "/articles-search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setsdata(data.data);
        } else {
          alert(data.message);
        }
      });
  };

  const [data, setData] = React.useState([]);
  const [string, setstring] = useState("");
  const [searchresult, setSearchresult] = React.useState();

  const searchHandler = (prop) => {
    setstring(prop);
    if (string !== "") {
      const newArticleList = sdata.filter((bname) => {
        return Object.values(bname)
          .join(" ")
          .toLocaleLowerCase()
          .includes(string.toLocaleLowerCase());
      });
      setSearchresult(newArticleList);
    } else {
      setSearchresult(data);
    }
  };

  useEffect(() => {
    getusercategories();
    getcategories();
    getsearchdata();
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DISCOVER</Text>
      <View style={styles.searchouter}>
        <View style={styles.searchbox}>
          <Feather
            name="search"
            size={24}
            color="#099FFF"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              width: "90%",
              padding: 1,
              color: "white",
              fontFamily: "b612",
            }}
            onChangeText={(text) => searchHandler(text)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SimpleLineIcons name="equalizer" size={24} color="#616161" />
        </TouchableOpacity>
      </View>
      {string.length < 1 ? (
        <View style={{ paddingBottom: "90%" }}>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.smallbutton}
                onPress={() => navigation.navigate("Tab", { screen: "Feed" })}
              >
                <Text
                  style={{ color: "#099FFF", fontSize: 14, fontFamily: "b612" }}
                >
                  My Feed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallbutton}
                onPress={() =>
                  navigation.navigate("App", {
                    screen: "coustom",
                    params: { newsType: "articles-trending" },
                  })
                }
              >
                <Text
                  style={{ color: "#099FFF", fontSize: 14, fontFamily: "b612" }}
                >
                  Trending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallbutton}
                onPress={() =>
                  navigation.navigate("App", {
                    screen: "coustom",
                    params: { newsType: "articles" },
                  })
                }
              >
                <Text
                  style={{ color: "#099FFF", fontSize: 14, fontFamily: "b612" }}
                >
                  All News
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            {/* <Text style={{ color: 'white', fontSize: 16 }}>
          Artical By Turbo News
        </Text> */}
            <Image
              source={require("../images/login/fonts.png")}
              style={{
                width: "45%",
                height: 20,
                marginVertical: 10,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>

          <View style={{ marginHorizontal: 15 }}>
            <Text style={{ color: "white", fontSize: 25, fontFamily: "b612" }}>
              Choose Categories
            </Text>
          </View>

          <ScrollView>
            <View
              style={{
                marginBottom: "30%",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {categories
                ? categories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          preferences
                            ? preferences.some((i) => i.name == item.name)
                              ? removepreference(item.name)
                              : addcategory(item.name)
                            : alert("wait untill App loading")
                        }
                        Key={index} // Important! Should add this props!!!
                      >
                        <ImageBackground
                          source={{ uri: `${item.background}` }}
                          style={[
                            styles.item,
                            {
                              borderRadius: 7,
                              width: 90,
                              height: 90,
                              backgroundColor: "rgba(19, 19, 19, 0.41)",
                              overflow: "hidden",
                              margin: 10,
                            },
                          ]}
                        >
                          <View
                            style={{
                              backgroundColor: "rgba(19, 19, 19, 0.41)",
                              height: "100%",
                              borderRadius: 7,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: 4,
                              }}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  {
                                    color: "#fff",
                                    fontFamily: "b612",
                                    fontWeight: "bold",
                                    fontSize: 10,
                                  },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                alignItems: "center",
                                marginVertical: 10,
                                display: preferences
                                  ? preferences.some((i) => i.name == item.name)
                                    ? null
                                    : "none"
                                  : "none",
                              }}
                            >
                              <AntDesign
                                name="checkcircle"
                                size={24}
                                color="#2bff00"
                              />
                            </View>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
          </ScrollView>
        </View>
      ) : (
        searchresult.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={{
                  margin: 10,
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("App", {
                    screen: "Saved",
                    params: { id: item._id },
                  })
                }
              >
                <Text style={{ color: "black", fontFamily: "b612" }}>
                  {item.headline}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    backgroundColor: "#1c1c1c",
    padding: 10,
    height: "110%",
  },
  heading: {
    fontFamily: "b612",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    margin: 15,
  },
  searchbox: {
    backgroundColor: "#3b3b3b",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 7,
    paddingVertical: 5,
    width: "80%",
  },
  searchouter: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#099FFF",
    width: "94%",
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  smallbutton: {
    padding: 10,
    backgroundColor: "#3b3b3b",
    marginHorizontal: 5,
    paddingHorizontal: 24,
    borderRadius: 7,
  },
});
