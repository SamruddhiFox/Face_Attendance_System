import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
  return (
    <View>
      <Text style={styles.title}>Attendance Tracking</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title:{
        color:'black',
        fontWeight:'bold',
        fontSize:30
    }
})