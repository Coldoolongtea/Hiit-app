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


// Feed corespond au composant de la page de découvertes
const Feed = ({ navigation }) => {

  const thumbnail_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya291dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  const [user, user_id] = isLoggedIn({navigation})
  const [events, setEvents] = useState([])

//Fonction permettant la déconnection 
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('user_id');
    //On redérige l'utilisateur vers la page de login
    navigation.reset({
      routes: [
        {name: 'Login'}
      ]
    })
  }
  //Fonction permettant la récupération des données
  const fetchDashboard = async () => {
    const rawData = await fetch('http://192.168.1.44:8080/api/dashboard', {
      headers: {
        'user': user
      }
    })
    const data = await rawData.json()
    setEvents(data.events)
  }
  //Fonction qui renvoie vers le chronométre avec les données de la séance choisit par l'utilisateur en paramétres
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
//Fonction permettant de calculer la durée total d'une séance
  const getWholeDuration = (event) => {
    let duration = 0
    if (event.mouvements) event.mouvements.forEach(mov => {
      duration += mov.Duration + mov.Rest_Duration
    })
    return `${String(Math.floor(duration / 60))}:${String(duration % 60)}`
  }
//Fonction permettant d'ajouter ou retirer des séances favoris de l'utilisateur
  const toggleFavorite = async (item) => {
    await fetch(`http://${global.backendIp}:8080/api/event/toggleFavorite`, {
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
          
         
          return(
            <View style={styles.listItem}>
            <TouchableOpacity style={styles.startIconContainer} onPress={() => {toggleFavorite(item)}}>
              {/* L'icon permettant d'ajouter au favoris ou de retirer */}
            <Ionicons name={item.isFavorite ? 'heart' : 'heart-outline'} size={30} style={styles.startIcon} />
            </TouchableOpacity>
            <Image
              source={{uri: item.thumbnail_url || thumbnail_url}}
              style={styles.thumbnail}
            />
            <Text style={styles.workoutTitle}> <Text style={styles.boldText}></Text> {item.title}</Text>
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
        {/* bouton permettant la déconnection et la recharge d'une page */}
      <ActionButton buttonColor="#5330BC" offsetX={0} offsetY={0}>
        <ActionButton.Item title ='Logout' onPress={async () => await logoutHandler()} >
          <Ionicons name="log-out" style={styles.actionbutton}/>
        </ActionButton.Item>
        <ActionButton.Item title ='Refresh' onPress={() => {fetchDashboard()}} >
          <Ionicons name="refresh-circle" style={styles.actionbutton}/>
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
    borderRadius:10,
    padding: 8,
    backgroundColor: "#01182B",
    marginVertical: 8,
    opacity: 0.9
    
  },
  thumbnail: {
    width: 'auto',
    height: 150,
    marginBottom: 8
  },
  workoutTitle: {
    fontSize: 25,
    textTransform: 'uppercase',
    marginBottom: 8,
    color: "white",
    marginLeft:-8,
  },
  equipment: {
    fontSize: 16,
    color: "#6B79A1",
  },
  type: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    color: "#6B79A1",
  },
  duration: {
    fontSize: 16,
    color: '#475A91',
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
    backgroundColor: '#5330BC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  actionbutton: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  startIconContainer: {
    position: 'absolute',
    height: 30,
    width: 40,
    zIndex: 10,
    right: 5,
    top: 10
  },
  startIcon: {
    color: '#5330BC'
  }
})


export default Feed
