
//import Timepicker from '../../../../components/timepicker'
import DateFnsUtils from '@date-io/date-fns';
import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, CheckBox, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router-dom';
import withQuery from 'with-query';
import * as Yup from 'yup';
import { ApiInfo } from '../../../ApiEndpoints';
import FormButton from '../../../components/FormButton';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { StatusPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/Status';
import { StaticWordsWeb } from '../../staticwordsFile';


// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
// const FormButton=React.lazy(()=>import ('../../../components/FormButton'));
// const Demo=React.lazy(()=>import ('../../demo'));
 

  

function updateState(selectedItem){
  this.setState({selectedItem});
  
  
}
//const db = SQLite.openDatabase('db.testDb1')

var selected_project_is_null=false;

export default function EnterStatusWeb(){

  const history=useHistory();
const flatList = React.useRef(null)
 
  const count=0;
  const [checked,setChecked]=useState(false) ;

  const date_obj1=new Date();
  const date_obj2=new Date();
  
  date_obj1.setHours(9),date_obj1.setMinutes(0);
  date_obj2.setHours(9),date_obj2.setMinutes(30);

  const [startTime, setStartTime] = useState(date_obj1);
  const [endTime, setEndTime] = useState(date_obj2); 

  const [startH, setStartH] = useState(new Date());//these are going as api values for start and end time
  const [endH, setEndH] = useState(new Date()); //these are going as api values for start and end time
  
  const [Startminute, setStartminute] = useState(new Date());//these are going as api values for start and end time
  const [Endminute, setEndminute] = useState(new Date()); //these are going as api values for start and end time
  const [greatestLastTime,setGreatestLastTime]=React.useState();
   
  const [timeDiff,setDiff] = useState('');

  function GetDiff(timeDiffr)
                          {
                            
                             setDiff(timeDiffr) 
                             
                         } 

  function CalculateDiff(startTime,endTime){
    
                                              setStartTime(startTime);setEndTime(endTime); 
                                              
                                              let  [Starthour, Startminute ] = new Date(startTime).toLocaleTimeString("en-US").split(/:| /);
                                              let  [Endhour, Endminute] = new Date(endTime).toLocaleTimeString("en-US").split(/:| /);
                                              
                                              const startMeridian=new Date(startTime).toLocaleTimeString().split(" ")[1]; //am/pm
                                              const endMeridian=new Date(endTime).toLocaleTimeString().split(" ")[1];   //am/pm
                                              
                                              const startH=(Starthour!=12 &&  startMeridian=='PM')
                                                           ?
                                                           (Number(Starthour)+12)
                                                           :
                                                           (Starthour)
                                              const endH=(Endhour!=12 &&  endMeridian=='PM')
                                                          ?
                                                          (Number(Endhour)+12)
                                                          :
                                                          ( 
                                                             
                                                            Endhour

                                                          )
                                            
                                              setStartH(startH);
                                              setEndH(endH);

                                              setStartminute(Startminute);
                                              setEndminute(Endminute)
                                              
                                              { (endMeridian=='PM' && Number(Endhour) != 12)  && startMeridian=='AM' 
                                                                                                                              ?
                                                                                                                              ( 
                                                                                                                                Endminute>Startminute || Endminute==Startminute
                                                                                                                                ?
                                                                                                                                GetDiff( ((Number(Endhour)+12)-Number(Starthour)) + "." + (Number(Endminute)-Number(Startminute)) )
                                                                                                                                :
                                                                                                                                GetDiff( (((Number(Endhour)+12)-1)-Number(Starthour)) + "." + ((Number(Endminute)+60)-Number(Startminute)) )
                                                                                                                              ) 
                                                                                                                              :
                                                                                                                              (
                                                                                                                                (endMeridian=='PM' && Number(Endhour) != 12)  && (startMeridian=='PM' && Number(Starthour) != 12)
                                                                                                                                ?
                                                                                                                                ( 
                                                                                                                                    Endminute>Startminute || Endminute==Startminute
                                                                                                                                    ?
                                                                                                                                    GetDiff( ( (Number(Endhour)+12)-(Number(Starthour)+12)) + "." + ( Number(Endminute)-Number(Startminute)) )
                                                                                                                                    :
                                                                                                                                    GetDiff( ( ( (Number(Endhour)+12)-1)-(Number(Starthour)+12) ) + "." + ( (Number(Endminute)+60)-Number(Startminute)) )
                                                                                                                                ) 
                                                                                                                                :
                                                                                                                                (endMeridian=='AM') && (startMeridian=='AM')
                                                                                                                                ?
                                                                                                                                ( 
                                                                                                                                    Endminute>Startminute || Endminute==Startminute
                                                                                                                                    ?
                                                                                                                                    GetDiff ( ( ( Number(Endhour)-Number(Starthour) ) + "." + ( Number(Endminute)-Number(Startminute) ) ))
                                                                                                                                    :
                                                                                                                                    GetDiff( ( (Number(Endhour)-1)-Number(Starthour) ) + "." + ( (Number(Endminute)+60)-Number(Startminute) ) )
                                                                                                                                    
                                                                                                                                  ) 
                                                                                                                                :
                                                                                                                                ((endMeridian=='PM' && Number(Endhour) != 12)  && (startMeridian=='PM' && Number(Starthour) == 12)
                                                                                                                                  ?
                                                                                                                                    (
                                                                                                                                      Endminute>Startminute || Endminute==Startminute
                                                                                                                                      ?
                                                                                                                                      GetDiff( ( (Number(Endhour)+12)-(Number(Starthour))) + "." + ( Number(Endminute)-Number(Startminute)) )
                                                                                                                                      :
                                                                                                                                      GetDiff( ( ( (Number(Endhour)+12)-1)-Number(Starthour) ) + "." + ( (Number(Endminute)+60)-Number(Startminute) ) )
                                                                                                                                    
                                                                                                                                    )
                                                                                                                                  :
                                                                                                                                    ( 
                                                                                                                                      Endminute>Startminute || Endminute==Startminute
                                                                                                                                      ?
                                                                                                                                      GetDiff( ( Number(Endhour)-(Number(Starthour))) + "." + ( Number(Endminute)-Number(Startminute)) )
                                                                                                                                      :
                                                                                                                                      GetDiff( ( (Number(Endhour)-1)-Number(Starthour) ) + "." + ( (Number(Endminute)+60)-Number(Startminute) ) )
                                                                                                                                    
                                                                                                                                    )
                                                                                                                                  )  
                                                                                                                              
                                                                                                                              )}
                                                                                                                                
                                                                                                                
  }
  
  const [submitErrorMessage,setSubmitErrorMessage ]=useState();
  const [isLoaded,setLoaded]=useState(false);
  
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  const [currentDate, setCurrentDate] = useState(year  + '/' + month + '/' + date);

  const [formvalue,setValue]=React.useState([]);

  const [formvalue1,setformvalue]=React.useState([{
                                                    p_id:0,
                                                    project:'Project',
                                                    task:'Task',
                                                    date:'Date',
                                                    start:'Start',
                                                    end:'End',
                                                    hrs:'Hrs',
                                                    edit:'Action'
                                                }  
                                                ]);
          
  const [empid, setEmpid] = React.useState(null);
  const [compid, setCompid] = React.useState(null);
  const [name,setName]= React.useState(null);


    
  const validationSchema = Yup.object().shape({
                                                  task: Yup.string()
                                                           .label('task')
                                                           .required('Please enter task details .'),
                                               })  
   
  const keyExtractor = (item, index) => index.toString()
   

  let updateAllStates = (empid,compid,name) => {
    setEmpid(empid); 
    setCompid(compid);
    setName(name)
  };
   
  var [projDropdownItems,setDropdownValues]=React.useState([]);
  const fname=String(name).split(" ");
  
  const [currentFormInputIndex,setcurrentFormInputIndex]  = React.useState(null);
  
  const [isSubmitting,setSubmitting]=React.useState(false); 
  const [checkBoxShow,setCheckBoxShow]=React.useState();
 
   React.useEffect( 
                  
                    () => { 
                            //  CalculateDiff(startTime,endTime);  
                            //  console.log('useEffect called');
                          //  localStorage.getItem('password')==null?navigation.navigate('Login'):null //here if   localStorage.getItem('password') value is null then page will auto redirect to Login page
                           var emp_details=JSON.parse(localStorage.getItem('empDetails'));
                              console.log(emp_details);
                           updateAllStates(
                            emp_details.emp_id,
                            emp_details.company_id,
                            emp_details.name
                            );
                            //  db.transaction(tx => {
                                                     
                            //                         tx.executeSql(  'SELECT * FROM statusInfo', null, 

                            //                                         (txObj,results ) =>  {
                            //                                                                   var len = results.rows.length;
                            //                                                                   for (let i = 0; i < len; i++) 
                            //                                                                   {
                            //                                                                     let row = results.rows.item(i);
                            //                                                                    // console.log(`Employee id: ${row.emp_id}, Company id: ${row.company_id},Name : ${row.name} `);
                            //                                                                     updateAllStates(
                            //                                                                                     row.emp_id,
                            //                                                                                     row.company_id,
                            //                                                                                     row.name
                            //                                                                     );
                                                                                                
                            //                                                                   }
                            //                                                               } ,
                            //                                         (txObj, error) => console.log('Error ', error)
                            //                                       );
                                                          
                            //                         // tx.executeSql('SELECT DISTINCT project_name FROM projectDetails', null,  
                            //                         // (txObj,results ) => 
                            //                         //     {
                            //                         //       for (let i = 0; i < results.rows.length; i++) 
                            //                         //       {
                            //                         //         let outerRow = results.rows.item(i);
                            //                         //         console.log(outerRow.project_name); 
                            //                         //         tx.executeSql(  'SELECT client_name FROM projectDetails where project_name = ? ', [outerRow.project_name], 
                                                
                            //                         //             (txObj,results ) =>  { 
                            //                         //                                           let innerRow = results.rows.item(0);
                                                                                              
                            //                         //                                             items.push({label:outerRow.project_name+' of '+innerRow.client_name,value:outerRow.project_name,color:'#333333'});
                            //                         //               i==results.rows.length-1?(console.log( items),projItemsLoaded=true):null;
                                                                                        
                            //                         //                                   } ,
                            //                         //             (txObj, error) => console.log('Error ', error)
                            //                         //         );
                                                          
                                                                                            
                            //                         //       }
                                                        
                            //                         //     } ,
                            //                         // (txObj, error) => console.log('Error ', error.message)
                            //                         // );    

                                                    
                                                                
                            //                       }
                            //               );
                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.checkBoxShowApi,
                              {
                                method :'GET',
                                headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') +':'+ localStorage.getItem('password')) ,
                                            'accept':'application/json',
                                          'content-type':'application/json'
                                          } 
                              }
                              )
                            .then(response => response.json())
                            .then((json) => {   
                                          console.log(json);
                                           
                                                  if(json.success){
                                                    setCheckBoxShow(json.data);
                                                      
                                                  }
    
    
                                            }
                                  )  ;             
                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.enteredStatusListEndpoint,
                            {
                              method :'POST',
                              headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password")) ,
                                          'accept':'application/json',
                                        'content-type':'application/json'
                                        },
                              body : JSON.stringify({
                                "emp_id":empid, //localStorage.getItem('empid'),
                                "date":  currentDate
                              })
                            }
                            )
                            .then(response => response.json())
                            .then(json => {   console.log(json)
                                                if(json.success)
                                                {
                                                  formvalue.splice(0, formvalue.length);
                                                  var result= formvalue.concat( json.data); 
                                                               
                                                 console.log(json);
                                                  setValue(result); 
                                                  if(result.length>0)//updates time according to previously entered end times
                                                  {
                                                    var copyOfresult=  Object.assign([],result);
                                                  //  copyOfresult.shift();
                                                    var endTimes=copyOfresult.map((items)=>{ 
                                                                                            return Number(items.end_time.replace(':','.'))//as endtime is in 10:30 string format replace : with . so thatwe can find max value as float number then converting them to number
                                                                                          
                                                                                        }
                                                                              )
                                                    var maxEndTime= endTimes.reduce(
                                                                                    (a,b)=>
                                                                                    a>b?a:b
                                                      );//here a is leftmost value of the array and b is the next  value of a in the array to find max time value as float
                                                    
                                                    var greatestLastTime=  Number.isSafeInteger(maxEndTime)// this checks if number is pure integer or float
                                                    ?
                                                    (new Date(new Date().setHours(maxEndTime,'0'))) //on true setting maxEndtime as hour value and 0 as minute value . the inner date obj sets time to milliseconds and outer converts miliseconds to localdateTime string format
                                                    :
                                                    (
                                                      String(maxEndTime).split('.')[1]>=1 && String(maxEndTime).split('.')[1]<=5
                                                      ?
                                                      (new Date(new Date().setHours(String(maxEndTime).split('.')[0] ,String(maxEndTime).split('.')[1]+0))) //on false we got float value so covert it to string and by splitting we got [0] as hour value and [1] as minute value
                                                      : 
                                                      (new Date(new Date().setHours(String(maxEndTime).split('.')[0] ,String(maxEndTime).split('.')[1]))) //on false we got float value so covert it to string and by splitting we got [0] as hour value and [1] as minute value
                                                    )
                                                  
                                                    let dateObj= new Date(greatestLastTime).setHours(new Date(greatestLastTime).getHours(),new Date(greatestLastTime).getMinutes()+30);//here time is setting as miliseconds and 30 mins forward to start time
                                                    CalculateDiff(greatestLastTime,new Date(dateObj))  ;     //all these we did for edit but here we are doing again for every render it will check the greatest end time for all previously entered status                                  
                                                  
                                                  }
                                                  else{
                                                    CalculateDiff( date_obj1.setHours(9,0),date_obj2.setHours(9,30)); 
                                                  }                     

                                                 
                                                  
                                                  
                                                   
                                                  setLoaded(true);
                                                  
                                                }
                                                else{
                                                  console.log(json);
                                                }

                                            }
                                  );
                            
                                  // setDeleting(false) 
                                fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.projDropdownEndpoint , {
                                        "emp_id":empid //localStorage.getItem('empid')
                                      }),
                                      { 
                                        method:'GET', 
                                        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}
                                      },
                                  
                              
                                )
                                .then(response => response.json())
                                .then(json => {   
                                                  items.length=0;
                                                  if(json.success)
                                                  {
                                                      
                                                    json.data.map((projectDetails,index)=>{
                                                       items.push({label:projectDetails.project_name+' of '+projectDetails.name,value:projectDetails.project_name,color:'#333333'});
                                                       index==json.data.length-1?(console.log( items),projItemsLoaded=true):null;

                                                    })
                                                    localStorage.setItem('EnterStatusProjDropdownItems',JSON.stringify(json.data));
                                                //    console.log(JSON.parse(localStorage.getItem('EnterStatusProjDropdownItems')));

                                                   
                                                  }
                                                  else{
                                                    alert('not fetched  ')
                                                  }
                        
                                              }
                                    )
                            
                            
                          }, [isSubmitting,checked,checkBoxShow]
                )
  
