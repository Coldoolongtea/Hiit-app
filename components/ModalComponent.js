import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const widowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'


const ModalComponent = ({ isVisible, setIsVisible, user, loadEvents }) => {
  const [workoutTitle, setWorkoutTitle] = useState(null)
  const [workoutDescription, setWorkoutDescription] = useState(null)
  const [workoutEquipment, setWorkoutEquipment] = useState(null)
  const [workoutType, setWorkoutType] = useState('ABS')
  const [workoutDuration, setWorkoutDuration] = useState(null)

  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitEventHandler = async () => {
    const localUri = image;
    const filename = localUri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename)
    const type = match ? `image/${match[1]}` : `image`;

    const data = new FormData()

    data.append('thumbnail', { uri: localUri, name: filename, type })
    data.append('title', workoutTitle)
    data.append('description', workoutDescription)
    data.append('equipment', workoutEquipment)
    data.append('workoutType', workoutType)
    data.append('workoutDuration', workoutDuration)


    try {
      await fetch(`http://localhost:8080/api/event`, {
        method: 'POST',
        body: data,
        headers: { user: user }
      })
      loadEvents()
      cancelEventHandler()
    } catch (error) {
      console.log('🚀 -------------------------------------------------------------------------')
      console.log('🚀 ~ file: ModalComponent.js ~ line 60 ~ submitEventHandler ~ error', error)
      console.log('🚀 -------------------------------------------------------------------------')

    }
  }


  const cancelEventHandler = () => {
    setIsVisible(!isVisible)
    setImage(null)
    setWorkoutTitle(null)
    setWorkoutDescription(null)
    setWorkoutType('Running')
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsVisible(!setIsVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.form}>
            <View>

              {image ? <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.loadedImage} />
              </TouchableOpacity> :
                <TouchableOpacity
                  style={styles.addImage}
                  onPress={pickImage}
                >
                  <MaterialIcons name="add-a-photo" size={56} color="black" />
                </TouchableOpacity>}
            </View>
            <View>
              <Text style={styles.label}>Workout Title:</Text>
              <TextInput style={styles.input} placeholder={"Enter name"} autoCapitalize='none' autoCorrect={false} value={workoutTitle} onChangeText={text => setWorkoutTitle(text)} />
              <Text style={styles.label}>Equipment:</Text>
              <TextInput style={styles.input} placeholder={"Enter your equipments"} autoCapitalize='none' autoCorrect={false} value={workoutEquipment} onChangeText={text => setWorkoutEquipment(text)} />
              <Text style={styles.label}>Description:</Text>
              <TextInput style={styles.input} placeholder={"Add Description"} autoCapitalize='none' autoCorrect={false} value={workoutDescription} onChangeText={text => setWorkoutDescription(text)} />
              <Text style={styles.label}>Duration:</Text>
              <TextInput style={styles.input} placeholder={"How many minutes?"} autoCapitalize='none' autoCorrect={false} value={workoutDuration} onChangeText={text => setWorkoutDuration(text)} />
            </View>
            <View>
            <Text style={styles.label}>Type: {workoutType}</Text>
              <Picker mode={"dialog"} style={styles.sportPicker} selectedValue={workoutType} onValueChange={value => setWorkoutType(value)}>
                <Picker.Item label={'ABS'} value={'ABS'} />
                <Picker.Item label={'Back'} value={'Back'} />
                <Picker.Item label={'Legs'} value={'Legs'} />
              </Picker>
            </View>
            {/* <View>
              <Text style={styles.label}>Type: {eventSport}</Text>
              <Picker mode={"dialog"} style={styles.sportPicker} selectedValue={eventSport} onValueChange={value => setEventSport(value)}>
                <Picker.Item label={'1'} value={1} />
                <Picker.Item label={'2'} value={2} />
                <Picker.Item label={'3'} value={3} />
              </Picker>
            </View> */}
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={submitEventHandler}
          >
            <Text style={styles.textStyle}>Add Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={cancelEventHandler}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    height: windowHeight,
    width: widowWidth,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  form: {
    alignSelf: "stretch",
    marginTop: 16
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: "bold",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000000',
    fontWeight: "400",
    height: 44,
    shadowColor: '#000000',
    marginBottom: 15,
    borderRadius: 4
  },
  primaryBtn: {
    height: 42,
    width: '100%',
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10
  },
  secondaryBtn: {
    height: 42,
    width: '100%',
    backgroundColor: '#f04a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 10
  },
  addImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    width: '100%',
    height: 150
  },
  loadedImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportPicker: {

  }
});

export default ModalComponent;