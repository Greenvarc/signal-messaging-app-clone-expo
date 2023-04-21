import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import {AntDesign,Ionicons,FontAwesome} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import * as firebase from 'firebase'
import { db,auth } from '../firebase'

const ChatScreen = ({navigation,route}) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage=()=>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
        })
        setInput('')
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chat',
            headerBackTitleVisible:false,
            headerTitleAlign:'left',
            headerTitle:()=>(
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <Avatar rounded source={{
                        uri:messages[0]?.data.photoURL||'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
                    }}/>
                    <Text
                    style={{color:'white' ,marginLeft:10,fontWeight:'700'}}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
                
            )
        })
    },[navigation,messages])
    useLayoutEffect(()=>{
        const sub=db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            }))
        ))
        return sub
    },[route])
  return (
    <SafeAreaView
    style={{flex:1,backgroundColor:'white'}}
    >
        <StatusBar style='light' />
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS==='ios'?'padding':'height'}
      keyboardVerticalOffset={130}
      
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
            <ScrollView contentContainerStyle={{
                paddingTop:15,

            }}>
                {/* chats ... */}
                {messages.map(({id,data})=>(
                    data.email ===auth.currentUser.email?(
                        <View key={id} style={styles.receiver}>
                            <Avatar
                                size={30} 
                                rounded
                                //web 
                                containerStyle={{
                                    position:'absolute',
                                    bottom:-15,
                                    right:-5
                                }}
                                position='absolute'
                                bottom={-15}
                                right={-5}
                                source={{uri:data.photoURL}}
                             />
                             <Text style={styles.revelerText}>{data.message}</Text>
                        </View>
                    ):(
                        <View key={id} style={styles.sender}>
                            <Avatar
                                size={30} 
                                rounded
                                //web 
                                containerStyle={{
                                    position:'absolute',
                                    bottom:-15,
                                    right:-5
                                }}
                                position='absolute'
                                bottom={-15}
                                right={-5}
                                source={{uri:data.photoURL}} 
                             />
                             <Text style={styles.senderText}>{data.message}</Text>
                             <Text style={styles.senderName}>{data.displayName}</Text>
                        </View>
                    )
                ))}

            </ScrollView >
            <View style={styles.footer}>
                <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={(text)=>setInput(text)}
                placeholder='Signal Message'
                onSubmitEditing={sendMessage}
                 />
                <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}>
                    <Ionicons name='send' size={24} color='#2868e6' />
                </TouchableOpacity>
            </View>
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    receiver:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:'#286836',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative',
    },
    revelerText:{
        color:'black',
        fontWeight:'500',
        marginLeft:10,
    },

    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        justifyContent:'space-between'
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ececec',
        padding:10,
        color:'gray',
        borderRadius:30,
    },
})