import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Form,Label, Icon,Button,ScrollView} from 'react-native'
import Mouvement from './Mouvement'
import ActionButton from 'react-native-action-button'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Circuit2 extends Component {
   state = {
      Workout_name: '',
      Number_of_moves: '',
      description: '',
      user: ''
   }
 mouvements = [];

   async componentDidMount() {
      const user = await AsyncStorage.getItem('user')
      const user_id = await AsyncStorage.getItem('user_id')
      console.log("CIRCUIT2: \t",user, user_id)
      this.setState({ user: user })
   }

   handleWorkout_name = (text) => {
      this.setState({ Workout_name: text })
      
   }
   handleNumber_of_moves = (m) => {
      this.setState({ Number_of_moves: m })
   }
    
   handleDescription = (text) => {
      this.setState({ description: text })
   }

   submit = async () => {
      // console.log('Workout_name: ' + this.state.Workout_name + ' a été crée avec succès')
      const Workout_name = this.state.Workout_name
      const Number_of_moves = this.state.Number_of_moves
      const description = this.state.description
      
      try {
         const response = await fetch(`http://${global.backendIp}:8080/api/event`, {
             method: "POST",
             body: JSON.stringify({ title: Workout_name, nbrMoves: Number_of_moves, description: description, mouvements : this.mouvements }),
             headers: {'Content-Type': 'application/json', 'user': this.state.user}
         })

         const responseJson = await response.json()

         


         console.log('🚀 ----------------------------------------------------------------------------')
         console.log('🚀 ~ file: Register.js ~ line 24 ~ submit ~ responseJson', responseJson)
         console.log('🚀 ----------------------------------------------------------------------------')
   
       } catch (error) {
         console.log('🚀 --------------------------------------------------------------')
         console.log('🚀 ~ file: Register.js ~ line 19 ~ submit ~ error', error)
         console.log('🚀 --------------------------------------------------------------')
   
       }
 }

   

   handleCallback = (childData,index) =>{
      this.mouvements[index]=childData
  }
  
     render() {

      const {data} = this.state;
       // on va créer un tableau de mouvements
     var Mouvements = [];
     	for(let i = 0; i < this.state.Number_of_moves; i++){

		Mouvements.push(
			<View key = {i}>
				<Mouvement handleCallback={this.handleCallback} index={i}/>
        </View>
		)}
	
      return (
         <ScrollView style = {styles.container} >
        <View nativeID ="root">
          <Text style ={styles.title}> New HIIT Circuit </Text>

          <View style= {styles.Workout_name}>
            <Text style={styles.title2}>Workout name: </Text>
              <TextInput type="Text" style = {styles.input_name}
                underlineColorAndroid = "transparent"
                placeholder = "name"
                autoCapitalize = "none"
                onChangeText = {this.handleWorkout_name}/>
            </View>

          <View style= {styles.Workout_name}>
            <Text style={styles.title2}>Description: </Text>
              <TextInput type="Text" style = {styles.input_name}
                underlineColorAndroid = "transparent"
                placeholder = "name"
                autoCapitalize = "none"
                onChangeText = {this.handleDescription}/>
            </View>

            <View style= {styles.Number_of_moves}>
              <Text style={styles.title2}>Number of moves: </Text>
                <TextInput type="Text" style = {styles.input_number}
                  underlineColorAndroid = "transparent"
                  placeholder = "Number"
                  autoCapitalize = "none"
                  onChangeText = {this.handleNumber_of_moves}/>
            </View>

          
         
          {/* {Mouvements.map(function(m, i) {
      return <Text key={'Mouvement-' + i} style={styles.mouv_nbr} >
          {m}{i+1}
          
          
          </Text>
})} */}

      <View>
         {Mouvements}
      </View>


            
           <View style={{height: 100}}>
               <Button title="valider" style = {styles.submitButton} onPress ={this.submit} />
            </View>            
           

         </View>
         </ScrollView>
      )
   }
}
export default Circuit2
const styles = StyleSheet.create({

  title:{
    fontSize:22,
    marginBottom:10,
    marginTop:45,
    color: '#193F92',
    
  },
  
   container: {
      paddingTop: 23,
      backgroundColor: '#09264B',
      // justifyContent: 'center',
     
       padding: 20,
    
   },
   title2:{
     fontSize:15,
     marginTop:15,
     color:'#A1A2AC',
     
   },
   Workout_name :{
    
    borderTopWidth:3,
    borderColor:'#19928F'
   },
   Number_of_moves :{
   //  display: "inline"
   display: 'flex'
   },
    Number_of_sets :{
   //  display: "inline"
   display: 'flex',
   },
   input_name: {
      marginTop: 15,
      marginBottom: 15,
      marginLeft:0,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius:12,
      width:150,
      shadowRadius:20,
      padding:7,
      color: '#19928F',
      
      
   },
   input_number: {
      marginTop: 15,
      marginBottom: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius:12,
      width:70,
      shadowRadius:20,
      marginLeft:40,
      padding:7,
      color: '#19928F',
   },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white',
      textAlign:'center',
   },
   mouv_nbr:{
   //   display: "inline"
   display: 'flex',
   }
  
})

