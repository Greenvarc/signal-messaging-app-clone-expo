import { View, KeyboardAvoidingView, StyleSheet, StatusBar } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { Button, Input, Text } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:'Back to login'
        })
    },[navigation])

    const register=()=>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
                authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
            })
        }).catch(err=>alert(err.message));
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={styles.container}>
        <ExpoStatusBar style='light' />
        <Text h3 style={{marginBottom:50}}>
            Create a Signal Account
        </Text>
        <View style={styles.inputContainer}>
            <Input
                value={name}
                onChangeText={(text)=>setName(text)}
                placeholder='Full Name' 
                autoFocus 
                textContentType='text' 
            />

            <Input
                value={email}
                onChangeText={(text)=>setEmail(text)}
                placeholder='Email'
                textContentType='emailAddress' 
            />

            <Input
                value={password}
                onChangeText={(text)=>setPassword(text)}
                placeholder='Password'
                textContentType='password'
                secureTextEntry
            />

            <Input
                value={imageUrl}
                onChangeText={(text)=>setImageUrl(text)}
                placeholder='profile picture url (optional)'
                textContentType='URL'
                onSubmitEditing={register}
            />
        </View>
        <Button 
        containerStyle={styles.button}
        raised
        title='Register'
        onPress={register}
        />
        <View style={{height:100}}></View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    },
})