import React, { Component } from 'react'
import Constants from 'expo-constants';
import { Text, View, Button, Animated, StyleSheet, ScrollView} from 'react-native';

function Feed() {
  return (
    <ScrollView style={styles.container}>
        <View  nativeID ="root">
          <Text style ={styles.title}> Discovery Page </Text>

         </View>
            </ScrollView>
  )

  }

const styles = StyleSheet.create({

  title:{
    fontSize:22,
    marginBottom:10,
    marginTop:45,
    color: '#193F92',
    
  },
  
  container: {
    flex: 1,
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#01233E',
    padding: 8,
  },
  })

export default Feed
