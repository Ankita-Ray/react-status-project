import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
//import * as SQLite from 'expo-sqlite';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo, PrintPreviewPage } from '../../ApiEndpoints';
import { RelativeLinkColors } from '../../assets/Color Constants/WebColors';
import FormButton from '../../components/FormButton';
import Footer from '../../components/WebComponents/footer';
//import DateRangePicker from '../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../components/WebComponents/SecondHeaderButtons';
import { StaticWordsWeb } from '../staticwordsFile';
 


//const db = SQLite.openDatabase('db.testDb1')

export default function AppraisalForm(){
   
    //const {appraisal_id,emp_name}= route.params;
    const [lines, setLines] = React.useState([]);
    const [item,setItem]=React.useState(0)
    const [name,setName]=React.useState("")
    const [email,setEmail]=React.useState("")
    
    const [candidate_info,set_candidate_info]=React.useState("");
    const [isLoaded,setLoading]=React.useState(false); 
    const [objectives_list,setObjectivesList]=React.useState([]); 
    const [selectedRatings,setRatings]=React.useState("")
    const [designation,setDesignation]=React.useState("")
    const [joiningDate,setJoiningDate]=React.useState("")
    const [appraisal_date,setAppraisal_date]=React.useState("")
    const [appraiser_name,setAppraisal_name]=React.useState("")
    const [appraisalInfo,setAppraisalInfo]=React.useState("");
    const [future_targets,setFuture_targets]=React.useState([]);
    const [last_appraisal_achievement,setLast_appraisal_achievement]=React.useState([]); 
    const [future_targets_loaded,setFuture_targets_loadedTrue]=React.useState(false);
    React.useEffect(
                  
        ()=> {
              //  localStorage.getItem('password')==null?navigation.navigate('Login'):null        ***do it

              //  localStorage.getItem('showOrNot_AppraisalForm_At_HR')=='flase'?navigation.navigate('Home'):null;   ** do it

                 // localStorage.getItem('loggedOut')=='true'?( navigation.goBack(), localStorage.setItem('loggedOut','false')):null     
                 var emp_details=JSON.parse(localStorage.getItem('empDetails'));
                      
                 setName(emp_details.name),
                 setEmail(emp_details.email_id),
                 setJoiningDate(emp_details.joining_date),
               
                 setDesignation(emp_details.designation),
                 
                 setAppraisal_date(emp_details.next_appraisal_date),
                 setAppraisal_name(emp_details.appraiser_name)
                
                //  db.transaction(tx => {
                //     // sending 4 arguments in executeSql
                //     tx.executeSql('SELECT * FROM statusInfo', null, // passing sql query and parameters:null
                //       // success callback which sends two things Transaction object and ResultSet Object
                //       (txObj,results ) => 
                //          {
                //             var len = results.rows.length;
                //             for (let i = 0; i < len; i++) {
                //               let row = results.rows.item(i);
                                
                //                   setName(row.name),
                //                   setEmail(row.email_id),
                //                console.log(row.name)
                //                   setJoiningDate(row.joining_date),
                                 
                //                   setDesignation(row.designation),
                                  
                //                   setAppraisal_date(row.next_appraisal_date),
                //                   setAppraisal_name(row.appraiser_name)
                                  
                //             }
                //          } ,
                //       (txObj, error) => console.log('Error ', error)
                //       )  
                //   })
                 
                // fetch(ApiInfo.baseUrlForWeb + ApiInfo.objectivesEndpoint , 
                //     { method:'GET', 
                //       headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username")+ ':' + localStorage.getItem("password")),
                //                 'accept':'application/json',
                //                 'content-type':'application/json' 
                //               }
                      
                //     }
                // )
                // .then(response => response.json())
                // .then(json => { 
                //                 if(json.success){
                //                   // setObjectivesList([])
                //                     for(let i=0;i<json.data.length;i++){
                //                       objectives_list.push({"target_id":json.data[i].objectives_id ,"emp_rating":'',"name":json.data[i].objectives}) 
                //                     }
                //                     console.log(objectives_list)
                //                    setLoading(true)
                //                 }
                //              }
                //      )
                fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.getAppraisalData,
                                { 
                                  "appraisal_id": localStorage.getItem('appraisal_id')//205
                                }
                               ), 
                { method:'GET', 
                  headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username")+ ':' + localStorage.getItem("password")),
                            'accept':'application/json',
                            'content-type':'application/json' 
                          }
                  
                }
              )
              .then(response => response.json())
              .then(json => { 
                              if(json.success){  
                                setAppraisalInfo(json.data.appraisal_info);
                                
                                set_candidate_info(json.data.candidate_info);
                               console.log(json.data)
                                for(let i=0;i<json.data.future_targets.length;i++)
                                {
                                    future_targets.push({target:json.data.future_targets[i].objectives});
                                    i==(json.data.future_targets.length-1)?setFuture_targets_loadedTrue(true):null 
                                }
                                for(let i=0;i<json.data.last_appraisal_achievement.length;i++)
                                {
                                    last_appraisal_achievement.push({
                                      name:json.data.last_appraisal_achievement[i].objectives,
                                      target_id:json.data.last_appraisal_achievement[i].objectives_id ,
                                      emp_rating:json.data.last_appraisal_achievement[i].your_rate,
                                      appraiser_rate:json.data.last_appraisal_achievement[i].your_rate
                                  });
                                   i==(json.data.future_targets.length-1)?setLoading(true):null 
                                } 
                                console.log(last_appraisal_achievement);
                              } 
                            }
                  )
              } ,[]    
    ) 
 
     return(
          
        <View style={{flex:1 ,paddingTop:'1%'}} >
           
            <SecondHeaderButtons/>
                   
            <View style={{backgroundColor:'#003A59',position:'relative',flex:1,
                          top:20,
                          //left:0,right:0,bottom:0, 
                          alignItems:'center'}}>
                <Card style={{
                              width:responsiveWidth(60)  ,
                              height:responsiveHeight(65) ,
                               
                             // marginHorizontal:responsiveWidth(20),
                              borderRadius:10, 
                               paddingBottom:responsiveHeight(2),
                              marginTop:responsiveHeight(5)  ,            // WHITE CARD
                            }}>
               
                {isLoaded || future_targets_loaded?
                
                 <ScrollView>              
                
                    <View style={{flexDirection:'row', }}>           
                    
                        <Card style={{
                                            width:responsiveWidth(15)  ,
                                            height:responsiveHeight(26.6), 
                                            borderRadius:10,
                                            backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
                                            marginLeft: responsiveWidth(1.4),
                                            marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                            
                                      }}> 
                                      <View style={{  backgroundColor:RelativeLinkColors.HeaderTealt,
                                                      borderTopRightRadius:10,
                                                      borderTopLeftRadius:10, 
                                                      flexDirection:'row',
                                                      alignItems:'center',
                                                      paddingLeft:responsiveWidth(2),
                                                  }}>
                                                  
                                                <FontAwesome5 name="link" size={16} color="#fff"  />                          
                                                <Text style={{color:'#fff', 
                                                              fontWeight:'bold',
                                                              paddingVertical:responsiveHeight(2), 
                                                              fontSize:responsiveFontSize(1.1),
                                                              paddingLeft:responsiveWidth(1),
                                                
                                                              }} >
                                                  {StaticWordsWeb.relativeLinkHeaders.relativeLink}
                                                </Text>  
                                      </View>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                        //onPress={()=>navigation.navigate('CheckStatusWeb')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                  {StaticWordsWeb.relativeLinkHeaders.checkStatus}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                       // onPress={()=>navigation.navigate('EnterStatusWeb')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                      {StaticWordsWeb.relativeLinkHeaders.enterStatus}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                      //  onPress={()=>navigation.navigate('Leaves')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                      {StaticWordsWeb.relativeLinkHeaders.leaves}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                       // onPress={()=>navigation.navigate('Profile')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                    {StaticWordsWeb.relativeLinkHeaders.profile}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{ 
                                                                backgroundColor:RelativeLinkColors.InactiveDarkCyan ,
                                                                  
                                                              }}
                                                       // onPress={()=>navigation.navigate('Change Password')}                      
                                      >
                                                <Text style={{   color:'#fff', 
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                                  
                                                  }} >
                                                      {StaticWordsWeb.relativeLinkHeaders.changePassword}
                                                  </Text>  
                                      </TouchableOpacity>
                                  
                                      <TouchableOpacity style={{ 
                                                                backgroundColor:RelativeLinkColors.InactiveDarkCyan ,
                                                                }}
                                                      //  onPress={()=>navigation.navigate('Notification')}                      
                                      >
                                                <Text style={{   color:'#fff', 
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                                  
                                                  }} >
                                                      {StaticWordsWeb.relativeLinkHeaders.notifications}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                      //  onPress={()=>navigation.navigate('Holidays')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                      {StaticWordsWeb.relativeLinkHeaders.holidays}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                      //  onPress={()=>navigation.navigate('Contacts')}
                                      >
                                                <Text style={{   color:'#fff',  
                                                                  fontWeight:'bold',
                                                                  paddingVertical:responsiveHeight(2),
                                                                  fontSize:responsiveFontSize(.9),
                                                                  paddingLeft:responsiveWidth(2),
                                                              }} >
                                                    
                                                    {StaticWordsWeb.relativeLinkHeaders.contacts}
                                                  </Text>  
                                      </TouchableOpacity>
                                      <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan , borderBottomStartRadius:10,
                                                          borderBottomEndRadius:10}}
                                                //  onPress={()=>navigation.navigate('Policy')}
                                >
                                          <Text style={{   color:'#fff',  
                                                            fontWeight:'bold',
                                                            paddingVertical:responsiveHeight(2),
                                                            fontSize:responsiveFontSize(.9),
                                                            paddingLeft:responsiveWidth(2),
                                                        }} >
                                                {StaticWordsWeb.relativeLinkHeaders.policy}
                                            </Text>  
                                </TouchableOpacity>
                              
                              </Card> 
                                      
                        <View style={{marginHorizontal: responsiveWidth(3),
                                   marginTop:responsiveHeight(3)}}>
                           <Text style={{fontWeight:'500'}}>
                             <Text >
                               Home / </Text> 
                             <Text style={{color:'#F15A25'}}>Pending Appraisal Form at HR</Text>
                           </Text>
                         
                        <Card style={{  
                              width:responsiveWidth(38)  ,
                              height:responsiveHeight(55),
                               borderRadius:10,
                              backgroundColor:'#F3F1F1', 
                                marginTop:responsiveHeight(2)  , 
                                padding:10            //FORM CARD CONTAINER
                            }}>
                          <ScrollView showsVerticalScrollIndicator={true}  style={{paddingRight:responsiveWidth(1),paddingLeft:responsiveWidth(1)}}>
                            <Text 
                                        style={{fontWeight:'700',
                                              fontSize:responsiveFontSize(1.5),
                                              color:'#333333',
                                              marginTop:responsiveHeight(2),
                                              marginBottom:responsiveHeight(3)
                                            }}>

                               {StaticWordsWeb.AppraisalFormPage.formHeader}   
                           </Text>

                            <View 
                                        style={{  
                                                marginBottom:'2%',
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Status : ${appraisalInfo.status}`}
                                                   // value={}    
                                                    placeholderTextColor={'#333333' }   
                                                                              
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(5) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                   // alignSelf:'center',
                                                                   textAlign:'center',
                                                                   fontWeight:'500',
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    
                                        />
                            </View>
                            <View 
                                style={{  
                                        marginBottom:'2%',
                                        }}
                            >
                                <TextInput 
                                            placeholder={`Name : ${candidate_info.name}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                            
                                                            textAlign:'center',
                                                            fontWeight:'500',
                                                            borderWidth: 1 ,
                                                            borderRadius:5, 
                                                            paddingLeft:responsiveScreenWidth(.9),
                                                            fontSize:responsiveFontSize(1),
                                                            // borderColor: this.state.borderColor
                                                            }} 
                                            
                                />
                            </View>
                            <View 
                                        style={{  
                                                marginBottom:'2%',
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Email id : ${candidate_info.email_id}`}
                                                    editable={false}      
                                                    placeholderTextColor={'#333333' }                               
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(5) , 
                                                                    
                                                                    textAlign:'center',
                                                                    fontWeight:'500',// borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    
                                        />
                            </View>
                            <View 
                                style={{  
                                        marginBottom:'2%',
                                        }}
                            >
                                <TextInput 
                                            placeholder={`Designation : ${candidate_info.designation}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            
                                                            textAlign:'center',
                                                            fontWeight:'500',// borderColor: '#DEDEDE', 
                                                            borderWidth: 1 ,
                                                            borderRadius:5, 
                                                            paddingLeft:responsiveScreenWidth(.9),
                                                            fontSize:responsiveFontSize(1),
                                                            // borderColor: this.state.borderColor
                                                            }} 
                                            
                                />
                            </View>
                            <View 
                                style={{  
                                        marginBottom:'2%',
                                        }}
                            >
                                <TextInput 
                                            placeholder={`Joining Date :  ${candidate_info.joining_date}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                            
                                                            textAlign:'center',
                                                            fontWeight:'500',borderWidth: 1 ,
                                                            borderRadius:5, 
                                                            paddingLeft:responsiveScreenWidth(.9),
                                                            fontSize:responsiveFontSize(1),
                                                            // borderColor: this.state.borderColor
                                                            }} 
                                            
                                />
                            </View>
                            <View 
                                style={{  
                                        marginBottom:'2%',
                                        }}
                            >
                                <TextInput 
                                            placeholder={`Appraisal Date : ${candidate_info.next_appraisal_date}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                            
                                                            textAlign:'center',
                                                            fontWeight:'500',borderWidth: 1 ,
                                                            borderRadius:5, 
                                                            paddingLeft:responsiveScreenWidth(.9),
                                                            fontSize:responsiveFontSize(1),
                                                            // borderColor: this.state.borderColor
                                                            }} 
                                            
                                />
                            </View>
                            <View 
                                style={{  
                                        marginBottom:'2%',
                                        }}
                            >
                                <TextInput 
                                            placeholder={`Appraiser Name : ${candidate_info.appraiser_name}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                           
                                                            textAlign:'center',
                                                            fontWeight:'500', borderWidth: 1 ,
                                                            borderRadius:5, 
                                                            paddingLeft:responsiveScreenWidth(.9),
                                                            fontSize:responsiveFontSize(1),
                                                            // borderColor: this.state.borderColor
                                                            }} 
                                            
                                />
                            </View>
                            
                            <View 
                                    style={{  
                                            marginVertical:responsiveHeight(2),   zIndex:-2
                                            }}
                                >
                                 <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                   {StaticWordsWeb.AppraisalFormPage.past_year_experience.header}
                                 </Text>
                            </View>	
                            
                            <Formik 
                          
                                    initialValues={{   past_year_experience:appraisalInfo.past_year_description,
                                                       past_year_achievements:appraisalInfo.importent_achievement,
                                                       likes_dislikes:appraisalInfo.like_dislike,
                                                       other_issues:appraisalInfo.any_issues, 
                                                       next_appraisal_targets:future_targets_loaded?future_targets:[]  ,
                                                       prev_appraisal_targets:isLoaded?last_appraisal_achievement:null
                                                      
                                                      
                                                  }} //must required to store form intitial values else after writing the field wont keep the values in the field
                                    // onReset={handleReset} this also works for resetting the form
                                    onSubmit={(values)=>
                                            {
                                              alert(JSON.stringify(values))
                                                  
                                            }
                                      }
                            >
                              {
                                ({ handleChange, values,isSubmitting,setFieldValue,
                                  handleSubmit,setValues,errors,touched,handleBlur
                                    
                                }) => (
                                        <Form> 


                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question1}
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput  
                                                          value={values.past_year_experience}
                                                          editable={false}
                                                            multiline     
                                                            placeholderTextColor={'#333333' }                               
                                                            style         ={{borderColor:'#ECECEC',  
                                                                            backgroundColor:'#fff',
                                                                            height:responsiveHeight(15) , 
                                                                            // borderColor: '#DEDEDE', 
                                                                            borderWidth: 1 ,
                                                                            borderRadius:5, 
                                                                            paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                fontSize:responsiveFontSize(1),
                                                                            // borderColor: this.state.borderColor
                                                                            }} 
                                                            onBlur={handleBlur('past_year_experience')}
                                                            onChangeText={handleChange('past_year_experience')}
                                                                          
                                                            
                                                />
                                            </View>
                                            
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question2}
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput 
                                                            editable={false}
                                                            value={values.past_year_achievements}
                                                            multiline     
                                                            placeholderTextColor={'#333333' }                               
                                                            style         ={{borderColor:'#ECECEC',  
                                                                            backgroundColor:'#fff',
                                                                            height:responsiveHeight(15) , 
                                                                            // borderColor: '#DEDEDE', 
                                                                            borderWidth: 1 ,
                                                                            borderRadius:5, 
                                                                            paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                fontSize:responsiveFontSize(1),
                                                                            // borderColor: this.state.borderColor
                                                                            }} 
                                                            onBlur={handleBlur('past_year_achievements')}
                                                            onChangeText={handleChange('past_year_achievements')}
                                                            
                                                />
                                            </View>
                                            
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question3}
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput  
                                                            value={values.likes_dislikes}
                                                            editable={false}
                                                            multiline     
                                                            placeholderTextColor={'#333333' }                               
                                                            style         ={{borderColor:'#ECECEC',  
                                                                            backgroundColor:'#fff',
                                                                            height:responsiveHeight(15) , 
                                                                            // borderColor: '#DEDEDE', 
                                                                            borderWidth: 1 ,
                                                                            borderRadius:5, 
                                                                            paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                fontSize:responsiveFontSize(1),
                                                                            // borderColor: this.state.borderColor
                                                                            }}  
                                                />
                                            </View>
                                            
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question4}
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput 
                                                          editable={false}
                                                         value={values.other_issues}
                                                            multiline     
                                                            placeholderTextColor={'#333333' }                               
                                                            style         ={{borderColor:'#ECECEC',  
                                                                            backgroundColor:'#fff',
                                                                            height:responsiveHeight(15) , 
                                                                            // borderColor: '#DEDEDE', 
                                                                            borderWidth: 1 ,
                                                                            borderRadius:5, 
                                                                            paddingTop:responsiveHeight(2),
                                                                                paddingLeft:responsiveWidth(1),
                                                                                fontSize:responsiveFontSize(1),
                                                                            // borderColor: this.state.borderColor
                                                                            }}
                                                            onBlur={handleBlur('other_issues')}
                                                            onChangeText={handleChange('other_issues')}
                                                            
                                                />
                                            </View>
                                            
                                           {last_appraisal_achievement.length!=0?
                                            <React.Fragment>
                                                <View 
                                                        style={{  
                                                                marginVertical:responsiveHeight(2) 
                                                                }}
                                                    >
                                                    <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                                      {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.header}
                                                    </Text>
                                                    <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                      {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.score_details}
                                                    </Text>
                                                </View>	
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                      <View >
                                                        <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                            {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.objectives_heading}
                                                        </Text>
                                                      </View>
                                                      <View style={{flexDirection:'row',width:responsiveWidth(14),marginRight:responsiveWidth(-1),justifyContent:'space-between'}}>
                                                          <View >
                                                            <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                                {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.emp_rating_heading}
                                                            </Text>
                                                          </View>
                                                          <View>
                                                            <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                                {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.appraiser_rating_heading}
                                                            </Text>
                                                          </View>
                                                    </View> 
                                                </View>
                                              
                                                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                                <FieldArray
                                                  name="prev_appraisal_targets"
                                                  render={() => (
                                                    <View>
                                                      {values.prev_appraisal_targets.map((items, index) => (
                                                        <Field name={`prev_appraisal_targets[${index}].target`}   >
                                                          {({
                                                              field, // { name, value, onChange, onBlur }
                                                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                              meta
                                                            }) => (  

                                                                  
                                                                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:responsiveHeight(2)}}>
                                                                        
                                                                          <View style={{width:responsiveWidth(20),marginLeft:responsiveWidth(0)}}>
                                                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                                                                {index+1}.{values.prev_appraisal_targets[index].name} 
                                                                            </Text>
                                                                          </View>
                                                                          <RNPickerSelect   {...field}
                                                                                            placeholder={ {
                                                                                                          label: 'Select..',
                                                                                                          value: null,  
                                                                                                          color:'red'
                                                                                                        } } 
                                                                                            items={[ {
                                                                                                label:'1',
                                                                                                value:" 1",
                                                                                              },{
                                                                                                label:'2',
                                                                                                value:" 2",
                                                                                              },{
                                                                                                label:'3',
                                                                                                value:" 3",
                                                                                              },{
                                                                                                label:'4',
                                                                                                value:"4",
                                                                                              },{
                                                                                                label:'5',
                                                                                                value:"5",
                                                                                              },{
                                                                                                label:'6',
                                                                                                value:"6",
                                                                                              },{
                                                                                                label:'7',
                                                                                                value:"7",
                                                                                              },{
                                                                                                label:'8',
                                                                                                value:"8",
                                                                                              },{
                                                                                                label:'9',
                                                                                                value:" 9",
                                                                                              },{
                                                                                                label:'10',
                                                                                                value:" 10",
                                                                                              }]}
                                                                                            disabled={true}
                                                                                            style={{inputAndroid: { 
                                                                                                paddingHorizontal: '4%', 
                                                                                                borderRadius: 5,
                                                                                                color: '#333333',
                                                                                                paddingRight: 30, // to ensure the text is never behind the icon
                                                                                                backgroundColor:'white', 
                                                                                                borderWidth:1,
                                                                                                borderColor:'#ECECEC',
                                                                                                height:responsiveHeight(6)
                                                                                              }, 
                                                                                            iconContainer: {
                                                                                              top: responsiveHeight(3.5),
                                                                                              right: responsiveWidth(4),
                                                                                            },
                                                                                            placeholder:{
                                                                                              
                                                                                              color:'#33333350',
                                                                                              fontSize:responsiveFontSize(2)
                                                                                            }, 
                                                                                            inputWeb:{
                                                                                              height:responsiveHeight(5), 
                                                                                              width:responsiveWidth(5),
                                                                                              fontSize:responsiveFontSize(1.1),
                                                                                              paddingLeft:responsiveWidth(.5),
                                                                                              borderRadius:5 ,
                                                                                              borderWidth:0, 
                                                                                              color:'#333333',
                                                                                              marginLeft:responsiveWidth(2)
                                                          
                                                                                              
                                                                                              
                                                                                            },
                                                                                            
                                                                                            }} 
                                                                                            value={last_appraisal_achievement[index].emp_rating}
                                                                                            useNativeAndroidPickerStyle={false}
                                                                                            textInputProps={{ underlineColor: 'yellow' }}
                                                                                            Icon={() => {
                                                                                            return( 
                                                                                              Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                                                                                              //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                                                                            )
                                                                                            }}
                                                                                            />
                                                                          <RNPickerSelect   {...field}
                                                                                            placeholder={ {
                                                                                                          label: 'Select..',
                                                                                                          value: null,  
                                                                                                          color:'red'
                                                                                                        } } 
                                                                                            items={[ {
                                                                                                label:"1",
                                                                                                value:" 1",
                                                                                              },{
                                                                                                label:"2",
                                                                                                value:" 2",
                                                                                              },{
                                                                                                label:"3",
                                                                                                value:" 3",
                                                                                              },{
                                                                                                label:"4",
                                                                                                value:"4",
                                                                                              },{
                                                                                                label:"5",
                                                                                                value:"5",
                                                                                              },{
                                                                                                label:"6",
                                                                                                value:"6",
                                                                                              },{
                                                                                                label:"7",
                                                                                                value:"7",
                                                                                              },{
                                                                                                label:"8",
                                                                                                value:"8",
                                                                                              },{
                                                                                                label:"9",
                                                                                                value:" 9",
                                                                                              },{
                                                                                                label:"10",
                                                                                                value:" 10",
                                                                                              }]}
                                                                                            disabled={true}
                                                                                            style={{inputAndroid: { 
                                                                                                paddingHorizontal: '4%', 
                                                                                                borderRadius: 5,
                                                                                                color: '#333333',
                                                                                                paddingRight: 30, // to ensure the text is never behind the icon
                                                                                                backgroundColor:'white', 
                                                                                                borderWidth:1,
                                                                                                borderColor:'#ECECEC',
                                                                                                height:responsiveHeight(6),
                                                                                              
                                                                                              }, 
                                                                                            iconContainer: {
                                                                                              top: responsiveHeight(3.5),
                                                                                              right: responsiveWidth(4),
                                                                                            },
                                                                                            placeholder:{
                                                                                              
                                                                                              color:'#33333350',
                                                                                              fontSize:responsiveFontSize(2)
                                                                                            }, 
                                                                                            inputWeb:{
                                                                                              height:responsiveHeight(5), 
                                                                                              width:responsiveWidth(5),
                                                                                              fontSize:responsiveFontSize(1.1),
                                                                                              paddingLeft:responsiveWidth(.5),
                                                                                              borderRadius:5 ,
                                                                                              borderWidth:0, 
                                                                                              color:'#333333',
                                                                                              
                                                                                              marginLeft:responsiveWidth(3)
                                                                                              
                                                                                              
                                                                                            },
                                                                                            
                                                                                            }} 
                                                                                            value={last_appraisal_achievement[index].appraiser_rate}
                                                                                            useNativeAndroidPickerStyle={false}
                                                                                            textInputProps={{ underlineColor: 'yellow' }}
                                                                                            Icon={() => {
                                                                                            return( 
                                                                                              Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                                                                                              //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                                                                            )
                                                                                            }}
                                                                                            />
                                                                                              
                                                                      </View>
                                                                
                                                                    
                                                                )
                                                          }
                                                      </Field>
                                                    
                                                    ))}
                                                    </View>
                                                  )}
                                                  />
                                              
                                                </View>
                                            </React.Fragment>
                                           :null
                                            } 
                                            <View 
                                                                                              style={{  
                                                                                                      marginVertical:responsiveHeight(2),   zIndex:-2
                                                                                                      }}
                                                                                          >
                                                                                          <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                                                                            {StaticWordsWeb.AppraisalFormPage.next_appraisal_targets.header}
                                                                                          </Text>
                                                                                      </View>	
                                                                                      
                                            <FieldArray
                                              name="next_appraisal_targets"
                                              render={arrayHelpers => (
                                                <View>
                                                  {values.next_appraisal_targets.map((items, index) => (
                                                      <Field name={`next_appraisal_targets[${index}].target`}  >
                                                          {({
                                                              field, // { name, value, onChange, onBlur }
                                                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                              meta,
                                                            }) => (
                                                                        <TextInput  {...field}
                                                                                    key={index}
                                                                                    value={values.next_appraisal_targets[index].target}
                                                                                    multiline  
                                                                                    placeholderTextColor={'#333333' }                               
                                                                                    style         ={
                                                                                                    {borderColor:'#ECECEC',  
                                                                                                    backgroundColor:'#fff',
                                                                                                    height:responsiveHeight(15) , 
                                                                                                    borderWidth: 1 ,
                                                                                                    borderRadius:5, 
                                                                                                    //width:responsiveWidth(10),
                                                                                                    paddingTop:responsiveHeight(2),
                                                                                                    paddingLeft:responsiveWidth(1),
                                                                                                    fontSize:responsiveFontSize(1),
                                                                                                    marginVertical:responsiveHeight(1.5), 
                                                                                                    }} 
                                                                                  
                                                                    />
                                                            )}
                                                        </Field>
                                                      
                                                    ))}
                                                  
                                                  <View style={{justifyContent:'space-between',flexDirection:'row',paddingVertical:responsiveHeight(3)}}>   
                                                        
                                                        <Button  
                                                         
                                                                icon={<Entypo name="circle-with-plus" size={18} color="#ee4000" />} 
                                                                title="Add Targets"
                                                                titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),
                                                                             marginLeft:responsiveWidth(0.5),fontWeight:'500',
                                                                             
                                                                            }}
                                                                style={{marginTop:responsiveHeight(1)}}   
                                                                buttonStyle={{ 
                                                                               width:responsiveWidth(9),backgroundColor:'transparent',
                                                                               padding:8,
                                                                               borderColor:'#ee4000',borderWidth:2, height:responsiveHeight(5)}} 
                                                                onPress={() => {
                                                                  arrayHelpers.push({ target: '' })

                                                                    // const boxes = [...values.boxes];
                                                                    // boxes.push({ target: ''}) ;
                                                                    // setValues({ ...values, boxes });
                                                                    
                                                                    
                                                                    // setLines([...lines, lines.length]) // logic to add elements on click
                                                                    // call formik onChange method
                                                                  // field.onChange(e);
                                                                }}
                                                        />
                                                        <Button 
                                                            
                                                            icon={<Entypo name="circle-with-minus" size={18} color="#ee4000" />} 
                                                            title="Remove Targets"
                                                            titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),
                                                                         marginLeft:responsiveWidth(.5),fontWeight:'500', 
                                                                        
                                                                        }}
                                                            style={{marginTop:responsiveHeight(1)}}  
                                                             buttonStyle={{ padding:5,
                                                                            width:responsiveWidth(11),backgroundColor:'transparent',
                                                                            borderColor:'#ee4000',borderWidth:2, height:responsiveHeight(5)}} 
                                                            onPress={() => {
                                                                            arrayHelpers.remove(values.next_appraisal_targets.length-1)
                                                                
                                                            }}
                                                        />
                                                      
                                                        
                                                        <Button icon={<Entypo name="print" size={18} color="#ee4000" />} 
                                                            title="Print Preview"
                                                            titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),marginLeft:responsiveWidth(.5),fontWeight:'500'}}
                                                            style={{marginTop:responsiveHeight(1)}} 
                                                             buttonStyle={{ 
                                                                          width:responsiveWidth(9),backgroundColor:'transparent',
                                                                          borderColor:'#ee4000',borderWidth:2, 
                                                                          height:responsiveHeight(5),padding:8,
                                                                          color:'black'
                                                                        }}  
                                                             onPress={() => {
                                                                              let arr=[values.past_year_experience ,values.past_year_achievements ,values.likes_dislikes,values.other_issues ]
                                                                             
                                                                              localStorage.removeItem("dutiesResponsibilities")
                                                                              localStorage.setItem("dutiesResponsibilities", JSON.stringify(arr));
                                                                              localStorage.setItem("nextAppraisalTargets", JSON.stringify(values.next_appraisal_targets));
                                                                              window.open(window.location.origin+PrintPreviewPage.Link, "",PrintPreviewPage.Window_Width_And_Height, )
                                                              
                                                                             }
                                                                    }
                                                        />
                                              
                                                    </View> 
                                          
                                                </View>
                                              )}
                                            />
                                           
                                            <View style={styles.buttonContainer}>                                   
                                                    <FormButton
                                                                buttonType='solid'
                                                                // type='submit' see if needed in future
                                                                onPress={
                                                                  handleSubmit}  //it calls the onSubmit(line:246) method passing the form value in object form
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
                                          

                                          </Form>
                                      
                                      )
                              }
                            </Formik>  
                    </ScrollView>
                   </Card> 
                        
                             
                    
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
      marginTop:responsiveHeight(5), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 

 