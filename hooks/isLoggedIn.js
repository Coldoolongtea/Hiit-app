import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLoggedIn = () => {

    console.trace("isLoggedIn ...")

    const [user, setUser] = useState(null)
    const [user_id, setUserId] = useState(null)

    useEffect(() =>{
        const getData = async () => {
          try {
            const user = await AsyncStorage.getItem('user')
            const user_id = await AsyncStorage.getItem('user_id')
    
            if(user !== null && user_id !== null) {



              setUser(user)
              setUserId(user_id)
            }
          } catch(e) {
            console.log('Error. Something has went wrong!, line 19, isLoggedIn.js')
          }
        }
    
        getData()

      }, [user, user_id])

      return [user, user_id];
};

export default isLoggedIn;