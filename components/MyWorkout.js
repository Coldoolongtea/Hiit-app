import React, { Component, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, FlatList, Image } from 'react-native'
import ActionButton from 'react-native-action-button'
import {Ionicons} from '@expo/vector-icons'
import isLoggedIn from '../hooks/isLoggedIn'
import AsyncStorage from '@react-native-async-storage/async-storage'
const bgImage = require('../assets/background.jpg');



const MyWorkout = ({ navigation }) => {
  const thumbnail_url = 'https://i.ibb.co/ScQPjfQ/pexels-anush-gorak-1229356.jpg'
  const [user, user_id] = isLoggedIn({navigation})
  const [events, setEvents] = useState([])

  useEffect(() => {
    console.log('COMPONENT DID UPDATE', user, user_id)
    if (user) fetchDashboard()
  }, [user])
  
  const fetchDashboard = async () => {
    const rawData = await fetch('http://192.168.1.51:8080/api/user/events', {
      headers: {
        'user': user,
      }
    })
    const data = await rawData.json()
    setEvents(data.events)
  }

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    navigation.reset({
      routes: [
        {name: 'Login'}
      ]
    })
  }

  const getWholeDuration = (event) => {
    let duration = 0
    if (event.mouvements) event.mouvements.forEach(mov => {
      duration += mov.Duration + mov.Rest_Duration
    })
    return `${String(Math.floor(duration / 60))}:${String(duration % 60)}`
  }
  const startWorkout = (workout) => {
    navigation.navigate({
      name: 'Counter',
      params: workout
    })
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
            <Image
              source={{uri: item.thumbnail_url || thumbnail_url}}
              style={styles.thumbnail}
            />
            <Text style={styles.workoutTitle}> <Text style={styles.boldText}>Title:</Text> {item.title}</Text>
            <Text style={styles.equipment}> Number of moves: {item.nbrMoves}</Text>
            <Text style={styles.description}> Desciption: {item.description}</Text>
            <Text style={styles.duration}> Duration: {getWholeDuration(item) + ' minutes'}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => startWorkout(item)}>
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
  }
})


export default MyWorkout
