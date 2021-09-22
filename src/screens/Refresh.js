import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from './Feed.js'

const Refresh = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Refresh page is under development !</Text> */}
      <Feed />
    </View>
  );
};

export default Refresh;

const styles = StyleSheet.create({
  container: {
  
  
  },
});
