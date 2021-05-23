//import Timepicker from '../../../../components/timepicker'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import base64 from 'base-64';
import * as SQLite from 'expo-sqlite';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Yup from 'yup';
import { ApiInfo } from '../../../api/constants';
import FormButton from '../../../components/FormButton';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { StaticWordsWeb } from '../../staticwordsFile';


   

function updateState(selectedItem){
  this.setState({selectedItem})
}
const db = SQLite.openDatabase('db.testDb1')

export default function AddProjects({navigation}){
  const date_obj1=new Date();
  const date_obj2=new Date();
  const count=0;
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(); 

  let  [Starthour, Startminute ] = new Date(startTime).toLocaleTimeString("en-US").split(/:| /)
  let  [Endhour, Endminute] = new Date(endTime).toLocaleTimeString("en-US").split(/:| /)
  const [fromDate,setFromDate]=React.useState();
  
  const startMeridian=new Date(startTime).toLocaleTimeString().split(" ")[1] //am/pm
  const endMeridian=new Date(endTime).toLocaleTimeString().split(" ")[1]   //am/pm

  const [timeDiff,setDiff] = useState('');

  function GetDiff(timeDiffr)
                          {
                             setDiff(timeDiffr) 
                             
                         } 
  const [submitErrorMessage,setSubmitErrorMessage]=useState();
  
  
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  const [currentDate, setCurrentDate] = useState(year  + '/' + month + '/' +  date);


  const [formvalue,setValue]=React.useState(
                                              [
                                                {},{}
                                              ]
                                            );

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
   
  // function handleRemove(id) { 
  // const copylist=Object.assign([],formvalue)
  // copylist.splice(id, 1);
  
  //   setValue(copylist);
  // }

  
  const keyExtractor = (item, index) => index.toString()
   

  let updateAllStates = (empid,compid,name) => {
    setEmpid(empid); 
    setCompid(compid);
    setName(name)
  };
   
  const fname=String(name).split(" ");
  
  const [currentFormInputIndex,setcurrentFormInputIndex]  = React.useState(null);
  
const [isSubmitting,setSubmitting]=React.useState(false); 
 
React.useEffect(
                  
                    () => {
                            
                            db.transaction(tx => {
                                                    
                                                    tx.executeSql(  'SELECT * FROM statusInfo', null, 

                                                                    (txObj,results ) =>  {
                                                                                              var len = results.rows.length;
                                                                                              for (let i = 0; i < len; i++) 
                                                                                              {
                                                                                                let row = results.rows.item(i);
                                                                                                console.log(`Employee id: ${row.emp_id}, Company id: ${row.company_id},Name : ${row.name} `);
                                                                                                updateAllStates(
                                                                                                                row.emp_id,
                                                                                                                row.company_id,
                                                                                                                row.name
                                                                                                );
                                                                                                
                                                                                              }
                                                                                          } ,
                                                                    (txObj, error) => console.log('Error ', error)
                                                                  )
                                                             
                                                    
                                                                
                                                  }
                                          )
                                       

                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.enteredStatusListEndpoint,
                            {
                              method :'POST',
                              headers: {'Authorization': 'Basic ' +base64.encode(localStorage.getItem("username")+ ":" + localStorage.getItem("password")) ,
                                          'accept':'application/json',
                                        'content-type':'application/json'
                                        },
                              body : JSON.stringify({
                                "emp_id": localStorage.getItem('empid'),
                                "date":  currentDate
                              })
                            }
                            )
                            .then(response => response.json())
                            .then(json => {   
                                                if(json.success)
                                                {
                                                  formvalue.splice(1, formvalue.length-1)
                                                  var result= formvalue.concat( json.data); 
                                                 
                                                  setValue(result)
                                                    console.log(result)   
                                                  
                                                }
                                                else{
                                                  console.log('empid')
                                                }

                                            }
                                  )
                            .then(error => console.log(error))
                            // setDeleting(false)              
                          }, [isSubmitting]
                )
  
  
