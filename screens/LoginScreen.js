import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{
        const sub=auth.onAuthStateChanged((authUser)=>{
            // console.log('user---->',authUser)
            if(authUser){
                navigation.replace('Home')
            }
        })
        return sub
    },[])
    const signIn=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch(err=>alert(err.message))
    }
  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={styles.container}>
        <StatusBar style='light'/>
        <Image
        style={{width:200,height:200}}
        source={{uri:'https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Signal-Messenger-Icon-900x0.png'}} 
        />
        <View style={styles.inputContainer}>
            <Input placeholder='Email'
            autoFocus
            textContentType='emailAddress'
            value={email}
            onChangeText={(text)=>setEmail(text)}
             />
            <Input placeholder='Password'
            secureTextEntry
            textContentType='password'
            value={password}
            onChangeText={(text)=>setPassword(text)}
            onSubmitEditing={signIn}
            />
        </View>
        <Button
        onPress={signIn}
         containerStyle={styles.button} title='Login' />
        <Button
        onPress={()=>navigation.navigate('Register')}
         containerStyle={styles.button} title='Register' type='outline'/>
        <View style={{height:100}}></View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    }
})