const updateChild=(text)=> {
  updateState(text);

  text=='null'?selected_project_is_null=false:selected_project_is_null=true;//as we cant pass props/states from child to parent so we are using global variable declared outside 2 components to keep record of changing value of selectedProject state  is set to null on every edit and submit action
}
const [isDeleting,setDeleting]=React.useState(false)
const [isEditting,setEditCount]=React.useState(false)
const [pId,setP_id]=React.useState(null)   
 


  return(
          
        <View style={{flex:1}} >

          <React.Suspense fallback={null}>

            <View style={styles.whiteCardContainer}>
                  
                  <SecondHeaderButtons/>

                  <View style={{alignItems:'center',flexGrow:1}}>
                  
                      <Card style={styles.whiteCard}>
                                      
                        <View style={{flexDirection:'row', }}>           
                          
                          {StatusPageBlueCard.EnterStatus()} 
                          
                          <View style={{marginHorizontal: responsiveWidth(3),
                                        marginTop:responsiveHeight(3) 
                                        }}> 
                                  <View style={{flexDirection:'row',justifyContent:'space-between'
                                                        }}>
                                              <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                <Image source={require('../../../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                  <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                    Welcome {localStorage.getItem('loginUserName')} 
                                                    </Text> 
                                              </View>
                                              <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                  <Text style={{fontWeight:'500'}}> <Text onPress={()=>history.push('/home')}>Home</Text><Text> / Status /</Text><Text style={{color:'#F15A25'}}>EnterStatus</Text></Text>
                                              </View>
                                                      
                                  </View>
                            
                                <Formik 
                              
                                      initialValues={{   task: '',last:''}} //must required to store form intitial values else after writing the field wont keep the values in the field
                                      // onReset={handleReset} this also works for resetting the form
                                      onSubmit={
                                      (values,{ resetForm })=>{   
                                                
                                                  var startT= endTime>greatestLastTime ? (endTime,setGreatestLastTime(endTime)): (greatestLastTime);//during submit checking current endtime is gretaer than last greatest end time and setting it as start time for edit api
                                              
                                                    let encryptedCredentials =   btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"));
                                                  
                                                    (isEditting==false ?
                                                                        (
                                                                          selected_project_is_null==false
                                                                          ?
                                                                          alert('Enter Project Name')
                                                                          :
                                                                          fetch(ApiInfo.baseUrlForWeb+ApiInfo.enterStatusEndpoint,
                                                                              {
                                                                                method :'POST',
                                                                                headers: {'Authorization': 'Basic ' +encryptedCredentials,
                                                                                            'accept':'application/json',
                                                                                          'content-type':'application/json'
                                                                                          },
                                                                                body : JSON.stringify({
                                                                                  
                                                                                  "company_id": compid,

                                                                                  "client_id": localStorage.getItem('clientid'),
                                                                              
                                                                                  "task_details":values.task,
                                                                              
                                                                                  "proj_id": localStorage.getItem('projid'),
                                                                              
                                                                                  "start_time":startH+':'+Startminute,
                                                                              
                                                                                  "end_time" : endH+':'+Endminute,
                                                                              
                                                                                  "emp_id": empid,
                                                                              
                                                                                  "date":  currentDate,
                                                                              
                                                                                  "totalhrs":timeDiff,
                                                                              
                                                                                  "proj_name":localStorage.getItem('dropval'),
                                                                              
                                                                                  "client_name":localStorage.getItem('clientname')
                                                                                
                                                                                      })
                                                                              }
                                                                          )
                                                                          .then(response => response.json())
                                                                          .then(json => {   
                                                                                                  if(json.success)
                                                                                                  {
                                                                                                    alert('Status Submitted');

                                                                                                    setSubmitting(true) ;//to re-render React.useState where isSubmitting is dcalred as dependancy array after each edit to get updated entered status reults to show under submit button
                                                                                              

                                                                                                    resetForm();//to reset formik fields whose initial values are defined
                                                                                                    updateChild("null"); // to reset project dropdown  to placeholder

                                                                                                    setStartTime(endTime);//to set end time as start time after submit
                                                                                                    
                                                                                                    let dateObj= new Date(endTime).setHours(new Date(endTime).getHours(),new Date(endTime).getMinutes()+30);//here time is setting as miliseconds and 30 mins forward to start time
                                                                                                    setEndTime(new Date(dateObj));  //here milisecond is converted to local datetime format  

                                                                                                    
                                                                                                    CalculateDiff(endTime,new Date(dateObj));//to calculate diff and to set time for api i.e. startH,endH,StartMinute,EndMinute
                                                                                                    
                                                                                                    
                                                                                                  // location.reload()  
                                                                                                  }
                                                                                                  else {
                                                                                                    alert('You are entering duplicate entry.');
                                                                                                    console.log(json)
                                                                                                  }
                                                                                                  
                                                                                              }
                                                                                    )
                                                                          )

                                                                      :
                                                                      
                                                                        ( 
                                                                          selected_project_is_null==false
                                                                          ?
                                                                          alert('Enter Project Name')
                                                                          :
                                                                          fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.editStatusEndpoint,{"id":pId}) ,
                                                                                      {
                                                                                        method :'POST',
                                                                                        headers: {'Authorization': 'Basic ' +encryptedCredentials,
                                                                                                    'accept':'application/json',
                                                                                                  'content-type':'application/json',
                                                                                                  
                                                                                                  },
                                                                                        body:JSON.stringify({
                                                                                            "emp_id":empid,
                                                                                            "start_time":startH+':'+Startminute,
                                                                                            "end_time":endH+':'+Endminute,
                                                                                            "company_id":compid,
                                                                                            "emp_name":name,
                                                                                            "proj_id":localStorage.getItem('projid'),
                                                                                            "client_id":localStorage.getItem('clientid'),
                                                                                            "proj_name":localStorage.getItem('dropval'),
                                                                                            "task_details":values.task,
                                                                                            "totalhrs":timeDiff,
                                                                                            "date":currentDate
                                                                                        })
                                                                                          
                                                                                      }
                                                                                )
                                                                          .then(response => response.json())
                                                                          .then(json => {   
                                                                                              setSubmitting(true);//to re-render React.useState where isSubmitting is dcalred as dependancy array after each edit to get updated entered status reults to show under submit button
                                                                                              
                                                                                              if(json.success)
                                                                                              {
                                                                                                
                                                                                                
                                                                                                  alert('Status Edited');
                                                                                                
                                                                                                  resetForm();//to reset formik fields whose initial values are defined
                                                                                                  updateChild("null"); // to reset project dropdown  to placeholder
                                                                                                  let dateObj= new Date(startT).setHours(new Date(startT).getHours(),new Date(startT).getMinutes()+30);//here time is setting as miliseconds and 30 mins forward to start time
                                                                                                    
                                                                                                  CalculateDiff(startT,new Date(dateObj));//to calculate diff and to set time for api i.e. startH,endH,StartMinute,EndMinute
                                          
                                                                                                  setEditCount(false)//to enable submit api at isEditting==false checkpoint
                                                                                                
                                                          

                                                                                              }
                                                                                              else{
                                                                                                    console.log(json.message)
                                                                                              }
                                                                    
                                                                                          }
                                                                                )
                                                                          .then(error => console.log(error))
                                                                        )
                                                  )
                                                  setSubmitting(false) 
                                                
                                                }
                                                
                                        
                                        }
                                      
                                        validationSchema={validationSchema}
                              
                          >
                            
                              {({ handleChange, values,isSubmitting,setFieldValue, handleSubmit,  errors,touched,handleBlur,submitCount}) => (
                                
                                <Form>
                                    
                                  <Card style={{ 
                                        width:responsiveWidth(42),
                                        height:responsiveHeight(62),
                                        borderRadius:10,
                                        backgroundColor:'#F3F1F1',  
                                        marginTop:responsiveHeight(1),             //FORM CARD CONTAINER
                                        paddingBottom:responsiveHeight(0),
                                        
                                      }}>
                                  {
                                    isLoaded  && projItemsLoaded
                                    ?
                                    <ScrollView style={{paddingLeft:responsiveWidth(2),
                                                        paddingRight:responsiveWidth(2),}}>
                                    
                                      <View style={{justifyContent:'space-between'}}>

                                        <View>
                                          <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1.5),
                                                        color:'#333333',
                                                        marginTop:responsiveHeight(1),
                                                        textTransform:'none'
                                                      }}
                                          >
                                            {StaticWordsWeb.EnterStatusPage.header}
                                          </Text>
                                        </View>
                                        <View>
                                            {
                                                      timeDiff>2
                                                      ?
                                                      (<Text style={{color:'#ee4000', marginTop:responsiveHeight(1),fontSize:responsiveFontSize(1),fontWeight:'bold'}}>* Please Enter Time Difference less than or equals to 2 hours *</Text>)
                                                      :
                                                      null
                                            }
                                        </View>
                                        
                                      </View>        
                                    
                                      <View style={{
                                                      marginTop:responsiveHeight(1),
                                                      marginBottom:timeDiff>2?responsiveHeight(1):responsiveHeight(1),
                                                      flexDirection:'row' ,
                                                      justifyContent:'space-between',
                                                      alignItems:'center'
                                                      }}
                                          > 
                                              <View style={{backgroundColor:timeDiff>2?'#fff':'transparent',
                                                            padding:timeDiff>2?8:null,
                                                            borderRadius:5
                                                          }}
                                              >
                                                  <Text style={{fontSize:responsiveFontSize(1),
                                                                          color:'#F15A25',fontWeight:'bold'}} 
                                                  >
                                                    {currentDate.split('/').reverse().join('/')}
                                                  </Text>
                                              </View>
                                              
                                              {
                                                checkBoxShow   // ( new Date().getHours()==0 || new Date().getHours()<8)?
                                                ?
                                                (<CheckBox 
                                                  title={StaticWordsWeb.EnterStatusPage.checkBoxTitle} 
                                                  checked={checked} 
                                                  onPress={() =>{ setChecked(!checked)
                                                                  var yesterdayDate = new Date(); 

                                                                  // subtract one day from current time						 
                                                                  yesterdayDate.setDate(yesterdayDate.getDate() - 1); 
                                                                  
                                                                  var date = yesterdayDate.getDate(); //Current Date
                                                                  var month = yesterdayDate.getMonth() + 1; //Current Month
                                                                  var year = yesterdayDate.getFullYear();
                                                                  checked? setCurrentDate( new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate()  ) : setCurrentDate(year  + '/' + month + '/' + date)
                                                                }}
                                                  checkedColor='#F15A25' uncheckedColor='#F15A25'
                                                  size={20}
                                                  containerStyle={styles.checkboxContainer}
                                                  textStyle={{fontSize:responsiveFontSize(1),fontWeight:'normal'}}
                                                />)
                                                :null
                                              }
                                            
                                      </View> 
                                
                          
                                      <View style={{
                                                      flexDirection:'row',          
                                                      justifyContent:'space-between',
                                                      marginTop:responsiveHeight(.5),
                                                      marginBottom:'1%', 
                                                      }}
                                          > 
                                              
                                              <View>  
                                                {/* Time Picker is named as KeyboardTimePicker as a child node of
                                                  
                                                      MuiPickersUtilsProvider  , and  TextInput defined in MuiPickersUtilsProvider is only for 

                                                      getting time difference not to display time diff from there.

                                                  */}
                                                  
                                                  

                                                  <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                                  
                                                    <View style={{flexDirection:'row'}}> 
                                                    {/* time picker container */}
                                                      
                                                              <KeyboardTimePicker  // time picker for START TIME in 24 hour format
                                                                    
                                                                    onChange={(value)=>{CalculateDiff(value,endTime)}} //here value is in 24 hour format
                                                                    minutesStep={'30'}
                                                                    variant="dialog"
                                                                    label='Start Time' 
                                                                    style={{ 
                                                                            backgroundColor:'#fff',
                                                                            width:responsiveWidth(13),
                                                                            padding:10,
                                                                            height:responsiveHeight(8),
                                                                            paddingTop:0,
                                                                            marginTop:0,
                                                                            borderRadius:5
                                                                          }}
                                                                          InputProps={{
                                                                            disableUnderline: true
                                                                          }}
                                                                    keyboardIcon={<FontAwesome5 name="clock" size={18} color="#ee4000" />}
                                                                    value={startTime} //it is also in 24 hour format
                                                                      
                                                              />
                                                      
                                                              <KeyboardTimePicker   // time picker for End TIME
                                                                    minutesStep={'30'}
                                                                    onChange={(value)=>{CalculateDiff(startTime,value) }} //value is in 24 hour format
                                                                    variant="dialog"
                                                                    label='End Time'
                                                                    style={{
                                                                              backgroundColor:'#fff',
                                                                              width:responsiveWidth(13),
                                                                              padding:10,
                                                                              height:responsiveHeight(8),
                                                                              paddingTop:0,
                                                                              marginTop:0,
                                                                              borderRadius:5,
                                                                      marginLeft:responsiveWidth(1) ,
                                                                          }}
                                                                    InputProps={{
                                                                      disableUnderline: true
                                                                    }}
                                                                    keyboardIcon={<FontAwesome5 name="clock" size={18} color="#ee4000" />}
                                                                    value={endTime} //24 hour format
                                                                      
                                                              />
                                                            
                                                            
                                                              
                                                    </View>
                                                                              
                                                  </MuiPickersUtilsProvider>
                  
                                              </View>
                                              
                                              <TextInput //here we are getting time difference set by Textinput field of MuiPickersUtilsProvider 
                                                  
                                                  placeholder={Math.sign(String(timeDiff).split('.')[1])==NaN?null:'Time Diff'+' : ' +timeDiff}
                                                  editable={false}
                                                  placeholderTextColor='#333333' 
                                                  style={{
                                                          backgroundColor:'#fff',            width:responsiveScreenWidth(9),
                                                          borderWidth:1,                        
                                                          height:responsiveHeight(8) ,borderColor:'#ECECEC',
                                                          borderRadius:5,  
                                                          fontSize:responsiveFontSize(1.2),textAlign:'center',
                                                          fontWeight:'500'
                                                          }} 
                                                  
                                              />
                                      </View> 
                                          
                                      <View style={{marginTop:'2%',
                                                    marginBottom:'2%',
                                                    zIndex:-1
                                                  }}
                                      > 
                                        
                                        <Drop  />
                                      </View> 

                                      <View style={{marginTop:'2%',
                                                    marginBottom:'2%',
                                                    zIndex:-1
                                                  }}
                                      > 
                                        
                                        <Drop  />
                                      </View>  
                                    
                                      <View style={{ marginBottom:'1%',zIndex:-1
                                              }}> 
                                                                                                      
                                          <TextInput   
                                              placeholder='Enter Task'
                                              placeholderTextColor='#3333330'
                                              multiline
                                              value={values.task}
                                              style={{
                                                textAlignVertical:'top',
                                                borderColor:'#ECECEC',
                                                borderWidth:1,
                                                paddingTop:13, 
                                                fontWeight:'400',
                                                backgroundColor:'#fff' , 
                                                marginTop:5,
                                                height:responsiveScreenHeight(15),  
                                                borderRadius:5, paddingLeft:13, fontSize:responsiveFontSize(1.3),

                                                }} 
                                              onBlur={handleBlur('task')}
                                              onChangeText={handleChange('task')} 
                                          />
                                      </View> 
                                    
                                      <Text style={{ color: 'red',
                                                      alignSelf:'flex-start',
                                                      marginLeft:10
                                                    }}
                                      >                                                                     
                                          {touched.task && errors.task}
                                      </Text>
                                      
                                      <View style={styles.buttonContainer}>                                   
                                          <FormButton
                                          buttonType='solid'
                                          // type='submit' see if needed in future
                                          onPress={(timeDiff != undefined) && ( timeDiff <= 2 ) ? (handleSubmit ) : null }  //it calls the onSubmit(line:246) method passing the form value in object form
                                          title='SUBMIT' 
                                          titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                          buttonStyle={{ backgroundColor:'#F15A25', borderRadius:20,
                                                          paddingVertical:responsiveHeight(1) 
                                                                          
                                                      }} 
                                          containerStyle={{  
                                                            width:responsiveScreenWidth(10),
                                                            marginTop:responsiveScreenHeight(1)
                                                          }} 
                                          buttonColor='#a3f1ff'  
                                          />
                                        
                                      </View>
                                      
                                      {
                                        (formvalue.length>0) // ||  isSubmitting 
                                        ? 
                                          (
                                            
                                                <FlatList
                                                          showsVerticalScrollIndicator={false} 
                                                          ref={flatList}
                                                          onContentSizeChange={() => { 
                                                              flatList.current.scrollToEnd();
                                                          }}
                                                          getItemLayout={(data, index) => (
                                                            {length: 33, offset: 33 * index, index}
                                                          )}
                                                          keyExtractor={keyExtractor}
                                                          data={formvalue}
                                                          style={{ flex:1}}
                                                          renderItem={
                                                            ({item,index}) => (   
                                                                    <View>
                                                                    
                                                                      <ListItem style={{ borderWidth:2,borderColor:'#C0C0C050',borderTopEndRadius:5,borderTopStartRadius:5}}>
                                                                                                                                                                        
                                                                        <ListItem.Content  key={item.p_id}  >
                                                                            
                                                                            <View  style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:responsiveHeight(1)}}>
                                                                                                          
                                                                                    <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold ',opacity:0.7}}>
                                                                                      
                                                                                      {item.start_time + ' - ' + item.end_time + ' ' + '( ' +item.totalhrs +' )' }   
                                                                                  
                                                                                    </ListItem.Title>
                                                                                    
                                                                                    <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                    {item.date}  
                                                                                  </ListItem.Title>
                                                                              
                                                                            </View>
                                                                                                      
                                                                            
                                                  
                                                                            {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:responsiveHeight(.5)}}>
                                                                                
                                                                              
                                                                                
                                                                            </View> */}
                                                  
                                                                            <ListItem.Title style={{width:'100%',fontSize:responsiveFontSize(1.1),fontWeight:'500',color:'#333333',textAlign:'justify'}}>
                                                                              {item.task_details}
                                                                            </ListItem.Title>
                                                                          
                                                                          
                                                                        </ListItem.Content>
                                                                    
                                                                      </ListItem>
                                                                      <View style=
                                                                                  {{
                                                                                    marginBottom:responsiveHeight(2),flexDirection:'row',
                                                                                    justifyContent:'space-between',alignItems:'center',
                                                                                    width:'100%',backgroundColor:'#fff',paddingHorizontal:responsiveWidth(1),borderColor:'#C0C0C050',borderWidth:2,borderTopWidth:0,borderBottomEndRadius:5,borderBottomStartRadius:5
                                                                                  }}
                                                                      > 
                                                                                <ListItem.Title style={{fontSize:responsiveFontSize(1.1),textAlign:'left',fontWeight:'bold',opacity:0.7}}>
                                                                                  {item.proj_name}  
                                                                                </ListItem.Title>
                                                                                <View style={{ justifyContent:'space-between',alignItems:'center',flexDirection:'row',height:responsiveWidth(3),width:responsiveWidth(7)}}  >
                                                                                            <Button containerStyle={{padding:0,margin:0,width:responsiveWidth(3), shadowColor: '#000',shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.2,shadowRadius: 2,elevation: 9}} 
                                                                                                    buttonStyle={{backgroundColor:'#e17302',paddingVertical:'5%'}} 
                                                                                                  icon={<Feather name="edit-3" size={18} color="#fff" />}    
                                                                                                    onPress={()=>{
                                                                                                                    const copylist=Object.assign([],formvalue);//it does not change original array elments of formvalue if we make any changes in copylist array but if we assign formvalue directly then it may change
                                                                                                                  
                                                                                                                    const startT=copylist[index].start_time;
                                                                                                                    const endT=copylist[index].end_time;

                                                                                                                    const [StartH, StartM] =startT.split(/:| /);
                                                                                                                    const  [EndH, EndM] = endT.split(/:| /);

                                                                                                                    localStorage.setItem('editedRowIndex',String(index));

                                                                                                                    var copylist2= Object.assign([],formvalue);//assigned formvalue[] having a 1st element as null {}object with other values available to  a constant
                                                                                                                    //copylist2.shift(); //removed first element i.e. {} from copylist2[] as it cant return max end_time if any element in array is null
                                                                                                                    var endTimes=copylist2.map((items)=>{ 
                                                                                                                                                            return Number(items.end_time.replace(':','.'))//as endtime is in 10:30 string format replace : with . so thatwe can find max value as float number then converting them to number
                                                                                                                                                          
                                                                                                                                                        }
                                                                                                                                              )
                                                                                                                    var maxEndTime= endTimes.reduce(
                                                                                                                                                    (a,b)=>
                                                                                                                                                    a>b?a:b
                                                                                                                      );//here a is leftmost value of the array and b is the next  value of a in the array to find max time value as float
                                                                                                                    
                                                                                                                    Number.isSafeInteger(maxEndTime)// this checks if number is pure integer or float
                                                                                                                    ?
                                                                                                                    setGreatestLastTime(new Date(new Date().setHours(maxEndTime,'0'))) //on true setting maxEndtime as hour value and 0 as minute value . the inner date obj sets time to milliseconds and outer converts miliseconds to localdateTime string format
                                                                                                                    :
                                                                                                                    (
                                                                                                                        String(maxEndTime).split('.')[1]>=1 && String(maxEndTime).split('.')[1]<=5
                                                                                                                        ?
                                                                                                                        setGreatestLastTime(new Date(new Date().setHours(String(maxEndTime).split('.')[0] ,String(maxEndTime).split('.')[1]+0))) //on false we got float value so covert it to string and by splitting we got [0] as hour value and [1] as minute value
                                                                                                                        : 
                                                                                                                        setGreatestLastTime(new Date(new Date().setHours(String(maxEndTime).split('.')[0] ,String(maxEndTime).split('.')[1]))) //on false we got float value so covert it to string and by splitting we got [0] as hour value and [1] as minute value
                                                                                                                    )
                                                                                                                    
                                                                                                                    
                                                                                                                    setStartH(StartH);
                                                                                                                    setStartminute(StartM);

                                                                                                                    setEndH(EndH);
                                                                                                                    setEndminute(EndM);
                                                                                                                    
                                                                                                                    setDiff(copylist[index].totalhrs);
                                                                                                                    
                                                                                                                    date_obj1.setHours(StartH),date_obj1.setMinutes(StartM);
                                                                                                                    date_obj2.setHours(EndH),date_obj2.setMinutes(EndM);

                                                                                                                    setStartTime(date_obj1);
                                                                                                                    setEndTime(date_obj2);
                                                                                                                    setFieldValue("task",copylist[index].task_details); //for textinput of formik state update And SetField value is a inbuilt method of formik
                                                                                                                  
                                                                                                                    updateChild(copylist[index].proj_name);//for project dropdown state update
                                                                                                                  
                                                                                                                    setEditCount(true);
                                                                                                                    setP_id(item.progress_id);
                                                                                                                    setcurrentFormInputIndex(index);
                                                                                                              //   alert(startTime);
                                                                                                                  }
                                                                                                            } 
                                                                                            />
                                                                                            <Button containerStyle={{padding:0,margin:0,width:responsiveWidth(3),shadowColor: '#000',shadowOffset: { width: 0, height: 3 },shadowOpacity: 0.2,shadowRadius: 2,elevation: 9}} 
                                                                                                    buttonStyle={{backgroundColor:'#e17302',paddingVertical:'7%'}} 
                                                                                                    icon={<MaterialIcons name="delete" size={18} color="#fff" />}    
                                                                                                  onPress=
                                                                                                  {
                                                                                                    ()=>
                                                                                                        {
                                                                                                          
                                                                                                          let encryptedCredentials =   btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))
                                                                                                          confirm('Do you want to delete status ?')
                                                                                                          ?
                                                                                                          fetch(withQuery( ApiInfo.baseUrlForWeb+ApiInfo.deleteStatusEndpoint,{"id":item.progress_id}) ,
                                                                                                                      {
                                                                                                                        method :'POST',
                                                                                                                        headers: {'Authorization': 'Basic ' +encryptedCredentials,
                                                                                                                                    'accept':'application/json',
                                                                                                                                  'content-type':'application/json',
                                                                                                                                  
                                                                                                                                  },
                                                                                                                          
                                                                                                                      }
                                                                                                          )
                                                                                                          .then(response => response.json())
                                                                                                          .then(json => {   
                                                                                                                              if(json.success)
                                                                                                                              {
                                                                                                                              setSubmitting(true) 
                                                                                                                                
                                                                                                                              }
                                                                                                                              else{
                                                                                                                              console.log(json.message)
                                                                                                                              }
                                                                                                    
                                                                                                                          }
                                                                                                                )
                                                                                                          .then(error => console.log(error))
                                                                                                          :
                                                                                                          null;

                                                                                                          setSubmitting(false) ;
                                                                                                          //console.log(`form length is ${formvalue.length}`) 
                                                                                                                              
                                                                                                        }
                                                                                                    
                                                                                                  } 
                                                                                            />
                                                                                      </View> 
                                                                      </View>

                                                                    </View> 
                                                                )}
                                                    
                                                />  
                                          )
                                          :  setSubmitErrorMessage(' ')
                                        
                                      }
                                      
                                        
                                    </ScrollView>
                                    :
                                    <ActivityIndicator style={{top:responsiveHeight(25)}}/>
                                  } 
                                  </Card> 
                                  
                                </Form>
                                
                              )}
                            
                          </Formik>    
                            
                          </View>
                      
                        </View>   
                    
                      </Card> 
                    
                      <Footer/>
                  </View>
            
              </View> 
          
          </React.Suspense>
       
         </View> 
    
    )

}


 const items = [];
