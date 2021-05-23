import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Formik } from 'formik';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router-dom';
//import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { ApiInfo } from '../../../ApiEndpoints';
import FormButton from '../../../components/FormButton';
import LeaveDropdown from '../../../components/LeaveTypeDropdown';
import Footer from '../../../components/WebComponents/footer';
//import DateRangePicker from '../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { StaticWordsWeb } from '../../staticwordsFile';
  
 
export default function LeavesWeb(){ 
    
  const history=useHistory();
    const [leaveItems,setLeaveItems]=React.useState([]);
    const [fromDate,setFromDate]=React.useState(new Date().setDate((new Date().getDate()+4)));
    const[toDate,setToDate]=React.useState(new Date().setDate((new Date().getDate()+4)));
  
    
    var timeDiff = Math.abs( new Date(toDate).getTime() - new Date(fromDate).getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));  
     
    
    
    const[totalLeaves,setTotalLeaves]=React.useState(null);

    const validationSchema = Yup.object().shape({
        reason: Yup.string()
          .label('reason')
          .required('Enter reason for leave'),
        contactDetails: Yup.string()
          .label('contactDetails')
          .required('Enter your contact details')
    });
   
    React.useEffect(
      ()=>  { 
               var appraiser_name=JSON.parse(localStorage.getItem('empDetails')).appraiser_name;           
                fetch(ApiInfo.baseUrlForWeb+ApiInfo.leavesDropdownEndpoint,
                                                                                {
                                                                                method :'GET',
                                                                                headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) ,
                                                                                            'accept':'application/json',
                                                                                            'content-type':'application/json'
                                                                                            }
                                                                                
                                                                                }
                    ) 
                    .then(response => response.json())
                    .then(json => {   
                                        if(json.success)
                                        {
                                            console.log(json.data) ;
                                            const temp=[];
                                            let total=0;
                                            for(let i=0;i<json.data.length;i++){
                                                temp.push({label:json.data[i].leave_type,value:json.data[i].leave_type,color:'#333333'})  
                                                total+= (+json.data[i].total_leaves);//here as total leaves in json is a string we are using + unary operator to make it int for type case
                                                
                                            }
                                            
                                            setLeaveItems(temp); 
                                            setTotalLeaves(total);
                                        }
                                        else{
                                        console.log('false')
                                        }

                                    }
                        )
                    .catch(error => console.log(error))
                
                   
           
            },[]
    )
    return(
         <View style={{flex:1}} >
                   
            <View style={{
                           backgroundColor:'#003A59',
                           position:'relative',
                           flex:1
                        
                        }}
            >
                <SecondHeaderButtons/>
               
                <View style={{alignItems:'center',flexGrow:1}}>
               
                    <Card style={{
                                    width:responsiveWidth(63)  ,
                                    borderRadius:10, 
                                    marginTop:responsiveHeight(6)  ,            // WHITE CARD
                                    alignSelf:'center',
                                    flexGrow:1
                                }}
                    >
                                    
                        <View style={{flexDirection:'row'}}>           
                        
                            <Card style={{
                                            width:responsiveWidth(15)  ,
                                            height:responsiveHeight(25), 
                                            borderRadius:10,
                                            backgroundColor:'#0079AE', 
                                            marginLeft: responsiveWidth(1.4),
                                            marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                            
                                    }}> 
                                <View style={{  //backgroundColor:'#006498',
                                                borderTopRightRadius:10,
                                                borderTopLeftRadius:10, 
                                                flexDirection:'row',
                                                alignItems:'center',
                                                paddingLeft:responsiveWidth(1),
                                                        }}>
                                                        
                                        <Text style={{color:'#fff', 
                                            fontWeight:'bold',
                                            paddingVertical:responsiveHeight(2), 
                                            fontSize:responsiveFontSize(1.1)
                                            }} >
                                            {StaticWordsWeb.LeavesPage.appraiser} {JSON.parse(localStorage.getItem('empDetails')).appraiser_name} 
                                        </Text>  
                                </View>
                                <View >
                                        <Text style={{   color:'#fff',  
                                                            fontWeight:'bold',
                                                            paddingVertical:responsiveHeight(2),
                                                            fontSize:responsiveFontSize(1.1),
                                                            paddingLeft:responsiveWidth(1),
                                                        }} >
                                            {StaticWordsWeb.LeavesPage.total_leaves} {totalLeaves} 
                                            </Text>  
                                </View>
                                {/* <View //style={{backgroundColor:'#0085BF' }}
                                                                        
                                >
                                        <Text style={{   color:'#fff', 
                                                            fontWeight:'bold',
                                                            paddingVertical:responsiveHeight(2),
                                                            fontSize:responsiveFontSize(1.1),
                                                            paddingLeft:responsiveWidth(1),
                                            }} >
                                                Pending Leaves : 3 
                                            </Text>  
                                </View> */}
                            </Card> 
                           
                            <View style={{marginHorizontal: responsiveWidth(3),
                                    marginTop:responsiveHeight(3)}}>
                                
                                 <View style={{flexDirection:'row',justifyContent:'space-between'
                                                              }}>
                                                    <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                      <Image source={require('../../../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                        <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                          Welcome {localStorage.getItem('loginUserName')}
                                                          </Text> 
                                                    </View>
                                                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                       <Text style={{fontWeight:'500'}}> 
                                                            <Text onPress={()=>history.push('/home')}>Home / </Text><Text style={{color:'#F15A25'}}>Leaves</Text>
                                                       </Text>
                                                    </View>
                                                    
                                 </View> 

                                
                                
                            <Formik 
            
                            initialValues={{ reason: '', contactDetails: '' }} //must required to store form intitial values else after writing the field wont keep the values in the field
                            
                            onSubmit={
                                        (values,{resetForm})=>{   
                                            // console.log(localStorage.getItem('username'))
                                            // console.log(localStorage.getItem('password'))
                                                    
                                                    localStorage.getItem('leaveSelected')==null
                                                        ?
                                                        alert('Select Leave Type Dropdown')
                                                        :
                                                        fetch(ApiInfo.baseUrlForWeb+ApiInfo.leaveApplyEndpoint,
                                                            {
                                                                method:'POST',
                                                                headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) ,
                                                                            'accept':'application/json',
                                                                        'content-type':'application/json'
                                                                        },
                                                                body : JSON.stringify({
                                                                                            "emp_id" :JSON.parse(localStorage.getItem('empDetails')).emp_id, //localStorage.getItem('empid'),
                                                                                            "total_days" : String(diffDays+1)  ,
                                                                                            "from_date" :String(new Date(fromDate).getFullYear()+'/'+(new Date(fromDate).getMonth()+1)+'/'+new Date(fromDate).getDate() ),
                                                                                            "to_date" : String(new Date(toDate).getFullYear()+'/'+(new Date(toDate).getMonth()+1)+'/'+new Date(toDate).getDate() )  ,
                                                                                            "reason" : values.reason,
                                                                                            "contact_details" :values.contactDetails,
                                                                                            "leave_category" : localStorage.getItem('leaveSelected'),
                                                                                            "status" :StaticWordsWeb.LeavesPage.leaveApplyEndpoints_body_status//ask and change it          
                                                                                        })
                                                            }
                                                            )
                                                            .then(response => response.json())
                                                            .then(json => {  
                                                                            if(json.success){
                                                                                
                                                                                
                                                                                    localStorage.removeItem('leaveSelected');
                                                                                
                                                                                    alert('You have successfully applied leave.');
                                                                                    
                                                                                    resetForm();
                                                                                    history.push('/home');
                                                                                 //   navigation.navigate('Home');
                                                                                    
                                                                                    //console.log(json)

                                                                            } 
                                                                            else
                                                                            alert('Your leave has not been approved yet till that you can not apply.');
                                                                        }
                                                                )
                                                            .then(error => console.log(error))
                                                    
                                                }
                                    }
                            validationSchema={validationSchema}
                            >
                             {({ handleChange, values, handleSubmit,errors,touched,handleBlur}) => (
                        
                                 <Card style={{  
                                                    width:responsiveWidth(42)  ,
                                                    height:responsiveHeight(62),
                                                    borderRadius:10,
                                                    backgroundColor:'#F3F1F1', 
                                                    paddingLeft:responsiveWidth(2), 
                                                    marginTop:responsiveHeight(1)  ,             //FORM CARD CONTAINER
                                              }}
                                 >
                                <ScrollView  style={{paddingRight:responsiveWidth(2)}}>

                                    <Text style={{fontWeight:'700',
                                                fontSize:responsiveFontSize(1.5),
                                                color:'#333333',
                                                marginTop:responsiveHeight(2),
                                                marginBottom:responsiveHeight(3)
                                                }}>
                                    {StaticWordsWeb.LeavesPage.header}
                                    </Text>

                                    <View style={{  justifyContent:'space-between',
                                                    flexDirection:'row',           alignItems:'center',
                                                    
                                                    marginBottom:'1%',
                                                    }}
                                        > 
                                            
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                            
                                            <View style={{flexDirection:'row'}}> 
                                            {/* time picker container */}
                                            
                                                    <KeyboardDatePicker  // time picker for START TIME
                                                            label="From"
                                                            fullWidth
                                                            onChange={(value)=>{setFromDate(value)}}
                                                            format="dd/MM/yyyy"
                                                            variant='inline'
                                                            minDate={new Date().setDate((new Date().getDate()+4))}
                                                            style={{ 
                                                                    backgroundColor:'#fff',
                                                                    width:responsiveWidth(13),
                                                                    padding:10,
                                                                    height:responsiveHeight(8),
                                                                    paddingTop:0,
                                                                    marginTop:0,
                                                                    borderRadius:5,
                                                                    
                                                                }}
                                                                InputProps={{
                                                                    disableUnderline: true
                                                                  }}
                                                            value={fromDate} 
                                                            
                                                    />
                                            
                                                    <KeyboardDatePicker   // time picker for End TIME
                                                            label="To"
                                                            onChange={ (value)=>{setToDate(value)} } 
                                                            variant="dialog"
                                                            format="dd/MM/yyyy"
                                                            minDate={new Date().setDate((new Date().getDate()+4))}
                                                            fullWidth
                                                            style={{
                                                                    backgroundColor:'#fff',
                                                                    width:responsiveWidth(13),
                                                                    padding:10,
                                                                    height:responsiveHeight(8),
                                                                    paddingTop:0,
                                                                    marginTop:0,
                                                                    marginLeft:responsiveWidth(1) ,
                                                                    borderRadius:5,
                                                                    
                                                                }}
                                                        InputProps={{
                                                            disableUnderline: true
                                                            }}
                                                        value={toDate} 
                                                            
                                                    />
                                                    
                                                    
                                            </View>
                                                                    
                                        </MuiPickersUtilsProvider>
        
                                
                                            <TextInput
                                                placeholder={Number.isNaN(diffDays)?null:'Total Days : '+(diffDays+1)}
                                                editable={false}
                                                placeholderTextColor='#ee4000' 
                                                style={{
                                                        backgroundColor:'#fff',           
                                                        width:responsiveScreenWidth(9),
                                                        marginLeft:responsiveScreenWidth(0), borderWidth:1,                        
                                                        height:responsiveHeight(8) ,borderColor:'#ECECEC',
                                                        borderRadius:5,  
                                                        fontSize:responsiveFontSize(1.2),textAlign:'center',
                                                        fontWeight:'500'

                                                        }}  
                                            />
                                        </View> 
                                        
                                    <View style={{marginTop:'2%',
                                                marginBottom:'2%',
                                            // zIndex:-1
                                                }}
                                    > 
                                    <LeaveDropdown leaveItems={leaveItems} /> 

                                    </View>  
                                    <View style={{ marginBottom:'1%',zIndex:-1
                                            }}> 
                                                                                                    
                                        <TextInput   
                                            placeholder='Please Enter Reason' 
                                            
                                            placeholderTextColor='#33333380'
                                            multiline
                                            value={values.reason}
                                            style={{
                                                    textAlignVertical:'top',
                                                    borderColor:'#ECECEC',
                                                    borderWidth:1,
                                                    paddingTop:13, 
                                                    fontWeight:'400',fontSize:responsiveFontSize(1.2),
                                                    backgroundColor:'#fff' , 
                                                    marginTop:5,
                                                    height:responsiveScreenHeight(15),  
                                                    borderRadius:5, paddingLeft:13, 
                                            }} 
                                            onBlur={handleBlur('reason')}
                                            onChangeText={handleChange('reason')} 
                                        />
                                        <Text style={{color:'red'}}>                                                                     
                                            { errors.reason}
                                        </Text> 
                                    </View> 
                                    <View style={{ marginBottom:'1%',   zIndex:-1
                                            }}> 
                                                                                                    
                                        <TextInput  
                                            keyboardType='visible-password'
                                            placeholder='Contact Details' 
                                            placeholderTextColor='#33333380'
                                            multiline
                                            value={values.contactDetils}
                                            style={{
                                            textAlignVertical:'top',
                                            borderColor:'#ECECEC',
                                            borderWidth:1,
                                            paddingTop:13, 
                                            fontWeight:'400',
                                            backgroundColor:'#fff' , 
                                            marginTop:5,
                                            height:responsiveScreenHeight(15),  
                                            borderRadius:5, paddingLeft:13, fontSize:responsiveFontSize(1.2),
                                            }} 
                                            onBlur={handleBlur('contactDetails')}
                                            onChangeText={handleChange('contactDetails')} 
                                        />
                                        <Text style={{color:'red'}}>                                                                     
                                            { errors.contactDetails}
                                        </Text>
                                    </View> 
                                
                                    <View style={styles.buttonContainer}>                                   
                                    <FormButton
                                    buttonType='solid'
                                    // type='submit' see if needed in future
                                    onPress={handleSubmit}  //it calls the onSubmit(line:246) method passing the form value in object form
                                    title='SUBMIT' 
                                    titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                    buttonStyle={{ backgroundColor:'#F15A25', borderRadius:20,
                                                    paddingVertical:responsiveHeight(1) 
                                                                    
                                                }} 
                                                containerStyle={{width:responsiveScreenWidth(10),
                                                marginTop:responsiveScreenHeight(1)}} 
                                    buttonColor='#a3f1ff'  
                                    />
                                </View>
                                </ScrollView>
                            </Card> 
                            
                            )}
                        
                        </Formik>    
                        
                        </View>
                    
                        </View> 
                    </Card>   
                    
                    <Footer/>
                
                </View>
           
            </View> 
         </View> 
    
        
     )
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(2), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 