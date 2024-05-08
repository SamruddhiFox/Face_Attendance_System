import { StyleSheet, Text, View,TouchableOpacity, onPress } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

const TakePhoto = ({onPress}) => {
  return (
    <View style={{ width:'15%',height:'37%',justifyContent:'center',alignItems:'center',backgroundColor:'#ffe599',borderRadius:85}}>
     <TouchableOpacity onPress={onPress} style={{flexDirection:'row'}}>
     <MaterialCommunityIcons name="camera" size={22} color="black" style={{position:'absolute',bottom:-20,right:-10}} />
     <MaterialCommunityIcons name="account-circle" size={30} color="black" style={{zIndex:2}}/>
     </TouchableOpacity>
    </View>
  )
}

export default TakePhoto

const styles = StyleSheet.create({})