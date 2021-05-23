import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo } from '../../ApiEndpoints';
import { PageBackground } from '../../assets/Color Constants/WebColors';
import FormButton from '../../components/FormButton';
import Footer from '../../components/WebComponents/footer';
//import MyDatePicker from '../../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../components/WebComponents/SecondHeaderButtons';
import { HomePageBlueCard } from '../../components/WebComponents/SidebarNavigatonComponents/Homepage';

//const db = SQLite.openDatabase('db.testDb1')

// const DarkCyanActiveColor='#0079AE'
// const DarkCyanInactiveColor='#0085BF'

export default function ProfileWeb(){

    const [formValue,setValue]=React.useState(null);
    const [loaded,setLoading]=React.useState(false);
    
    const  handleReject = ()=>{
        confirm("Want to Reject ?")?alert("reject"):null
        
    }
    const  handleAccept = ()=>{
        confirm("Want to Accept ?")?alert("accept"):null
         
    }
 
   
    React.useEffect(() => { 
    
        setLoading(false);
        fetch(ApiInfo.baseUrlForWeb+ApiInfo.leaveStatusInHomepageEndpoint , 
            { method:'GET', 
              headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username")+ ':' + localStorage.getItem("password")),
                        'accept':'application/json',
                        'content-type':'application/json' 
                      }
              
            }
        )
        .then(response => response.json())
        .then(json => { 
                            for(let i=0;i<json.data.length;i++)
                            {
                                if(json.data[i].emp_id==localStorage.getItem("selectedEmpId"))
                                {
                                    setValue(json.data[i]) 
                                    setLoading(true)
                                }
                            }     
            
                      }
        )
        
     }, []
    );
 
    return(
          
        <View style={{flex:1 ,paddingTop:'1%'}} >

            <SecondHeaderButtons  />{/*change it int style */}
                   
            <View 
                        style={{   
                                    backgroundColor:PageBackground.MidnightBlue,
                                    position:'relative',
                                    flex:1,
                                    top:20,
                                    //left:0,right:0,bottom:0, 
                                    alignItems:'center'
                              }}
            >
                                 
                <Card 
                        style={{
                              width:responsiveWidth(60)  ,
                              height:responsiveHeight(65) ,
                               
                             // marginHorizontal:responsiveWidth(20),
                              borderRadius:10, 
                              marginTop:responsiveHeight(5)  ,            // WHITE CARD
                            }}
                >
                    {
                        loaded
                        
                        ? 
                    
                        <ScrollView>               
                    
                            <View style={{flexDirection:'row', }}>           
                            
                                    {HomePageBlueCard.AllTabLinks()}

                                <View style=
                                                {{
                                                    marginHorizontal: responsiveWidth(3),
                                                    marginTop:responsiveHeight(3)
                                                }}
                                    >
                                    <Text style={{fontWeight:'500'}}> <Text >Home</Text><Text > / Applied Leaves /</Text><Text style={{color:'#F15A25'}}>Leave Details</Text></Text>
                                    <Formik 
                                        //in home and leave apply  link for home and leave table
                                        initialValues={{  p_contact_num:'',
                                                    branch_name:'',acc_num:'',acc_holder_name:'', 
                                                    ifsc:'',bank_name:``,pan_num:'',s_contact_num:'',
                                                    current_address:'',permanent_address:''
                                                    }} //must required to store form intitial values else after writing the field wont keep the values in the field
                                
                                
                                    >
                                
                                    {({ handleChange, values, handleSubmit,errors,touched,handleBlur}) => (
                            
                                        <Card 
                                            style={{  
                                                    width:responsiveWidth(38)  ,
                                                    height:responsiveHeight(55),
                                                    borderRadius:10,
                                                    backgroundColor:'#F3F1F1', 
                                                    paddingLeft:responsiveWidth(2),
                                                    //paddingRight:responsiveWidth(2),
                                                    marginTop:responsiveHeight(2)  ,             //FORM CARD CONTAINER
                                                    }}
                                        >
                                            <ScrollView 
                                                        style={{paddingRight:responsiveWidth(2)}}
                                            >
                                                <Text 
                                                        style={{fontWeight:'700',
                                                            fontSize:responsiveFontSize(1.5),
                                                            color:'#333333',
                                                            marginTop:responsiveHeight(2),
                                                            marginBottom:responsiveHeight(3)
                                                            }}>

                                                    Leave Details

                                                </Text>
                                                
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-2
                                                            }} 
                                                >
                                                    <TextInput 
                                                                placeholder={`Name : ${formValue.name} `} 
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>

                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-1
                                                            }}
                                                >
                                                    <TextInput 
                                                                placeholder={`Email Id : ${formValue.email_id} `}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-2
                                                            }} 
                                                >
                                                    <TextInput 
                                                                placeholder={`Appraiser Name : ${formValue.appraiser_name} `} 
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>

                                                <View style={{  marginTop:'2%',
                                                                marginBottom:'2%',
                                                                flexDirection:'row',
                                                                justifyContent:'space-between',
                                                                zIndex:-1
                                                            }}
                                                > 

                                                    <TextInput 
                                                                placeholder={`Leaves :  ${formValue.remaining_leaves}`}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                //value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) ,                                                                width:responsiveWidth(15), 
                                                                                width:responsiveWidth(15.5), 

                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                
                                                    />
                                                    <TextInput 
                                                                placeholder={`Leave Type : ${formValue.leave_category}`}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                //value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) ,
                                                                                width:responsiveWidth(15.5), 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                // onBlur={handleBlur('email')}
                                                                // onChangeText ={handleChange('email')} 
                                                    /> 
                                                {/* <MyDatePicker placeholder='Last Appraisal Date' />
                                                <MyDatePicker placeholder='Next Appraisal Date'/> */}
                                                
                                                </View>
                                                <View style={{  marginTop:'2%',
                                                                marginBottom:'2%',
                                                                flexDirection:'row',
                                                                justifyContent:'space-between',
                                                                zIndex:-1
                                                            }}
                                                > 

                                                    <TextInput 
                                                                placeholder={`From : ${formValue.from_date}`}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                //value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) ,                                                                width:responsiveWidth(15), 
                                                                                width:responsiveWidth(15.5), 

                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                // onBlur={handleBlur('email')}
                                                                // onChangeText ={handleChange('email')} 
                                                    />
                                                    <TextInput 
                                                                placeholder={`To : ${formValue.to_date} `}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                //value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) ,
                                                                                width:responsiveWidth(15.5), 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                // onBlur={handleBlur('email')}
                                                                // onChangeText ={handleChange('email')} 
                                                    /> 
                                                    
                                                
                                                </View>
                                        
                                                
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-1
                                                            }}
                                                >
                                                    <TextInput 
                                                                placeholder={`Total Days : ${formValue.total_days}`}
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }                              
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-1
                                                            }}
                                                >
                                                    <TextInput 
                                                                placeholder={`Reason : ${formValue.reason}`} 
                                                                editable={false}
                                                                placeholderTextColor={'#333333' }  
                                                            multiline                            
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(15) , 
                                                                                paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-1
                                                            }}
                                                >
                                                    <TextInput 
                                                                placeholder={`Contact Details : ${formValue.contact_details}`} 
                                                                placeholderTextColor={'#333333' }
                                                                editable={false}     
                                                                multiline                         
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                            
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                borderRadius:5, 
                                                                                height:responsiveHeight(15),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>
                                                <View 
                                                    style={{  
                                                            marginBottom:'2%',   zIndex:-2
                                                            }} 
                                                >
                                                    <TextInput 
                                                                placeholder={`Reason For Rejection :`} 
                                                            multiline
                                                                placeholderTextColor={'#333333' }                              
                                                                value={values.email}
                                                                style         ={{borderColor:'#ECECEC',  
                                                                                paddingVertical:3,
                                                                                backgroundColor:'#fff',
                                                                                height:responsiveHeight(5) , 
                                                                                // borderColor: '#DEDEDE', 
                                                                                borderWidth: 1 ,
                                                                                height:responsiveHeight(15),

                                                                                borderRadius:5, 
                                                                                paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                fontSize:responsiveFontSize(1),
                                                                                // borderColor: this.state.borderColor
                                                                                }} 
                                                                onBlur={handleBlur('email')}
                                                                onChangeText ={handleChange('email')} 
                                                    />
                                                </View>

                                                
                                            
                                            
                                                
                                                <View style={styles.buttonContainer}>                                   
                                                    <FormButton
                                                    buttonType='solid'
                                                    // type='submit' see if needed in future
                                                    onPress={()=>confirm("Are you sure you want to Accept ?")?
                                                                    ( fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.rejectLeaveEndpoint,{"id":String(formValue.leave_id),"mode":"accept" }),
                                                                    {
                                                                    method:'POST',
                                                                    headers:{
                                                                    'Authorization': 'Basic ' +btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password")),
                                                                    'accept':'application/json',
                                                                    'content-type':'application/json'
                                                                
                                                                    }
                                                                    }
                                                                    )
                                                                    .then(response => response.json())
                                                                    .then(json => {   
                                                                                    
                                                                        alert(json.data.msg)
                                                                        console.log(json)
                                                                    }
                                                                        )
                                                                    ):null
                                                    }  //it calls the onSubmit(line:246) method passing the form value in object form
                                                    title='ACCEPT' 
                                                    titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                                    buttonStyle={{ backgroundColor:'#F15A25', borderRadius:20,
                                                                    paddingVertical:responsiveHeight(1) 
                                                                                    
                                                                }} 
                                                                containerStyle={{width:responsiveScreenWidth(10),
                                                                marginTop:responsiveScreenHeight(1)}} 
                                                    buttonColor='#a3f1ff'  
                                                    />
                                                    <FormButton
                                                    buttonType='solid'
                                                    // type='submit' see if needed in future
                                                    onPress={()=> confirm("Are you sure you want to Reject ?")?
                                                                    ( fetch( withQuery(ApiInfo.baseUrlForWeb+ApiInfo.rejectLeaveEndpoint,{"id":String(formValue.leave_id),"mode":"reject" }),
                                                                    {
                                                                    method:'POST',
                                                                    headers:{
                                                                    'Authorization': 'Basic ' +btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password")),
                                                                    'accept':'application/json',
                                                                    'content-type':'application/json'
                                                                
                                                                    }
                                                                    }
                                                                    )
                                                                    .then(response => response.json())
                                                                    .then(json => {   
                                                                                    
                                                                            alert(json.data.msg)
                                                                            console.log(json)
                                                                                }
                                                                        )
                                                                    ):null
                                                    }  //it calls the onSubmit(line:246) method passing the form value in object form
                                                    title='REJECT' 
                                                    titleStyle={{fontSize:responsiveFontSize(1),color:'#F15A25',fontWeight:'bold'}}
                                                    buttonStyle={{ backgroundColor:'transparent',
                                                                    borderRadius:20,
                                                                    paddingVertical:responsiveHeight(1),
                                                                    borderColor:'#F15A25',
                                                                    borderWidth:2,
                                                                                    
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
                        
                        </ScrollView> 
                        
                        :
                        
                        <ActivityIndicator/>
                    }

                </Card>   
                 
                <Footer/>
           
            </View> 
            
         </View> 
     )
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(2), 
      marginBottom:responsiveHeight(5), 
      flexDirection:'row', 
      justifyContent:'space-around' 
    }
     
  }) 

