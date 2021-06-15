import React, { Component, useEffect}  from 'react'
import { Text, View, Button, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {FontAwesome5, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'


function Counter({route, navigation}){
  //Obj conntient les informations de la séance que l'utilisateur a démaré
  const obj = route.params
  //Permet de mettre de mettre en pause
  const [isPlaying, setIsPlaying] = React.useState(true)
  //Le mouvement actuel 
  const [currentmove, setCurrentMove] = React.useState(obj.mouvements[0])
//Fonction qui permet de passé au mouvment suivant
function updatemove(){
  const len = parseInt(obj.nbrMoves);
  const index = parseInt(currentmove.index)
  //Tant qu'on est pas à la fin des mouvements le compteur recommence en mettant à jour le mouvment à effectuer
  if(index < len){
    //On définit aussi la durée de pause du mouvement 
    setTimeout(()=>{setCurrentMove(prev => obj.mouvements[index+1])}, parseInt(currentmove.Rest_Duration)*1000)
    return [true, parseInt(currentmove.Rest_Duration)*1000]
  }
  else{
    return[false]
  }
}

  return (    
    <View style={styles.container}>
      {/* bouton permet le retour en arriére */}
      <TouchableOpacity style={{}} onPress={() => {navigation.goBack()}}>
        <Ionicons name={'arrow-back-outline'} size={30} style={styles.goBack} />
      </TouchableOpacity>
      <Text style ={styles.title}> {obj.title} </Text>
    {currentmove?
    <View>
      {/* Ici nous avons le chronométre, lorsque le mouement en cours 
      est fini on fait appelle à la fonction update move */}
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
    {/* Ici se trouve l'ensemble d'indications concernant le nom du mouvement actuelle ainsi que 
    Le mouvement à suivre */}
    <Text style={styles.currentmove} > {currentmove.Mouvement_name} </Text>
    
    <View style={styles.comingup}>
      <Text style={styles.commingmove} > Coming Up: </Text>
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
    {/* Bouton qui permet de mettre en pause le chronométre */}
    <Button title="Pause" onPress={() => setIsPlaying(prev => !prev)}/>

    </View>
    // Si l'utilisateur est arrivé vers la fin on félicite l'utilisateur
    :<Text style={styles.move} > Congratulations on completing you {obj.title} workout! </Text>}
    </View>
  )
      }


    const styles = StyleSheet.create({

      
  title:{
    textTransform: 'uppercase',
    fontSize:30,
    marginBottom:50,
    marginTop:45,
    color: '#6142B7',
    borderBottomWidth:5,
    borderColor:'#19928F'
    
  },
  currentmove:{fontSize:25,
    marginTop:10,
    textTransform: 'uppercase',
    color: 	'#FFFFFF',
  marginBottom:90,},
  move:{
    fontSize:25,
    marginTop:10,
    textTransform: 'uppercase',
    color: 	'#6B79A1',
    
  },
  comingup:{
    borderRadius:10,
    padding: 15,
    
    backgroundColor: "#01182B",
    
    opacity: 0.9
  },
  commingmove:{ 
    textTransform: 'uppercase',
    fontSize:25,
   
    marginBottom:2,
    color: 	'#6B79A1',},

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
    marginRight:300,
    color: '#6142B7'
  }
});

export default Counter