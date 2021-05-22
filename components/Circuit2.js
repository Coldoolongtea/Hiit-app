import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Form,Label, Icon,Button,ScrollView} from 'react-native'
import Mouvement from './Mouvement'

class Circuit2 extends Component {
   state = {
      Workout_name: '',
      Number_of_moves: '',
      Number_of_sets: '',
         
   }

 handleWorkout_name = (text) => {
      this.setState({ Workout_name: text })
   }
   handleNumber_of_moves = (m) => {
      this.setState({ Number_of_moves: m })
   }
    handleNumber_of_sets = (text) => {
      this.setState({ Number_of_sets: text })
   }
   submit = (Workout_name) => {
      alert('Workout_name: ' + Workout_name + ' a été crée avec succès')
   }

     render() {
       // on va créer un tableau de mouvements
     var Mouvements = [];
     	for(let i = 0; i < this.state.Number_of_moves; i++){

		Mouvements.push(
			<View key = {i}>
				<Mouvement/>
        </View>
		)}
	
      return (
         <ScrollView>
        <View style = {styles.container} id ="root">
          <Text style ={styles.title}> New HIIT Circuit </Text>

          <View style= {styles.Workout_name}>
            <Text style={styles.title2}>Workout name: </Text>
              <TextInput type="Text" style = {styles.input_name}
                underlineColorAndroid = "transparent"
                placeholder = "name"
                autoCapitalize = "none"
                onChangeText = {this.handleWorkout_name}/>
            </View>

            <View style= {styles.Number_of_moves}>
              <Text style={styles.title2}>Number of moves: </Text>
                <TextInput type="Text" style = {styles.input_number}
                  underlineColorAndroid = "transparent"
                  placeholder = "Number"
                  autoCapitalize = "none"
                  onChangeText = {this.handleNumber_of_moves}/>
            </View>

            <View style= {styles.Number_of_sets}>
             <Text style={styles.title2}>Number of sets: </Text>
              <TextInput type="Text" style = {styles.input_number}
                underlineColorAndroid = "transparent"
                placeholder = "Number "
                autoCapitalize = "none"
               
                onChangeText = {this.handleNumber_of_sets}/>

           </View>
          
         
          {Mouvements.map(function(m, i) {
      return <Text key={'Mouvement-' + i} style={styles.mouv_nbr} >
          {m}{i+1}
          
          
          </Text>
})}


            
    
            <Button title="valider" tyle = {styles.submitButton} onPress ={this.Submit} />
            
           

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
    marginTop:25,
    color: '#193F92',
    
  },
  
   container: {
      paddingTop: 23,
      backgroundColor: '#09264B',
      justifyContent: 'center',
      marginTop: 50,
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
    display: "flex"
   },
    Number_of_sets :{
    display: "flex",
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
     display: "flex",
   }
  
})

