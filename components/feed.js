import React, { Component, useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image } from 'react-native'
import isLoggedIn from '../hooks/isLoggedIn'
import ActionButton from 'react-native-action-button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {FontAwesome5, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
import ModalComponent from '../components/ModalComponent'
import { Modal } from 'react-native-paper'
const bgImage = require('../assets/background.jpg');



const Feed = ({ navigation }) => {
  const [user, user_id] = isLoggedIn({navigation})
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [events, setEvents] = useState([{
    _id: 'idblah',
    title: 'ABS workout 15 mins',
    equipment: 'Training mat',
    type: 'ABS',
    description: "Bla bla bla",
    duration: "15",
    thumbnail_url: 'https://i.ibb.co/ScQPjfQ/pexels-anush-gorak-1229356.jpg'
  },
  {
    _id: 'idblah1',
    title: 'ABS workout 15 mins',
    equipment: 'Training mat',
    type: 'ABS',
    description: "Bla bla bla",
    duration: "15",
    thumbnail_url: 'https://i.ibb.co/ScQPjfQ/pexels-anush-gorak-1229356.jpg'
  },
  {
    _id: 'idblah2',
    title: 'ABS workout 15 mins',
    equipment: 'Training mat',
    type: 'ABS',
    description: "Bla bla bla",
    duration: "15",
    thumbnail_url: 'https://i.ibb.co/ScQPjfQ/pexels-anush-gorak-1229356.jpg'
  }])


  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    navigation.navigate('Login')
  }


  useEffect(() => {

    console.log('User and User Id', user, user_id)
  },[])

  return (
  <SafeAreaView style={styles.container}>
    
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
      <Text style={styles.title}>DashBoard</Text>
      <FlatList 
        style={styles.list}
        data={events}
        showsHorizontalScrollIndicator={true}
        keyExtractor={event => event._id}
        renderItem={({item}) => {
          
          console.log('🚀 ---------------------------------------------------------')
          console.log('🚀 ~ file: Dashboard.js ~ line 32 ~ DashBoard ~ item', item)
          console.log('🚀 ---------------------------------------------------------')
          return(
            <View style={styles.listItem}>
            <Image
              source={{uri: item.thumbnail_url}}
              style={styles.thumbnail}
            />
            <Text style={styles.workoutTitle}> <Text style={styles.boldText}>Title:</Text> {item.title}</Text>
            <Text style={styles.equipment}> Equipment: {item.equipment}</Text>
            <Text style={styles.type}> Type: {item.type}</Text>
            <Text style={styles.description}> Desciption: {item.description}</Text>
            <Text style={styles.duration}> Duration: {item.duration + ' minutes'}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => console.log('Register')}>
                  <Text style={{ color: "#FFFF" }}>Start Workout</Text>
                </TouchableOpacity>
          </View>
          )

        }}>

      </FlatList>
      
      <ModalComponent isVisible = {modalIsVisible} setIsVisible = {setModalIsVisible} user={user}></ModalComponent>


      {modalIsVisible? <Text> Is Visivle</Text> : null}

      <TouchableOpacity onPress={logoutHandler}>
        <Text>Logout</Text>
      </TouchableOpacity>
      </ImageBackground>

      <ActionButton buttonColor="#fff" offsetX={0} offsetY={0}>
        <ActionButton.Item title='Add workout' onPress={() => setModalIsVisible(true)}>
          <Ionicons name="ios-add" style={styles.actionbutton}/>
        </ActionButton.Item>
      </ActionButton>

      
    </View>
  </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: 'center',
    resizeMode: 'cover'

  },
  list: {
    width: "100%",
    paddingHorizontal: 20
  },
  listItem: {
    padding: 8,
    backgroundColor: "#FFFF",
    marginVertical: 8,
    opacity: 0.9
  },
  thumbnail: {
    width: 'auto',
    height: 150,
    marginBottom: 8
  },
  workoutTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 15,
  },
  equipment: {
    fontSize: 16,
    color: "#444",
  },
  type: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: "#444",
  },
  duration: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    fontWeight: 'bold'
  },
  boldText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: "#444"
  },
  primaryBtn: {
    height: 42,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  actionbutton: {
    fontSize: 20,
    height: 22,
    color: '#000'
  },
})


export default Feed
