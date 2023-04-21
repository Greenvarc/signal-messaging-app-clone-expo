import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { auth,db } from '../firebase'
import CustumListsItem from '../components/CustumListsItem'
import { Avatar } from '@rneui/base'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])
    useEffect(()=>{
        const sub=auth.onAuthStateChanged((authUser)=>{
            if(!authUser){
                navigation.replace('Login')
            }
        })
        return sub
    },[navigation])

    const signOutUser=()=>{
        auth.signOut()
        .then(()=>{
            navigation.replace('Home')
        })
    }

    useEffect(()=>{
        const sub=db.collection('chats')
        .onSnapshot(snaphot=>(
            setChats(snaphot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        ))
        return sub
    },[])
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Signal',
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black' ,//header icons 
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity
                    onPress={signOutUser}
                     activeOpacity={0.5}>
                        <Avatar  rounded source={{uri:auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=><View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                width:80,
                marginRight:10,
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name='camerao' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>navigation.navigate('AddChat')}
                 activeOpacity={0.5}>
                    <SimpleLineIcons name='pencil' size={24} color='black' />
                </TouchableOpacity>
            </View>
            
        })
    },[])
    const enterChat=(id,chatName)=>{
        navigation.navigate('Chat',{
            id:id,
            chatName:chatName,
        })
    }

  return (
    <SafeAreaView>
      <ScrollView
      style={styles.container}
      >
        {chats.map(({id,data:{chatName}})=>(
        <CustumListsItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
    container:{
        height:'100%'
    }
})