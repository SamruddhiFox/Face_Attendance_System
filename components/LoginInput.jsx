import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginInput = ({onPress}) => {
  // input values
  const [employeeId, setEmployeeId] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState('');
  const [loader,setLoader] = useState(false)

  // Post method after pressing the Login button
  const handlePostRequest = async () => {
    try {
        setLoader(true)
      const headers = {
        'Content-Type': 'application/json', // Set content type for JSON data
      };
      const body = JSON.stringify({
        "empCode": employeeId,
        "password": password,
      }); // Include token in request body

      const response = await fetch(
        'https://attendance-api.foxberry.live/v1/users/login',
        {
          method: 'POST',
          headers,
          body,
        },
      );
     // console.log(response);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      if(responseData.status === 200){
        console.log(`Response is a follows in JSON format`,responseData);
        // Tha value of token is 
        console.log(`the value of token is`,responseData.data.token);
        setErrorMessage({});
        setEmployeeId(null);
        setPassword(null);
      setResponse(responseData.data.token);

    onPress()
  await  AsyncStorage.setItem("userToken",responseData.data.token)
   await AsyncStorage.setItem("user",JSON.stringify(responseData.data.user))
    setLoader(false)

      }
      console.log('API Response:', response); // Log response for debugging (optional)
    } catch (error) {
      setLoader(false)
      console.error('Error:', error); // Log error for debugging
      setError(error.message || 'An error occurred.'); 
      // Set user-friendly error message
    } finally {
      setIsLoading(false); 
      setLoader(false)
      // Hide loading indicator
    }
  };

  // Onchange values for input
  const handleEmployeeId = text => setEmployeeId(text);
  const handlePasswordChange = text => setPassword(text);

  // Validations to be performed on submit
  const validateForm = () => {
    const errors = {};
    if (!employeeId) {
      errors.employeeId = 'EmployeeId is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Navigate to the attendance screen
      handlePostRequest();
    //   onPress();
    }
  };

  // Simulate login logic (replace with your actual authentication method)
  console.log(`Username: ${employeeId}, Password: ${password}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Employee Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee Id"
        value={employeeId}
        onChangeText={handleEmployeeId}
      />
      {errorMessage.employeeId && (
        <Text style={styles.error}>{errorMessage.employeeId}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry // Hide password characters
      />
      {errorMessage.password && (
        <Text style={styles.error}>{errorMessage.password}</Text>
      )}
        {
            loader ? <View>
                <ActivityIndicator />
                <Text>Please wait for login...</Text>
                </View> : <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        }
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    width: 350,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eeeeee',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 300,
    backgroundColor: '#ffd966',
    borderRadius: 7,
  },
});
