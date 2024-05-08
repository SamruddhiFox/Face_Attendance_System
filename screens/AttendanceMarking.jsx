import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Clock from '../components/LiveTimeTracking';
import ReasonDropdown from '../components/DropdownReasons';
import TakePhoto from '../components/TakePhoto';
//import SelfieCamera from '../components/Camera';

const AttendanceMarking = ({navigation}) => {
  const navigateToAttandance = () => navigation.navigate('Photoscreen');
  return (
    <View style={styles.container}>
      <Clock />
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
        <ReasonDropdown />
        <TakePhoto onPress={navigateToAttandance} />
      </View>
    </View>
  );
};

export default AttendanceMarking;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