const updateChild=(text)=> {
  updateState(text)
}
const [isDeleting,setDeleting]=React.useState(false)
const [isEditting,setEditCount]=React.useState(false)
const [pId,setP_id]=React.useState(null)   
// const handleReset = () => {
//   if (!window.confirm('Reset?')) {
//     throw new Error('Cancel reset');
//   }
// };


  return(
          
        <View style={{flex:1 ,paddingTop:'1%'}} >

            <SecondHeaderButtons navigation={navigation} color={'#ee4000'} />
                   
            <View style={styles.whiteCardContainer}>
                 <Card style={styles.whiteCard}>
                                
                   <View style={{flexDirection:'row', }}>           
                     
                   <Card style={styles.blueCard}>
                        <View style={styles.relativeLinkContainer}>
                          <FontAwesome5 name="link" size={16} color="#fff"  />                          
                          <Text style={styles.relativeLink} >
                                          {StaticWordsWeb.relativeLinkHeaders.relativeLink}
                                        </Text>  
                        </View>
                        <TouchableOpacity  style={{backgroundColor:'#0085BF' }}>
                          <Text style={styles.checkStatus} >
                                         {StaticWordsWeb.relativeLinkHeaders.addProjects}
                                        </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity 
                                           onPress={()=>navigation.navigate('AddClients')}                            
                        >
                          <Text style={styles.enterStatus} >
                                           {StaticWordsWeb.relativeLinkHeaders.addClients}
                          </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity  
                                           onPress={()=>navigation.navigate('AddEmployees')}                            
                        >
                          <Text style={styles.enterStatus} >
                                           {StaticWordsWeb.relativeLinkHeaders.addEmployess}
                          </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity  
                                           onPress={()=>navigation.navigate('AddHolidays')}                            
                        >
                          <Text style={styles.enterStatus} >
                                           {StaticWordsWeb.relativeLinkHeaders.addHolidays}
                          </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>navigation.navigate('EnterStatus')}
                                                                      
                        >
                          <Text style={styles.enterStatus} >
                                           {StaticWordsWeb.relativeLinkHeaders.enterStatus}
                                        </Text>  
                        </TouchableOpacity>
                    </Card>
                 
                     <View style={{marginHorizontal: responsiveWidth(3),
                                   marginTop:responsiveHeight(3) 
                                   }}>
                          <Text style={{fontWeight:'500'}}> 
                             <Text onPress={()=>navigation.navigate('Home')}>Home</Text>
                             <Text> / Projects /</Text>
                             <Text style={{color:'#F15A25'}}>Add Projects</Text></Text>
                        
                        
                           <Formik 
                        
                                initialValues={{   task: '',last:''}} //must required to store form intitial values else after writing the field wont keep the values in the field
                                // onReset={handleReset} this also works for resetting the form
                                onSubmit={
                               console.log('ji')    
                                  
                                   }
                                
                                  validationSchema={validationSchema}
                        
                    >
                     {({ handleChange, values,isSubmitting,setFieldValue, handleSubmit,  errors,touched,handleBlur,submitCount}) => (
                     <Form>
                          
                        <Card style={{ 
                              width:responsiveWidth(38)  ,
                              height:responsiveHeight(55),
                              borderRadius:10,
                              backgroundColor:'#F3F1F1',  
                              marginTop:responsiveHeight(2)  ,             //FORM CARD CONTAINER
                            }}>
                          <ScrollView style={{paddingLeft:responsiveWidth(2),
                                              paddingRight:responsiveWidth(2),}}>
                            <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1.5),
                                        color:'#333333',
                                        marginTop:responsiveHeight(1)

                                        }}>
                              {StaticWordsWeb.AdminPrevileges.AddProjects.header}
                            </Text>
                            <View style={{
                                            marginTop:responsiveHeight(1),
                                            marginBottom:responsiveHeight(2),
                                             }}
                                >  
                                <TextInput   
                                    placeholder='Project Name'
                                    placeholderTextColor='#3333330'
                                   // multiline
                                    value={values.task}
                                    style={{
                                      textAlignVertical:'top',
                                      borderColor:'#ECECEC',
                                      borderWidth:1,
                                      paddingVertical:responsiveHeight(1.3), 
                                      fontWeight:'400',
                                      backgroundColor:'#fff' , 
                                      marginTop:5,
                                     // height:responsiveScreenHeight(15),  
                                      borderRadius:5, paddingLeft:13, fontSize:responsiveFontSize(1),
                                      }} 
                                    onBlur={handleBlur('task')}
                                    onChangeText={handleChange('task')} 
                                /> 
                            </View> 
                       
                 
                            <View style={{marginTop:'2%',
                                           marginBottom:'2%',
                                           zIndex:-1
                                        }}
                            > 
                              
                              <EmployeDropdown/>
                            </View>   
                            
                            <View style={styles.buttonContainer}>                                   
                                <FormButton
                                buttonType='solid'
                                // type='submit' see if needed in future
                                onPress={( timeDiff != undefined) && ( timeDiff <= 2 ) ? (handleSubmit ) : setSubmitErrorMessage('* Please enter all fields.') }  //it calls the onSubmit(line:246) method passing the form value in object form
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
                                {/* <button type="reset"  style={{width:50,height:20}} onClick={( timeDiff != undefined) && ( timeDiff <= 2 ) ? (handleSubmit ) : setSubmitErrorMessage('* Please enter all fields.') }  //it calls the onSubmit(line:246) method passing the form value in object form
                                >submit</button> */}
                            </View>
                            
                           
                              
                           </ScrollView>
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
    
    )

}


