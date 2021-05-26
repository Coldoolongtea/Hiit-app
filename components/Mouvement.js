import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Form,Label, } from 'react-native'

class Mouvement extends Component {
   state = {
      Mouvement_name: '',
      Duration: '',
      Rest_Duration: '',
   }

   

   handleMouvement_name = (text) => {
      this.setState({ Mouvement_name: text })
   }
   handleDuration = (integer) => {
      this.setState({ Duration: integer })
   }
    handleRest_Duration = (integer) => {
      this.setState({ Rest_Duration: integer })
   }
   componentDidUpdate = () => {
      
      this.props.handleCallback(this.state,this.props.index);
   }
  
   render() {
     
      return (
        <View style = {styles.container}>
         <Text style ={styles.Mouvement}> Mouvement </Text>

          <View style= {styles.Mouvement_name}>
            <Text style={styles.title2}>Mouvement name: </Text>
              <TextInput type="text" style = {styles.input_name}
                underlineColorAndroid = "transparent"
                placeholder = "name"
               /* placeholderTextColor = "#9a73ef"*/
                autoCapitalize = "none"
                onChangeText = {this.handleMouvement_name}
                
                />

            </View>

            <View style= {styles.Duration}>
            <Text style={styles.title2}>Duration: </Text>
              <TextInput type="text" style = {styles.input_number}
                underlineColorAndroid = "transparent"
                placeholder = "duration"
               /* placeholderTextColor = "#9a73ef"*/
                autoCapitalize = "none"
                onChangeText = {this.handleDuration}/>
            </View>

            <View style= {styles.Rest_Duration}>
            <Text style={styles.title2}>Rest Duration: </Text>
              <TextInput type="text" style = {styles.input_number}
                underlineColorAndroid = "transparent"
                placeholder = "duration"
               /* placeholderTextColor = "#9a73ef"*/
                autoCapitalize = "none"
                onChangeText = {this.handleRest_Duration}/>
            </View>

            
        </View>
      )
   }
}
export default Mouvement

const styles = StyleSheet.create({

  Mouvement:{
    fontSize:22,
    marginBottom:10,
    marginTop:25,
    color: '#193F92',
    borderTopWidth:3,
    borderColor:'#19928F'
  },
   Duration :{
    display: "flex"
   },
   Rest_Duration :{
    display: "flex"
   },
   container: {
      paddingTop: 23,
      backgroundColor: '#09264B',
      justifyContent: 'center',
      marginTop: 50,
       padding: 20,
    
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
      marginLeft:0,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderRadius:12,
      width:70,
      shadowRadius:20,
      padding:7,
      color: '#19928F',
   },

    title2:{
     fontSize:15,
     marginTop:15,
     color:'#A1A2AC',
     
   },
   
})
