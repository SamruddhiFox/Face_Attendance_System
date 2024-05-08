import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MonthDropdown = () => {
  const [selectedReason, setSelectedReason] = useState("Reason"); // Select the reason
  const [isOpen, setIsOpen] = useState(false); // Track dropdown state
  const [data, setData] = useState([]); // Store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://attendance-api.foxberry.live/v1/reasons/getReason'); // Replace with your API endpoint
        const fetchedData = await response.json();
        console.log('The reasons are as follows',fetchedData.data);
        setData(fetchedData.data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle fetching errors (optional)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures fetching data only once
  
console.log('the data is',data);
  
  const handleSelect = (data) => {
    console.log('The index is',data.reason);
    setSelectedReason(data.reason);
    setIsOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <View style={{ marginTop:'3%'}}>
      
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        
        <Text style={styles.dropdownValue}>
         {selectedReason}
        </Text>
        <MaterialCommunityIcons
          name={isOpen ? 'chevron-down' : 'chevron-up'}
          size={22}
          color="black"
        />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.dropdownList}>
          {data.map((data,index) => (
            <ScrollView>
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(data)}>
                <Text style={styles.dropdownItemText}>{data.reason}</Text>
              </TouchableOpacity>
            </ScrollView>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    width:'70%',
    height:'27%',
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    borderBottomWidth:2,
  },
  dropdownValue: {
    
     
  },

  dropdownList: {
    width: 250,
    position: 'absolute',
    zIndex: 2,
    top: 30, // Adjust based on button height
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 5,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default MonthDropdown;
