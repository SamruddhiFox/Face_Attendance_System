import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MonthDropdown from './DropdownMonths';

const Dropdownheader = () => {
  return (
    <View style={styles.container}>
      <MonthDropdown />
      
    </View>
  );
};

export default Dropdownheader;

const styles = StyleSheet.create({
  container: {

    width:'100%',
    height:'7%',
    backgroundColor: '#eeeeee',
    
  },
});
