import { AntDesign, Entypo } from '@expo/vector-icons';
//import * as SQLite from 'expo-sqlite';
import { Field, FieldArray, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Yup from 'yup';
import { ApiInfo, PrintPreviewPage } from '../../ApiEndpoints';
import FormButton from '../../components/FormButton';
import Footer from '../../components/WebComponents/footer';
//import DateRangePicker from '../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../components/WebComponents/SecondHeaderButtons';
import { HomePageBlueCard } from '../../components/WebComponents/SidebarNavigatonComponents/Homepage';
import { StaticWordsWeb } from '../staticwordsFile';
 


//const db = SQLite.openDatabase('db.testDb1')

export default function AppraisalForm({history}){
   

    const [lines, setLines] = React.useState([]);

    const validationSchema = Yup.object().shape({
      past_year_experience: Yup.string()
                            .label('past_year_experience')
                            .required('Please enter past year experience'),
      past_year_achievements:Yup.string()
                              .label('past_year_achievements')
                              .required('Please enter achievements'),
      likes_dislikes:Yup.string()
                    .label('likes_dislikes')
                    .required('Please enter likes/dislikes'),
                                            
      other_issues:Yup.string()
                    .label('other_issues')
                    .required('Please enter any other issues'), 
   }) 
    const [item,setItem]=React.useState(0)
    const [name,setName]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [isLoaded,setLoading]=React.useState(false); 
    const [objectives_list,setObjectivesList]=React.useState([]); 
    const [selectedRatings,setRatings]=React.useState("")
    const [designation,setDesignation]=React.useState("")
    const [joiningDate,setJoiningDate]=React.useState("")
    const [appraisal_date,setAppraisal_date]=React.useState("")
    const [appraiser_name,setAppraisal_name]=React.useState("")
    
  const inputEl = useRef(null);
    React.useEffect(
                  
        ()=> {        
                       localStorage.getItem('showOrNot')=='0'||'2'||'3'?history.push('/home'):null    
                     
                       var emp_details=JSON.parse(localStorage.getItem('empDetails'));
                      
                       setName(emp_details.name),
                       setEmail(emp_details.email_id),
                       setJoiningDate(emp_details.joining_date),
                     
                       setDesignation(emp_details.designation),
                       
                       setAppraisal_date(emp_details.next_appraisal_date),
                       setAppraisal_name(emp_details.appraiser_name)
                       
                      // db.transaction(tx => {
                      //      // sending 4 arguments in executeSql
                      //     tx.executeSql('SELECT * FROM statusInfo', null, // passing sql query and parameters:null
                      //       // success callback which sends two things Transaction object and ResultSet Object
                      //       (txObj,results ) => 
                      //         {
                      //             var len = results.rows.length;
                      //             for (let i = 0; i < len; i++) {
                      //               let row = results.rows.item(i);
                                      
                      //                   setName(row.name),
                      //                   setEmail(row.email_id),
                      //               console.log(row.name)
                      //                   setJoiningDate(row.joining_date),
                                      
                      //                   setDesignation(row.designation),
                                        
                      //                   setAppraisal_date(row.next_appraisal_date),
                      //                   setAppraisal_name(row.appraiser_name)
                                        
                      //             }
                      //         } ,
                      //       (txObj, error) => console.log('Error ', error)
                      //       )  
                      //   })
                      
                      fetch(ApiInfo.baseUrlForWeb + ApiInfo.objectivesEndpoint , 
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
                                        // setObjectivesList([])
                                          for(let i=0;i<json.data.length;i++){
                                            objectives_list.push({"target_id":json.data[i].objectives_id ,"emp_rating":'',"name":json.data[i].objectives}) 
                                          }
                                          console.log(objectives_list)
                                          setLoading(true)
                                      }
                                  }
                          );
                      
                         
                
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
                {
                  isLoaded
                  ?
                  <ScrollView>              
                    <View style={{flexDirection:'row', }}>           
                    
                         {HomePageBlueCard.AllTabLinks()}              
                        <View style={{marginHorizontal: responsiveWidth(3),
                                   marginTop:responsiveHeight(3)}}>
                                     
                           <Text style={{fontWeight:'500'}}>
                             <Text onPress={()=>history.push('/home')}>
                              Home / </Text> 
                             <Text style={{color:'#F15A25'}}>Appraisal Form</Text>
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
                                                    placeholder={`Status : ${StaticWordsWeb.HomePage.appraisalText.pendingAtEmployee}`}
                                                        
                                                    placeholderTextColor={'#333333' }                               
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(5) ,
                                                                    textAlign:'center',
                                                                    fontWeight:'500', 
                                                                    // borderColor: '#DEDEDE', 
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
                                            placeholder={`Name : ${name}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            textAlign:'center',
                                                            fontWeight:'500',
                                                            // borderColor: '#DEDEDE', 
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
                                                    placeholder={`Email id : ${email}`}
                                                    editable={false}      
                                                    placeholderTextColor={'#333333' }                               
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(5) ,
                                                                    textAlign:'center',
                                                                    fontWeight:'500', 
                                                                    // borderColor: '#DEDEDE', 
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
                                            placeholder={`Designation : ${designation}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                            borderWidth: 1 ,
                                                            textAlign:'center',
                                                            fontWeight:'500',
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
                                            placeholder={`Joining Date :  ${joiningDate}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            // borderColor: '#DEDEDE', 
                                                            borderWidth: 1 ,
                                                            textAlign:'center',
                                                            fontWeight:'500',
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
                                            placeholder={`Appraisal Date : ${appraisal_date}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            textAlign:'center',
                                                            fontWeight:'500',
                                                            // borderColor: '#DEDEDE', 
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
                                            placeholder={`Appraiser Name : ${appraiser_name}`}
                                            editable={false}      
                                            placeholderTextColor={'#333333' }                               
                                            style         ={{borderColor:'#ECECEC',  
                                                            paddingVertical:3,
                                                            backgroundColor:'#fff',
                                                            height:responsiveHeight(5) , 
                                                            textAlign:'center',
                                                            fontWeight:'500',
                                                            // borderColor: '#DEDEDE', 
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
                                            marginVertical:responsiveHeight(2),   zIndex:-2
                                            }}
                                >
                                 <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                   {StaticWordsWeb.AppraisalFormPage.past_year_experience.header}
                                 </Text>
                            </View>	
                            
                            <Formik 
                          
                                    initialValues={{   past_year_experience: '',past_year_achievements:'',likes_dislikes:'',
                                                      
                                                      other_issues:'', next_appraisal_targets: [{'target':''},{'target':''},{'target':''}] ,
                            
                                                      prev_appraisal_targets:isLoaded?objectives_list:null
                                                      
                                                      
                                                  }} //must required to store form intitial values else after writing the field wont keep the values in the field
                                    // onReset={handleReset} this also works for resetting the form
                                    onSubmit={(values)=>
                                            {
                                                  // our array
                                                //  alert(JSON.stringify(values, null, 2));
                                                  fetch(ApiInfo.baseUrlForWeb+ApiInfo.appraisalSubmitEndpoint , 
                                                    { method:'POST', 
                                                      headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
                                                                'accept':'application/json',
                                                                'content-type':'application/json' 
                                                              }
                                                              ,
                                                      body:JSON.stringify({
                                                        "past_year_experience":values.past_year_experience ,
                                                        "achievements_of_past_year":values.past_year_achievements ,
                                                         "likes_dislikes_for_organisation":values.likes_dislikes,
                                                        "other_issues":values.other_issues,
                                                        "next_appraisal_targets":JSON.stringify(values.next_appraisal_targets),
                                                         "prev_appraisal_targets" :JSON.stringify(values.prev_appraisal_targets)
                                                     })
                                                    }
                                               )
                                                .then(response => response.json())
                                                .then(json => {   
                                                                        if(json.success)
                                                                        { 
                                                                           //  navigation.navigate('Home') ** do it
                                                                           history.push('/home');
                                                                         }

                                                              }
                                                )
                                            }
                                      }
                                      validationSchema={validationSchema}
                                    
                            >
                              {
                                ({ handleChange, values,isSubmitting,setFieldValue,isValidating,
                                  handleSubmit,setValues,errors,touched,handleBlur,isValid
                                    
                                }) => (
                                        <Form
                                          
                                        > 


                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question1} <Text style={{color:'#ee4000',fontSize:responsiveFontSize(1.5)}}>*</Text>  
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput  
                                                            placeholder={`Write here...`}
                                                           value={values.past_year_experience}
                                                           ref={inputEl} 
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
                                                 <Text style={{ color: 'red',
                                                                  alignSelf:'center',
                                                                  
                                                                }}
                                                  >                                                                     
                                                      { touched.past_year_experience && errors.past_year_experience}
                                                  </Text>
                                            </View>
                                            
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question2} <Text style={{color:'#ee4000',fontSize:responsiveFontSize(1.5)}}>*</Text>  
                                            
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput  
                                                            placeholder={`Write here...`}
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
                                                 <Text style={{ color: 'red',
                                                                  alignSelf:'center',
                                                                  
                                                                }}
                                                  >                                                                     
                                                      { touched.past_year_achievements && errors.past_year_achievements}
                                                  </Text>
                                            </View>
                                             
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question3}  <Text style={{color:'#ee4000',fontSize:responsiveFontSize(1.5)}}>*</Text>  
                                            
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput 
                                                            placeholder={`Write here...`}
                                                            value={values.likes_dislikes}
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
                                                            onBlur={handleBlur('likes_dislikes')}
                                                            onChangeText={handleChange('likes_dislikes')}
                                                />
                                                 <Text style={{ color: 'red',
                                                                  alignSelf:'center',
                                                                  
                                                                }}
                                                  >                                                                     
                                                      {touched.likes_dislikes && errors.likes_dislikes}
                                                  </Text>
                                            </View>
                                            
                                            <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                              {StaticWordsWeb.AppraisalFormPage.past_year_experience.question4} <Text style={{color:'#ee4000',fontSize:responsiveFontSize(1.5)}}>*</Text>  
                                            
                                            </Text>
                                            <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                        marginTop:responsiveHeight(1)
                                                        }}
                                            >
                                                <TextInput 
                                                            placeholder={`Write here...`}
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
                                                 <Text style={{ color: 'red',
                                                                  alignSelf:'center',
                                                                  
                                                                }}
                                                  >                                                                     
                                                      {touched.other_issues && errors.other_issues}
                                                  </Text>
                                            </View>

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
                                                  <View>
                                                    <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                        {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.objectives_heading}
                                                    </Text>
                                                  </View>
                                                  <View>
                                                    <Text style={{fontSize:responsiveFontSize(1),marginTop:responsiveHeight(1), fontWeight:'500',color:'#ee4000'}}>
                                                        {StaticWordsWeb.AppraisalFormPage.last_appraisal_targets.emp_rating_heading}
                                                    </Text>
                                                  </View>
                                            </View>
                                           
                                            <FieldArray
                                              name="prev_appraisal_targets"
                                              render={() => (
                                                <View>
                                                  {objectives_list.map((items, index) => (
                                                    <Field name={`prev_appraisal_targets[${index}].emp_rating`}   >
                                                      {({
                                                          field, // { name, value, onChange, onBlur }
                                                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                          meta
                                                        }) => (  

                                                              
                                                                  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:responsiveHeight(2)}}>
                                                                      <Text style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>
                                                                        {index+1}. {items.name}
                                                                      </Text>
                                                                      <RNPickerSelect   {...field}
                                                                                        placeholder={ {
                                                                                                      label: 'Select..',
                                                                                                      value: null,  
                                                                                                      color:'red'
                                                                                                    } } 
                                                                                        items={[ {
                                                                                            label:'1',
                                                                                            value:' 1',
                                                                                          },{
                                                                                            label:'2',
                                                                                            value:' 2',
                                                                                          },{
                                                                                            label:'3',
                                                                                            value:' 3',
                                                                                          },{
                                                                                            label:'4',
                                                                                            value:'4',
                                                                                          },{
                                                                                            label:'5',
                                                                                            value:'5',
                                                                                          },{
                                                                                            label:'6',
                                                                                            value:'6',
                                                                                          },{
                                                                                            label:'7',
                                                                                            value:'7',
                                                                                          },{
                                                                                            label:'8',
                                                                                            value:'8',
                                                                                          },{
                                                                                            label:'9',
                                                                                            value:' 9',
                                                                                          },{
                                                                                            label:'10',
                                                                                            value:' 10',
                                                                                          }]}
                                                                                        onValueChange={ (value )=> {
                                                                                                setRatings(value) 
                                                                                                setFieldValue(`prev_appraisal_targets[${index}].emp_rating`,selectedRatings )
                                                                                          
                                                                                        }}
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
                                                                                          
                                                      
                                                                                          
                                                                                          
                                                                                        },
                                                                                        
                                                                                        }} 
                                                                                        value={selectedRatings}
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
                                                  {values.next_appraisal_targets.map((friend, index) => (
                                                  <Field name={`next_appraisal_targets[${index}].target`}  >
                                                      {({
                                                          field, // { name, value, onChange, onBlur }
                                                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                          meta,
                                                        }) => (
                                                                        <TextInput  {...field}
                                                                                    key={index}
                                                                                    placeholder={`Write here...`} 
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
                                                                titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),marginLeft:responsiveWidth(.5),fontWeight:'500'}}
                                                                style={{marginTop:responsiveHeight(1)}}  
                                                                buttonStyle={{
                                                                                width:responsiveWidth(9),backgroundColor:'transparent',
                                                                                borderColor:'#ee4000',borderWidth:2, 
                                                                                height:responsiveHeight(5),padding:8,}} 
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
                                                            titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),marginLeft:responsiveWidth(.5),fontWeight:'500'}}
                                                            style={{marginTop:responsiveHeight(1)}}  
                                                            buttonStyle={{
                                                                            width:responsiveWidth(10),backgroundColor:'transparent',
                                                                            borderColor:'#ee4000',borderWidth:2, 
                                                                            height:responsiveHeight(5), padding:5,}} 
                                                            onPress={() => {
                                                                            arrayHelpers.remove(values.next_appraisal_targets.length-1)
                                                                
                                                            }}
                                                        />
                                                      
                                                        
                                                        <Button icon={<Entypo name="print" size={18} color="#ee4000" />} 
                                                            title="Print Preview"
                                                            titleStyle={{color:'#ee4000',fontSize:responsiveFontSize(1),marginLeft:responsiveWidth(.5),fontWeight:'500'}}
                                                            style={{marginTop:responsiveHeight(1)}} 
                                                            buttonStyle={{ width:responsiveWidth(9),backgroundColor:'transparent',
                                                                          borderColor:'#ee4000',borderWidth:2, height:responsiveHeight(5),
                                                                          color:'black',padding:8
                                                                        }}  
                                                            onPress={() => {
                                                                let arr=[values.past_year_experience ,values.past_year_achievements ,values.likes_dislikes,values.other_issues ]
                                                                localStorage.removeItem("dutiesResponsibilities")
                                                                localStorage.setItem("dutiesResponsibilities", JSON.stringify(arr));
                                                                localStorage.setItem("nextAppraisalTargets", JSON.stringify(values.next_appraisal_targets));
                                                                window.open(window.location.origin+PrintPreviewPage.Link, "",PrintPreviewPage.Window_Width_And_Height, )
                                                              
                                                            }}
                                                        />
                                              
                                                    </View> 
                                          
                                                </View>
                                              )}
                                            />
                                            <View style={styles.buttonContainer}>                                   
                                                    <FormButton
                                                    buttonType='solid'
                                                    // type='submit' see if needed in future
                                                    onPress={()=>{handleSubmit(setTimeout(function(){  inputEl.current.focus()  }, 1500))}}  //it calls the onSubmit(line:246) method passing the form value in object form
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
      marginTop:responsiveHeight(2), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 

 