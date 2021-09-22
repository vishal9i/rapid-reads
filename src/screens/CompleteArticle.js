import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const CompleteArticle = ({ route, navigation }) => {
  const { link } = route.params;
  return (
    <WebView
      style={{ flex: 1, marginTop: Constants.statusBarHeight }}
      source={{ uri: `${link}` }}
    />
  );
};

export default CompleteArticle;

const styles = StyleSheet.create({});
