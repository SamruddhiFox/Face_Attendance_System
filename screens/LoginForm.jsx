import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginInput from '../components/LoginInput'
import Title from '../components/Title'

const LoginForm = ({navigation}) => {
    const handleNavigation = () => {
        navigation.navigate('Attendance')
      };
  return (
    <View style={styles.container}>
        <Title/>
      <LoginInput onPress={handleNavigation}/>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column', // Set to 'column' for vertical layout
        justifyContent: 'center',
        alignItems:'center', 
        backgroundColor:'#ffd966'
    }
})