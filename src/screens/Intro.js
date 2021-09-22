import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
// import SwipeUpDown from "react-native-swipe-up-down";

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dot={
          <View
            style={{
              backgroundColor: "#b2b1b5",
              width: wp(6),
              height: hp(1.5),
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#000",
              width: wp(6),
              height: hp(1.5),
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
      >
        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            1.Welcome to Rapid Reads, where we summarize the news YOU want to
            read, in 60 words or less
          </Text>

          <Image
            source={require("../images/Intro/pic2.gif")}
            style={styles.slide1image}
          />
        </View>

        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            2. First, Select all the categories that interest YOU
          </Text>
          <Image
            source={require("../images/Intro/pic1.gif")}
            style={styles.slide1image}
          />
        </View>

        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            3. You are now ready with your feeds which you can like, Shareand
            bookmark to read later
          </Text>
          <Image
            source={require("../images/Intro/pic.gif")}
            style={styles.slide1image}
          />
        </View>

        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            4.If you want to know more about a news feed, you can swipe left to
            read the full news article
          </Text>
          <Image
            source={require("../images/login/pic.gif")}
            style={styles.slide1image}
          />
        </View>

        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            5.Swipe Up to read articles that are curated for you.
          </Text>
          <Image
            source={require("../images/Intro/pic.gif")}
            style={styles.slide1image}
          />

          {/* <SwipeUpDown
          itemMini={<Text></Text>}
          itemFull={
            <View>
             <Image
             source={require('../images/Intro/pic.gif')}
             style={styles.slideupimage}
            />
        
            </View>
          }
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          disablePressToShow={false}
          style={{ backgroundColor: '#fff' }}
        /> */}
        </View>

        {/* <View style={styles.slide1}>
          <Text style={{ color:'grey',fontSize:16, fontFamily:'b612', textAlign:'justify' }}>
            4.Swipe Up to read articles
            that are curated for you.
              </Text>
           <Image
             source={require('../images/Intro/pic.gif')}
             style={styles.slide1image}
            />

          </View> */}

        <View style={styles.slide1}>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontFamily: "b612",
              textAlign: "justify",
            }}
          >
            6.We also have an audio feature on the app that lets you listen to
            the news summaries, allowing you to multitask. How cool is that!
          </Text>
          <Image
            source={require("../images/Intro/Video.jpg")}
            style={styles.slide1image}
          />
        </View>

        <View style={styles.slide7}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                backgroundColor: "#000",
                padding: 11,
                borderRadius: 10,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "b612",
                  textAlign: "justify",
                }}
              >
                Let's Get Started !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  slide1image: {
    marginTop: 20,
    width: "100%",
    height: "74%",
  },
  slide7: {
    backgroundColor: "#e3e1e8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  slideupimage: {
    marginTop: 10,
    width: "100%",
    height: "100%",
  },
});
