import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native'

const bgImage = require('../assets/background.jpg')

const Dashboard = ({navigation}) => {

    return(
        <View style={styles.container}>
            <ImageBackground source={bgImage} style={styles.image}>
                <Text style={styles.title}>Dashboard</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>Go to Login page</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center", 
        alignItems: "center"    
    },
    image:{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize: 32,
        marginBottom: 8,
        fontWeight: "bold",
        color: "#224fb4",
    }

})

export default Dashboard