import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {AntDesign,SimpleLineIcons,Icon} from '@expo/vector-icons'
import { Button, Input } from '@rneui/base'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState('')
    const createChat=async()=>{
        await db.collection('chats').add({
            chatName:input,
        }).then(()=>{
            navigation.replace('Home')
        }).catch((err)=>alert(err))
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add a new Chat',
        })
    },[])

  return (
    <View style={styles.container}>
      <Input 
      placeholder='Enter a chat name'
      value={input}
      onChangeText={(text)=>setInput(text)}
      leftIcon={
        <AntDesign name='wechat' size={24} color='black' />
      }
      onSubmitEditing={createChat}
      />
      <Button
      disabled={!input}
      onPress={createChat} 
      title='create new chat'
      />
    </View>
  )
}

export default AddChatScreen

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:30,
        height:'100%'
    }
})