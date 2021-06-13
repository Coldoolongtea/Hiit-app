import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Circuit2 from './Circuit2'
import Feed from './feed'
import Counter from './Counter'
import ModalComponent from './ModalComponent'
import MyWorkout from './MyWorkout';


const Tab = createMaterialBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#ffffff"
      barStyle= {{ backgroundColor: '#2D2283' }}
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#2D2283' }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Discovery page',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="earth" color={color} size={23} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={MyWorkout}
        options={{
          tabBarLabel: 'My workouts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={23} />
          ),
        }}
      />
            <Tab.Screen
        name="Create"
        component={Circuit2}
        options={{
          tabBarLabel: 'Create a workout',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}




export default MyTabs
