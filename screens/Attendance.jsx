import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AttendanceTable from '../components/AttendanceTable';
import Dropdownheader from '../components/Dropdownheader';

const Attendance = () => {
  
  return (
    <View style={styles.container}>
      <Dropdownheader />
      
      <AttendanceTable />
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
