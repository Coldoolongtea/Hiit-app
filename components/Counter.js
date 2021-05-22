import React, { Component } from 'react'
import { Text, View, Button, Animated, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


function Counter(){ 

  const [isPlaying, setIsPlaying] = React.useState(true)
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={30}
        colors={[
          ['#6142B7', 0.4],
          ['#2C2085', 0.4],
          ['#1E177F', 0.2],
        ]}
        onComplete={() => [true]}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
    <Button title="Pause" onPress={() => setIsPlaying(prev => !prev)}/>
  </View>
  )
      }


    const styles = StyleSheet.create({
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
});

export default Counter