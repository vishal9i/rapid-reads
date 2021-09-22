import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Web = () => {
  return (
    <WebView source={{ uri: "https://rapid-reads-ash.herokuapp.com/google" }} />
  );
};

export default Web;

const styles = StyleSheet.create({});
