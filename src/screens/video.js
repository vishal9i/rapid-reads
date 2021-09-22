import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const video = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../images/login/Video1.jpg')}
                style={{height:'90%'}}
            />
        </View>
    )
}

export default video

const styles = StyleSheet.create({
    container:{
        marginTop:40,
        width:'100%',
        height:'100%'
    }
})
