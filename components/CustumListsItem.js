import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/base'
import { db } from '../firebase'

const CustumListsItem = ({id,chatName,enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])
    useEffect(()=>{
        const onsub=db.collection('chats').doc(id).collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>
        setChatMessages(snapshot.docs.map((doc)=>doc.data())))

        return onsub
    },[])

  return (
    <TouchableOpacity activeOpacity={0.3}>
    <ListItem key={id}
    onPress={()=>enterChat(id,chatName)} 
    bottomDivider
    >
      <Avatar 
      rounded
      //chatMessages?.[0]?.photoURL||
      source={{uri:chatMessages?.[0]?.photoURL
        || 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'}}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight:'800'}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
  )
}

export default CustumListsItem