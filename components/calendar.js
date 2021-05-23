
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ActivityIndicator } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo } from '../ApiEndpoints';

export default function Calendar(){ 
let today = moment(); 
let day = today.clone().startOf('month');
let [customDatesStyles,setCustom] = React.useState([]); 
 
const [loading,setLoading]=React.useState(true); 
 const[i_date,setInitialdate]=React.useState(new Date())
//  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
//  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

//  const onDateChange = (date, type) => {
//   //function to handle the date change
//   if (type === 'END_DATE') {
//     setSelectedEndDate(date);
//     console.log(selectedEndDate);
//   } else {
//     setSelectedEndDate(null);
//     setSelectedStartDate(date);
//     console.log(selectedStartDate)
//   }
// }; 
   
  React.useEffect(()=>{
    localStorage.setItem("calendarLoaded","false")
            let temp=[];
            let count =0;
            
            fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.calendarEndpoint,{
              "year": String(new Date(i_date).getFullYear()),
              "month":String(new Date(i_date).getMonth()+1)
            }
            ) ,
            {
            method :'GET',
            headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
            'accept':'application/json',
            'content-type':'application/json',

            },


            }
            )
            .then(response => response.json())
            .then(json => {  
                            if(json.success)
                            {  
                             for(let i=0;i<Object.keys(json.data.attendence.details).length;i++){ 
                            json.data.attendence.details[i+1].status=="P"
                              
                            ?
                                
                                customDatesStyles.push({
                                  date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                  style: {backgroundColor: '#a6d608'},
                                
                                  textStyle: {color: 'black'} 

                                })
                            
                            :
                              ( json.data.attendence.details[i+1].status=="A"
                                
                                ?
                                    customDatesStyles.push({
                                      date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                      style: {backgroundColor: '#f0e130'},
                                    
                                      textStyle: {color: 'black'} 
                  
                                    })
                                
                                : ( json.data.attendence.details[i+1].weekend=="yes"
                                
                                    ?
                                        customDatesStyles.push({
                                          date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                          style: {backgroundColor: '#c40233'},
                                        
                                          textStyle: {color: 'white'} 
                      
                                        })
                                    
                                      :
                                        ( json.data.attendence.details[i+1].holiday=='yes' 
                                          
                                          ?
                                            
                                              customDatesStyles.push({
                                                date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                                style: {backgroundColor: '#ace5ee'},
                                              
                                                textStyle: {color: 'black'} 
                            
                                              })
                                          :
                                            
                                            ( json.data.attendence.details[i+1].status=='H'
                                            
                                            ?
                                           
                                              customDatesStyles.push({
                                                date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                                style: {backgroundColor: '#ffc0cb'},  //ace5ee normal days
                                              
                                                textStyle: {color: 'black'} 
                            
                                              })

                                           :
                                              ( json.data.attendence.details[i+1].status=='L'
                                                
                                              ?
                                              
                                                  customDatesStyles.push({
                                                    date: moment(i_date).startOf('month').add(i,'day').clone(), 
                                                    style: {backgroundColor: '#ff7f50'},  //ace5ee normal days
                                                  
                                                    textStyle: {color: 'black'} 
                                
                                                  })
                                              :
                                              null
                                      
                                              )
                                              
                                              
                                            )

                                          
                                        )
                                      
                                  
                                  )

                              )
                                i==(Object.keys(json.data.attendence.details).length-1)?( setLoading(false),localStorage.setItem("calendarLoaded","true")):null
                              , console.log(loading)
                             }
                            }
                             
                          }
                 )
          })
              
 
  return (
  
  
    loading?<ActivityIndicator style={{marginTop:responsiveHeight(40),marginBottom:responsiveHeight(40)}}/>:
    <View style={{marginBottom:responsiveHeight(2),marginTop:responsiveHeight(2), backgroundColor:'#fff',alignSelf:'center', width:responsiveWidth(25),borderRadius:5}} >
    <CalendarPicker
      todayTextStyle={{fontWeight: 'bold',color:'white'}}
      todayBackgroundColor={'purple'}
      initialDate={i_date} 
      minDate={new Date(`${new Date().getFullYear()-1}/01/01`)}
     
      allowRangeSelection
    
    //  onDateChange={onDateChange}
      onMonthChange={(date)=>{ setInitialdate(new Date(date)),setLoading(true)  }} 
      width={responsiveWidth(25)}
      height={responsiveHeight(60)}
      customDatesStyles={ customDatesStyles}
      
    /> 
    </View>
    
  )

}