const items = [] 
 


class EmployeDropdown extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
      //isloading: true,
      
      selectedItem: null,
      
    };
    updateState = updateState.bind(this)
  }

  componentDidMount(){
    db.transaction(tx => {
                            tx.executeSql('SELECT * FROM projectDetails', null,  
                            (txObj,results ) => 
                                {
                                  for (let i = 0; i < results.rows.length; i++) {
                                    let row = results.rows.item(i);
                                    if(items.length != results.rows.length)
                                     { items.push({label:row.project_name,value:row.project_name,color:'#333333'})
                                      }                                    
}
                //console.log(items)
                                //   this.setState({
                                //     isloading: false,
                                //  });
                                } ,
                            (txObj, error) => console.log('Error ', error.message)
                            )   
                        }

                  )
           
  }
  render() {

    const placeholder = {
      label: 'Please Select Client Name..',
      value: null,
      color:'#33333380'
        
      };
  
      return (      

          <RNPickerSelect
                          
                          placeholder={placeholder} 
                          
                          items={items}
                          onValueChange={value => {
                                                    this.setState({
                                                        selectedItem: value,
                                                     });
                                                     localStorage.setItem('dropval',value) ;
                                                    db.transaction(  
                                                     tx=>{ tx.executeSql(  'SELECT client_id,project_id,name FROM projectDetails where project_name = ? ', [value], 

                                                       (txObj,results ) =>  { 
                                                                               localStorage.setItem('clientid', results.rows.item(0).client_id ),
                                                                               localStorage.setItem('clientname', results.rows.item(0).name )
                                                                               console.log(results.rows.item(0).name,results.rows.item(0).project_id ),
                                                                               localStorage.setItem('projid', results.rows.item(0).project_id)
                                                                                } ,
                                                       (txObj, error) => console.log('Error ', error)
                                                 )
                                                                        })
                                                }}

                          style={{
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
                            },
                          iconContainer: {
                              top: responsiveHeight(2),
                              right: responsiveWidth(5),
                          },
                          placeholder:{
                            fontSize:responsiveFontSize(2),
                            color:'#33333350'
                          },
                          inputWeb:{
                            height:responsiveHeight(5), 
                            fontSize:responsiveFontSize(1.1),
                            paddingLeft:responsiveWidth(.5),
                            borderRadius:5 ,
                            borderWidth:0, 
                            color:'#333333'
                            
                          },
                          }}

                         value= {this.state.selectedItem}

                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                          return( 
                          <AntDesign name="down" size={0}  color="#F15A25" />
                              //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                          )}}
          />
      )
    }
} 



 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(.5), 
      alignItems:'center',zIndex:-1,
      marginBottom:responsiveHeight(2)
    },
    whiteCardContainer:{
                            backgroundColor:'#003A59',position:'relative',flex:1,
                            top:20,
                            //left:0,right:0,bottom:0, 
                            alignItems:'center'
                        },
    whiteCard:{
                width:responsiveWidth(60)  ,
                height:responsiveHeight(65) ,
                
              // marginHorizontal:responsiveWidth(20),
                borderRadius:10, 
                marginTop:responsiveHeight(5)  ,         //   WHITE CARD CONTAINER
              } ,
   blueCard:{
              width:responsiveWidth(15)  ,           //   BLUE CARD
              height:responsiveHeight(40), 
              borderRadius:10,
              backgroundColor:'#0079AE', 
              marginLeft: responsiveWidth(1.4),
              marginTop:responsiveHeight(3)  ,
            } ,
   relativeLinkContainer:{
                            backgroundColor:'#006498',
                            borderTopRightRadius:10,
                            borderTopLeftRadius:10,
                            paddingLeft:responsiveWidth(2),
                            flexDirection:'row',
                            alignItems:'center'
                         },
   relativeLink:{
                  color:'#fff', 
                  fontWeight:'bold',
                  paddingVertical:responsiveHeight(2),
                  paddingLeft:responsiveWidth(1),
                  fontSize:responsiveFontSize(1.1)
                  },
   checkStatus:{
                color:'#fff', 
                paddingLeft:responsiveWidth(2),
                fontWeight:'bold',
                paddingVertical:responsiveHeight(2),
                fontSize:responsiveFontSize(.9)
                },
   enterStatus:{
                color:'#fff',
                paddingLeft:responsiveWidth(2),
                fontWeight:'bold',
                paddingVertical:responsiveHeight(2),
                fontSize:responsiveFontSize(.9)
              },
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