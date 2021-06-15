import './config.js';
import React from 'react';
import { StyleSheet, LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/Login';
import SignUp from './components/SignUp';
import MyTabs from './components/Mytabs';
import Counter from './components/Counter';

LogBox.ignoreAllLogs(['Warning: ... '])
LogBox.ignoreAllLogs()

export default function App() {
  const Stack = createStackNavigator()
  return (
    //On définit ici notre systeme de navigation
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Mytabs" component={MyTabs}/>
        <Stack.Screen name="Counter" component={Counter}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    position: 'absolute',
    top: 50
  },
  text: {
    color: 'green'
  }
});
