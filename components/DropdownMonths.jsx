import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MonthDropdown = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [isOpen, setIsOpen] = useState(false); // Track dropdown state

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleSelect =  async month => {
    setSelectedMonth(month);
    setIsOpen(false); // Close dropdown after selection
    // Perform post operation
    try {
      const response = await fetch(`https://attendance-api.foxberry.live/v1/attendance/getUserAttendanceForMonth`, { // Replace with your API endpoint
        method: 'POST', // Adjust HTTP method if needed
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: '8000501715101764815', month:month }), // Include selected month in body
      });

      if (response.ok) {
        const responseData = await response.json();
        setAttendanceData(responseData);
      } else {
        setError(response.statusText); // Or handle error response codes
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <View style={{marginLeft: '7%', marginTop: '3%'}}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <MaterialCommunityIcons name="calendar-check" size={22} color="black" />
        <Text style={styles.dropdownValue}>
          {monthNames[selectedMonth - 1]}
        </Text>
        <MaterialCommunityIcons
          name={isOpen ? 'chevron-down' : 'chevron-up'}
          size={22}
          color="black"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          {monthNames.map((month, index) => (
            <ScrollView>
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(index + 1)}>
                <Text style={styles.dropdownItemText}>{month}</Text>
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
    width: 150,
    height: 29,
    flexDirection: 'row',
    alignContent: 'space-evenly',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
  },
  dropdownValue: {
    marginHorizontal: '10%',
  },

  dropdownList: {
    width: 150,
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
