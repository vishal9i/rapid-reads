import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Welcome = ({ navigation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(1);
      navigation.navigate("Intro");
    }, 5000);
  }, []);

  const fadeAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim.x, {
          toValue: -100,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(fadeAnim.y, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
         onPress={()=>navigation.navigate('Intro') }
       > */}
      <Animated.Image
        source={require("../images/welcm/lg.png")}
        style={{
          width: wp(155),
          height: hp(16),
          backgroundColor: "transparent",
          marginTop: hp("40%"),
          transform: [{ translateX: fadeAnim.x }],
        }}
      ></Animated.Image>
      {/* </TouchableOpacity> */}
      <Animated.Image
        source={require("../images/welcm/Logo_Name.png")}
        style={{
          width: wp(55),
          height: hp(3),
          alignSelf: "center",
          backgroundColor: "transparent",
          opacity: fadeAnim.y,
          // transform: [
          //  {translateX:fadeAnim.y},
          //  ],
        }}
      ></Animated.Image>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#061d2b",
    height: hp("100%"),
  },
});
