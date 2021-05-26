import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput} from 'react-native'

const bgImage = require('../assets/background.jpg')

const Login = ({navigation}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)


    const submitHandler = async () => {
        
        try {
            const response = await fetch('http://192.168.0.4:8080/api/login', {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {'Content-Type': 'application/json'}
            })

            const responseJson = await response.json()

            if(responseJson.user && responseJson.user_id){

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Mytabs'}],
                  });
               
            }
            else{
                alert("Email or password doesn't match")
            }

            console.log('🚀 ----------------------------------------------------------------------------')
            console.log('🚀 ~ submitHandler ~ responseJson', responseJson)
            console.log('🚀 ----------------------------------------------------------------------------')
      
          } catch (error) {
            console.log('🚀 --------------------------------------------------------------')
            console.log('🚀 ~ submitHandler ~ error', error)
            console.log('🚀 --------------------------------------------------------------')
      
          }
    }

    const signUpInsteadHandler = () => {
        setEmail(null)
        setPassword(null)
        navigation.navigate('SignUp')
    }

    return(

        <View style={styles.container}>
<ImageBackground source={bgImage} style={styles.image}>
                <Text style={styles.title}>LOGIN</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder={"Enter your email"} 
                        placeholderTextColor="#5C2FB5AC" 
                        keyboardType="email-address" 
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput 
                        style={styles.input}
                        style={styles.input}
                        placeholder={"Enter your password"}
                        placeholderTextColor="#5C2FB5AC" 
                        keyboardType="default"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    
                    />

                <TouchableOpacity style={styles.primaryButton} onPress={submitHandler}>
                    <Text style={{color: '#a2b3d6', fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={signUpInsteadHandler}>
                    <Text style={{color: '#a2b3d6', fontWeight:'bold'}}>Sign Up instead</Text>
                </TouchableOpacity>

                </View>

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
},
form:{
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
},
label:{
    fontSize: 22,
    color: '#a2b3d6',
    fontWeight: 'bold',
    padding: 8
},

input:{
    borderWidth: 1,
    borderColor: '#5b2fb5',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#5b2fb5',
    fontWeight: '400',
    height: 59,
    marginBottom: 30,
    borderRadius: 15
},
primaryButton:{
    height: 42,
    backgroundColor: '#5b2fb5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
},
secondaryButton:{
    height: 42,
    backgroundColor: '#5b2fb5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
}

})

export default Login