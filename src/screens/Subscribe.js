import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableRipple } from 'react-native-paper';

const Subscribe = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        style={styles.container}
        source={require('../images/login/login.png')}
        blurRadius={3}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 178, 255, 0.59)',
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Tab', { screen: 'Home' })}
          >
            <AntDesign
              name="left"
              size={30}
              color="white"
              style={{ marginTop: hp(5) }}
            />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: hp(8) }}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: hp(1),
              }}
            >
              SUBSCRIBE
            </Text>
            {/* <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: hp(4),
              }}
            >
              
            </Text> */}
             <Image source={require('../images/login/loggo.png')}
             style={{width:'90%',height:'15%',alignSelf:'center',marginVertical:10}}
           
          />
             
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#1c1c1c' }]}
            >
              <Text
                style={{ color: '#099FFF', fontSize: 20, fontWeight: 'bold' }}
              >
                Continue Free with Ads
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button2, { backgroundColor: 'white' }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                    1 Month Without
                  </Text>
                  <Text style={{ color: '#099FFF', fontWeight: 'bold' }}>
                    {' '}
                    Ads
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#099FFF',
                    borderRadius: 50,
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    $149
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button2, { backgroundColor: 'white' }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                    3 Month Without
                  </Text>
                  <Text style={{ color: '#099FFF', fontWeight: 'bold' }}>
                    {' '}
                    Ads
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#099FFF',
                    borderRadius: 50,
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    $399
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button2, { backgroundColor: 'white' }]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', color: 'gray' }}>
                    1 Year Without
                  </Text>
                  <Text style={{ color: '#099FFF', fontWeight: 'bold' }}>
                    {' '}
                    Ads
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#099FFF',
                    borderRadius: 50,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    $1399
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Subscribe;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  button: {
    paddingVertical: hp(2),
    width: '100%',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: hp(2),
  },
  button2: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 7,
    paddingHorizontal: wp(10),
    marginBottom: hp(2),
  },
});
