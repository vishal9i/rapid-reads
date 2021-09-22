import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Home from "./src/screens/Home";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Feed from "./src/screens/Feed";
import Listen from "./src/screens/Listen";
import Profile from "./src/screens/Profile";
import Intro from "./src/screens/Intro";
import video from "./src/screens/video";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Refresh from "./src/screens/Refresh";
import DrawerContaints from "./src/screens/DrawerContaints";
import Subscribe from "./src/screens/Subscribe";
import Web from "./src/screens/Web";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompleteArticle from "./src/screens/CompleteArticle";
import Saved from "./src/screens/Saved";
import Coustom from "./src/screens/Coustom";
import OtpVerify from "./src/screens/OtpVerify";
import Forgot1 from "./src/screens/Forgot1";
import Forgot2 from "./src/screens/Forgot2";
import Forgot3 from "./src/screens/Forgot3";

const AuthStack = createStackNavigator();
const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Intro" component={Intro} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="otpverify" component={OtpVerify} />
      <AuthStack.Screen name="forgot1" component={Forgot1} />
      <AuthStack.Screen name="forgot2" component={Forgot2} />
      <AuthStack.Screen name="forgot3" component={Forgot3} />
    </AuthStack.Navigator>
  );
};

const AppStack = createStackNavigator();
const AppStackScreen = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Feed" component={Feed} />
      <AppStack.Screen name="Subscribe" component={Subscribe} />
      <AppStack.Screen name="video" component={video} />
      <AppStack.Screen name="Google" component={Web} />
      <AppStack.Screen name="Complete Article" component={CompleteArticle} />
      <AppStack.Screen name="Saved" component={Saved} />
      <AppStack.Screen name="coustom" component={Coustom} />
    </AppStack.Navigator>
  );
};

const TabStack = createBottomTabNavigator();
const TabStackScreens = () => {
  return (
    <TabStack.Navigator
      initialRouteName="Feed"
      lazy={false}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 15,
          paddingTop: 10,
          height: "8%",
          width: "100%",
          alignSelf: "center",
          borderRadius: 7,
          backgroundColor: "black",
        },
      }}
    >
      <TabStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="nav-icon-grid" size={20} color={color} />
          ),
        }}
      />
      {/* <TabStack.Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: "Listen",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="multitrack-audio" size={24} color={color} />
          ),
        }}
      /> */}
      <TabStack.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper" size={24} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();
const DrawerStackScreens = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        // drawerContent: (props) => <DrawerContaints {...props} />,
      }}
      drawerContent={(props) => <DrawerContaints {...props} />}
    >
      <DrawerStack.Screen
        name="Tab"
        component={TabStackScreens}
        options={{ drawerLabel: "Home" }}
      />
      <DrawerStack.Screen name="App" component={AppStackScreen} />
    </DrawerStack.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [token, settoken] = useState(null);
  const [loading, setloading] = useState(true);
  const gettoken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      settoken(true);
    } else {
      settoken(false);
    }
  };
  useEffect(() => {
    gettoken();
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <RootStack.Navigator
      initialRouteName={token ? "Drawer" : "Auth"}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Auth" component={AuthStackScreens} />
      <RootStack.Screen name="Drawer" component={DrawerStackScreens} />
      {/* <RootStack.Screen name="App" component={AppStackScreen} />
      <RootStack.Screen name="Tab" component={TabStackScreens} /> */}
    </RootStack.Navigator>
  );
};

export default function App() {
  // const checkforupdates = async () => {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();
  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       // ... notify user of update ...
  //       await Updates.reloadAsync();
  //     }
  //   } catch (e) {
  //     // handle or log error
  //     alert(e);
  //   }
  // };
  // React.useEffect(() => {
  //   checkforupdates();
  // }, []);
  //update code ends here
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchfonts = () => {
    return Font.loadAsync({
      b612: require("./assets/fonts/B612-Regular.ttf"),
      Helvetica: require("./assets/fonts/Helvetica.ttf"),
    });
  };
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchfonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
