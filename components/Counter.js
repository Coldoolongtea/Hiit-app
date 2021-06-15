import React, { Component, useEffect}  from 'react'
import { Text, View, Button, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {FontAwesome5, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'


function Counter({route, navigation}){
  const obj = route.params
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [currentmove, setCurrentMove] = React.useState(obj.mouvements[0])

function updatemove(){
  const len = parseInt(obj.nbrMoves);
  const index = parseInt(currentmove.index)
  if(index < len){
    setTimeout(()=>{setCurrentMove(prev => obj.mouvements[index+1])}, parseInt(currentmove.Rest_Duration)*1000)
    return [true, parseInt(currentmove.Rest_Duration)*1000]
  }
  else{
    return[false]
  }
}

  return (    
    <View style={styles.container}>
      <TouchableOpacity style={{}} onPress={() => {navigation.goBack()}}>
        <Ionicons name={'arrow-back-outline'} size={30} style={styles.goBack} />
      </TouchableOpacity>
      <Text style ={styles.title}> {obj.title} </Text>
    {currentmove?
    <View>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        key={currentmove.Mouvement_name}
        duration={parseInt(currentmove.Duration)}
        colors={[
          ['#6142B7', 0.4],
          ['#2C2085', 0.4],
          ['#1E177F', 0.2],
        ]}
        onComplete={() =>{ 
          updatemove()          
        }}
    >
    
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
    <Text style={styles.move} > {currentmove.Mouvement_name} </Text>
    
    <View>
      <Text style={styles.move} > Coming Up: </Text>
      {obj.mouvements[parseInt(currentmove.index+1)] !== undefined ?
      <View>
        <Text style={styles.move} > {obj.mouvements[parseInt(currentmove.index+1)].Mouvement_name} </Text>
        <Text style={styles.move} > Duration : {parseInt(obj.mouvements[parseInt(currentmove.index+1)].Duration)}s </Text>
      </View>
      :
      <View>
        <Text style={styles.move} > Last move </Text>
      </View>
      }
    </View>
    <Button title="Pause" onPress={() => setIsPlaying(prev => !prev)}/>

    </View>
    :<Text style={styles.move} > Congratulations on completing you {obj.title} workout! </Text>}
    </View>
  )
      }


    const styles = StyleSheet.create({

      
  title:{
    fontSize:30,
    marginBottom:50,
    marginTop:45,
    color: '#2C2085',
    borderBottomWidth:5,
    borderColor:'#19928F'
    
  },
  move:{
    fontSize:25,
    marginTop:10,
    color: 	'#FFFFFF',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#01233E',
    padding: 8,
  },
  remainingTime: {
    fontSize: 46,
  },
  goBack: {
    color: 'white'
  }
});

export default Counter