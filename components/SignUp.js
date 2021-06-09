import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground} from 'react-native'

const bgImage = require('../assets/background.jpg')

const SignUp = ({navigation}) => {
    const [firstName, setName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const submitHandler = async () => {
        console.log(firstName, lastName, email, password)

        try {
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: "POST",
                body: JSON.stringify({firstName, lastName, email, password}),
                headers: {'Content-Type': 'application/json'}
            })

            const responseJson = await response.json()

            


            console.log('🚀 ----------------------------------------------------------------------------')
            console.log('🚀 ~ file: Register.js ~ line 24 ~ submitHandler ~ responseJson', responseJson)
            console.log('🚀 ----------------------------------------------------------------------------')
      
          } catch (error) {
            console.log('🚀 --------------------------------------------------------------')
            console.log('🚀 ~ file: Register.js ~ line 19 ~ submitHandler ~ error', error)
            console.log('🚀 --------------------------------------------------------------')
      
          }
    }

    const cancelHandler = () => {
        setName(null)
        setLastName(null)
        setEmail(null)
        setPassword(null)
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={bgImage} style={styles.image}>
                <Text style={styles.title}>Sign up</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>First name:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder={"Enter your name"} 
                        placeholderTextColor="#5C2FB5AC" 
                        keyboardType="default" 
                        autoCorrect={false}
                        value={firstName}
                        onChangeText={text => setName(text)}
                    />
                    <Text style={styles.label}>Last name:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder={"Enter your last name"} 
                        placeholderTextColor="#5C2FB5AC" 
                        keyboardType="default" 
                        autoCorrect={false}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                    />
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
                    <Text style={{color: '#a2b3d6', fontWeight:'bold'}}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={cancelHandler}>
                    <Text style={{color: '#a2b3d6', fontWeight:'bold'}}>Cancel</Text>
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


export default SignUp