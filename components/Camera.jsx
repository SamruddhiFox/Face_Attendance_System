// /* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image,Modal,Text} from 'react-native';
import {StyleSheet, ActivityIndicator, Linking} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';


const PhotoScreen = () => {
  const navigation = useNavigation();
    const addAttendance = ()=>{
      performPostOperation();
      alert(`Attendance marked  at time ${formattedTime} and ${capturedImage}`);
      

    }
    // Navigate to attendance table
    const navigateToAttandance = () => navigation.navigate('Attendance');
    // console.log('captured image',capturedImage);
    
 // Set modal
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [capturedImage, setCapturedImage] = useState([]);
 const [postResponse, setPostResponse] = useState(null); // State for post response


  const [flashtoggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const [torch, setTorch] = useState('off');
  const devices = useCameraDevices();
//Live timetracking
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  /*const intervalId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000); // Update time every second

  return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
  */
}, []);

const formattedTime = currentTime.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
}); // Format time (adjust format as needed)


  // On press of the button it must perform post operation
  const performPostOperation = async () => {
    console.log("captured Image",capturedImage)
    try {
      const response = await fetch('https://attendance-api.foxberry.live/v1/attendance/makeUpdateTodayAttendanceForUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userId" : "8000501715101764815",  // valid user id, Note: only one entry exist for each user on a single day                                          // each subsequent request updates pictureURL array(second image and attendanceOut time only
          "pictureURL" : capturedImage,
          "latitude" : "10.24556",
          "longitude" : "45.48565",
          "reason" : "Product requirement meeting at client location",   // A valid reason from reason model
          "currentTime": formattedTime
      }),
      });
      const data = await response.json();
      console.log(data);
      console.log(data.data.pictureURL);
      setCapturedImage(data.data.pictureURL);
      if (response.status === 200) {   
       
       // setPostResponse(data); // Update state with response data
       // console.log('Post response:', postResponse);
        alert(`${postResponse.data.pictureURL[0]}`);
        navigateToAttandance();
      } else {
        console.error('Error:', response.statusText);
        setPostResponse({ error: 'Post operation failed' }); // Set error message
      }

      
    } catch (error) {
      console.error('Error performing post operation:', error);
      setPostResponse({ error: 'An error occurred' }); // Set error message in state
    }
  };
 

  const device = camView === 'back' ? devices[1] : devices[0];
  // const device = flipCamera ? 

  const cameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setLoading(devices);
  }, [devices]);

  const retakePicture = () => {
    setCapturedImage(null);
    setIsModalOpen(false); // Close modal before retake
  }

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices]);

  const takePhoto = async () => {
    
    try {
      //Error Handle better
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      }

      console.log('Photo taking ....');
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
      });
      console.log(photo);
      
      if(photo.path)
        {
          setIsModalOpen(true)
          setCapturedImage([photo.path]);
        }
      
    } catch (error) {
      console.log(error, 'kkkk');
    }
  };
 // console.log(device)

  if (device == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        photo={true}
        isActive={true}
        ref={cameraRef}
      />

      <View style={styles.shutterContainer}>
        <TouchableOpacity
          style={styles.cameraFlashBtn}
          onPress={() => {
            setFlashToggle(!flashtoggle);
            torch === 'off' ? setTorch('on') : setTorch('off');
          }}>
          <Image source={require('../assets/Flashh.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            takePhoto();
          }}>
          <View style={styles.shutter}>
            <View style={styles.shutterBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraFlipBtn}
          onPress={() => {
            camView === 'back' ? setCamView('front') : setCamView('back');
          }}>
          <Image source={require('../assets/Flipp.png')} />
        </TouchableOpacity>
        {/* The modal should display the image */}
        <Modal visible={isModalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: `file://'${capturedImage}`}} style={styles.capturedImage} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePicture} >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addAttendance} >
              <Text style={styles.buttonText}>Mark Attendance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  close: {
    position: 'absolute',
    left: 0,
  },
  shutterContainer: {
    height: '100%',
    width: '100%',
    top: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: 'white',
  },
  shutterBtn: {
    top: 1,
    left: 0.75,
    backgroundColor: 'white',
    height: 54,
    width: 54,
    borderRadius: 55,
  },
  cameraFlipBtn: {
    position: 'absolute',
    right: '20%',
  },
  cameraFlashBtn: {
    position: 'absolute',
    left: '20%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#ffe599',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain', // Adjust resize mode as needed
  }

});