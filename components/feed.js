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
  const thumbnail_url = 'https://i.ibb.co/ScQPjfQ/pexels-anush-gorak-1229356.jpg'
  const [user, user_id] = isLoggedIn({navigation})
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [events, setEvents] = useState([])


  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    navigation.reset({
      routes: [
        {name: 'Login'}
      ]
    })
  }
  const fetchDashboard = async () => {
    const rawData = await fetch('http://192.168.1.44:8080/api/dashboard', {
      headers: {
        'user': user
      }
    })
    const data = await rawData.json()
    setEvents(data.events)
  }

  const startWorkout = (workout) => {
    navigation.navigate({
      name: 'Counter',
      params: workout
    })
  }

  useEffect(() => {
    if (user) fetchDashboard()
  }, [user])

  useEffect(() => {
    console.log("component did update")
  })

  const getWholeDuration = (event) => {
    let duration = 0
    if (event.mouvements) event.mouvements.forEach(mov => {
      duration += mov.Duration + mov.Rest_Duration
    })
    return `${String(Math.floor(duration / 60))}:${String(duration % 60)}`
  }

  const toggleFavorite = async (item) => {
    await fetch('http://192.168.1.44:8080/api/event/toggleFavorite', {
      method: 'POST',
      headers: {
        'user': user,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event: item })
    })
    const index = events.findIndex(event => event._id === item._id)
    events[index].isFavorite = !events[index].isFavorite
    console.log(events)
    setEvents([...events])
  }

  return (
  <SafeAreaView style={styles.container}>
    
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
      <FlatList 
        style={styles.list}
        data={events}
        showsHorizontalScrollIndicator={true}
        keyExtractor={event => event._id}
        renderItem={({item}) => {
          
          // console.log('🚀 ---------------------------------------------------------')
          // console.log('🚀 ~ file: Dashboard.js ~ line 32 ~ DashBoard ~ item', item)
          // console.log('🚀 ---------------------------------------------------------')
          return(
            <View style={styles.listItem}>
            <TouchableOpacity style={styles.startIconContainer} onPress={() => {toggleFavorite(item)}}>
              <Ionicons name={item.isFavorite ? 'star' : 'star-outline'} size={30} style={styles.startIcon} />
            </TouchableOpacity>
            <Image
              source={{uri: item.thumbnail_url || thumbnail_url}}
              style={styles.thumbnail}
            />
            <Text style={styles.workoutTitle}> <Text style={styles.boldText}>Title:</Text> {item.title}</Text>
            <Text style={styles.equipment}> Number of moves: {item.nbrMoves}</Text>
            <Text style={styles.description}> Desciption: {item.description}</Text>
            <Text style={styles.duration}> Duration: {getWholeDuration(item) + ' minutes'}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => {startWorkout(item)}}>
                  <Text style={{ color: "#FFFF" }}>Start Workout</Text>
            </TouchableOpacity>
          </View>
          )

        }}>

      </FlatList>
      
      </ImageBackground>

      <ActionButton buttonColor="#fff" offsetX={0} offsetY={0}>
        <ActionButton.Item title ='Logout' onPress={async () => await logoutHandler()} >
          <Ionicons name="ios-add" style={styles.actionbutton}/>
        </ActionButton.Item>
        <ActionButton.Item title ='Refresh' onPress={() => {fetchDashboard()}} >
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
    paddingHorizontal: 20,
    marginTop: 30
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
  startIconContainer: {
    position: 'absolute',
    height: 22,
    width: 40,
    zIndex: 10,
    right: 5,
    top: 10
  },
  startIcon: {
    color: 'red'
  }
})


export default Feed
