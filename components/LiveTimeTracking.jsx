import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }); // Format time (adjust format as needed)

  return (
    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#ffe599', flexDirection:'row'}}>
     <MaterialCommunityIcons name="timetable" size={22} color="black" />
      <Text style={{fontSize: 27}}>{formattedTime}</Text>
    </View>
  );
};

export default Clock;
