import React from 'react';
import { View } from 'react-native';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from './screens/LoginForm';
import Attendance from './screens/Attendance';
import AttendanceMarking from './screens/AttendanceMarking';
import PhotoScreen from './components/Camera';
import MarkAttendance from './components/MarkAttendance';
const Stack = createNativeStackNavigator();
import { Alert } from 'react-native';

const App = () => {
  return (
    <View style={{flex:1}}>
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{
            headerShown: true,
            headerRight: () => (
             <MarkAttendance/>
            ),
          }}
        />
        <Stack.Screen
          name="MarkAttendance"
          component={AttendanceMarking}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Photoscreen"
          component={PhotoScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};



export default App;
