 
import { useEffect, useState } from 'react';


const DateOfTodayForApi = ({containerStyle,textStyle}) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
     year  + '/' + month + '/' +  date
         );
  },[]);

return( 
      {currentDate}
     )
}
export default DateOfTodayForApi;
