import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


const DateOfToday = ({containerStyle,textStyle}) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      date + '/' + month + '/' + year 
         );
  },[]);

return(
  <View style={containerStyle}>
    <Text style={textStyle} >
      {currentDate}
    </Text>
  </View>
)
}
export default DateOfToday;
