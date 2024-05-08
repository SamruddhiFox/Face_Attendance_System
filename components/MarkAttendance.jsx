import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const MarkAttendance = () => {
    const navigation = useNavigation();
    const navigateToAttandance = () => navigation.navigate('MarkAttendance');
    return (
        <View>
            <TouchableOpacity onPress={navigateToAttandance} style={styles.markAttendance}>
            <MaterialCommunityIcons name="calendar-account" size={22} color="black" />
             
            </TouchableOpacity>
            
            

        </View>
    )
}

export default MarkAttendance

const styles = StyleSheet.create({
    markAttendance:{
        marginTop:20,
        width:35,
        height:35,
        backgroundColor:'#ffd966',
        elevation:10,
        justifyContent:'center',
        alignItems:'center'
    }
})