var projItemsLoaded=false;
 

class Drop extends React.Component {
    
      constructor(props) {
        super(props);
        
        this.state = {
          
        
          
          selectedItem: null,
 
        };
        updateState = updateState.bind(this)
      }
 
      render() {

        const placeholder = {
          label: 'Please Select Project',
          value: 'null',
          color:'#33333350'
            
          };
      
          return (      

              <RNPickerSelect
                              
                              placeholder={placeholder} 
                              
                              items={projItemsLoaded?items:null}
                              onValueChange={value => {
                                                        this.setState({
                                                            selectedItem: value,
                                                        });
                                                        console.log(value);
                                                        localStorage.setItem('dropval',value) ;
                                                        
                                                       value=='null'?selected_project_is_null=false :selected_project_is_null=true;//here we are indicatiing parent via this variable that state selectedItem is no more null on Value change so that continue submit action 

                                                        // db.transaction(  
                                                          
                                                        //   tx=>{ 
                                                          
                                                        //             tx.executeSql(  'SELECT client_id,project_id,client_name FROM projectDetails where project_name = ? ', [value], 

                                                        //                       (txObj,results ) =>  { 
                                                        //                                                 for (let i = 0; i < results.rows.length; i++) {
                                                        //                                                   let row = results.rows.item(0);
                                                        //                                                   localStorage.setItem('clientid', row.client_id );
                                                        //                                                   localStorage.setItem('clientname', row.client_name );
                                                        //                                                   localStorage.setItem('projid', row.project_id) ;
                                                        //                                                   console.log(row.client_id +'Ci');
                                                        //                                                   console.log(row.client_name +'cn');
                                                        //                                                   console.log(row.project_id +'pi');
                                                        //                                                 }
                                                                                                      
                                                        //                                                 } ,
                                                        //                       (txObj, error) => console.log('Error ', error)
                                                        //             )
                                                        //     }
                                                        // )
                                                      if(value!='null'){
                                                        const arr=  JSON.parse(localStorage.getItem('EnterStatusProjDropdownItems'));
                                                      let projDetails = arr.find(items => items.project_name === value);
                                                        // console.log(projDetails);
                                                        console.log(value)
                                                        localStorage.setItem('clientid', projDetails.client_id );
                                                        localStorage.setItem('clientname', projDetails.name );
                                                        localStorage.setItem('projid', projDetails.project_id) ;
                                                      }
                                                    }
                                              }
                              
                              style=
                              {{
                                
                                      iconContainer: {
                                          top: responsiveHeight(2),
                                          right: responsiveWidth(5),
                                      },
                                      placeholder:{
                                        fontSize:responsiveFontSize(2),
                                        color:'#333333'
                                      },
                                      inputWeb:{
                                        height:responsiveHeight(6), 
                                        fontSize:responsiveFontSize(1.2),
                                        paddingLeft:responsiveWidth(.5),
                                        borderRadius:5 ,
                                        
                                        borderWidth:0, 
                                        color:'#333333'
                                        
                                      }, 
                                        
                              }}

                              value= {this.state.selectedItem}

                              useNativeAndroidPickerStyle={true}
                              
                              Icon={() => {
                                            return( 
                                                    <AntDesign name="down" size={0}  color="#F15A25" />
                                                        //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                            )
                                          }
                                  }
              />
          )
      }
}
 

const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(.5), 
      alignItems:'center',zIndex:-1,
      marginBottom:responsiveHeight(1)
    },
    checkboxContainer:{
      backgroundColor:'white',
      //border ':none,
      borderColor:'transparent',
      padding :5,
     // paddingLeft :0, 
    // height :'10%'    
    },
    whiteCardContainer:{
                            backgroundColor:'#003A59',position:'relative',flex:1 
                        },
    whiteCard:{
                width:responsiveWidth(63)  ,
                  borderRadius:10, 
                  alignSelf:'center',flexGrow:1,
                  marginTop:responsiveHeight(6)  ,         //   WHITE CARD CONTAINER
              } ,
  inputAndroid: {
    fontSize: responsiveFontSize(1.5), 
    paddingHorizontal: '4%', 
    borderRadius: 5,
    color: '#333333',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor:'white', 
    borderColor:'#ECECEC',
    borderWidth:1,
    height:responsiveScreenHeight(6)
  }                             
     
  })   
