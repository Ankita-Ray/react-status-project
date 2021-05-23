import { AntDesign, Entypo } from '@expo/vector-icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator, Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router-dom';
import withQuery from 'with-query';
import { ApiInfo, PrintPreviewPage } from '../../ApiEndpoints';
import Footer from '../../components/WebComponents/footer';
//import DateRangePicker from '../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../components/WebComponents/SecondHeaderButtons';
import { HomePageBlueCard } from '../../components/WebComponents/SidebarNavigatonComponents/Homepage';
import { config } from '../../env';
import { StaticWordsWeb } from '../staticwordsFile';
 
 

export default function AppraisalDetails()
{
   const history=useHistory();
   // const {appraisal_id,emp_name}= route.params;  

    const [candidate_info,set_candidate_info]=React.useState(""); 
    const [appraisalInfo,setAppraisalInfo]=React.useState("");
    const [selectedRatings,setRatings]=React.useState("")
       
    const [future_targets,setFuture_targets]=React.useState([]);
    const [last_appraisal_achievement,setLast_appraisal_achievement]=React.useState([]); 
    
    const [isLoaded,setLoading]=React.useState(false); 
    const [future_targets_loaded,set_Future_targets_loadedTrue]=React.useState(false);

    React.useEffect(
                  
        ()=> {
                          
                 
               
                fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.getAppraisalData,
                                { 
                                  "appraisal_id":localStorage.getItem('appraisalId_of_loggedin_user')
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
                  
                 console.log(json);
                                if(json.success){  
                                  setAppraisalInfo(json.data.appraisal_info);
                                  set_candidate_info(json.data.candidate_info);
                                  console.log(json.data.appraisal_info)


                                  for(let i=0;i<json.data.future_targets.length;i++)
                                  {
                                       future_targets.push({target:json.data.future_targets[i].objectives,objectives_id:json.data.future_targets[i].objectives_id});
                                 
                                     (i==(json.data.future_targets.length-1))?set_Future_targets_loadedTrue(true):null 
                                     
                                  }


                                  for(let i=0;i<json.data.last_appraisal_achievement.length;i++)
                                  {
                                      last_appraisal_achievement.push({
                                                                        name:json.data.last_appraisal_achievement[i].objectives,
                                                                        target_id:json.data.last_appraisal_achievement[i].objectives_id ,
                                                                        emp_rating:json.data.last_appraisal_achievement[i].your_rate,
                                                                        appraiser_rate:''
                                    });
                                    i==(json.data.last_appraisal_achievement.length-1)?setLoading(true):null 
                                  }
                                   
 
                                } 
                              }
                    )

              } ,[]    
    ) 
 
     return(
         
            <View style={{flex:1 }} >
              
               <View style={{backgroundColor:'#003A59',position:'relative',flex:1,
                               }}>
                    <SecondHeaderButtons   />
                    
                    <View style={{alignItems:'center',flexGrow:1}}>
                
                        <Card style={{
                                    width:responsiveWidth(63)  ,
                                     borderRadius:10, 
                                    flexGrow:1,  alignSelf:'center',
                                    marginTop:responsiveHeight(6)  ,            // WHITE CARD
                                    }}>
                    
                        
                            
                            <ScrollView>              
                            
                                <View style={{flexDirection:'row', }}>           
                                
                                    {HomePageBlueCard.AllTabLinks()}  
                                    <View style={{marginHorizontal: responsiveWidth(3),
                                            marginTop:responsiveHeight(3)}}>
                                     <View style={{flexDirection:'row',justifyContent:'space-between'
                                                          }}>
                                                <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                   <Image source={require('../../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                    <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                      Welcome {localStorage.getItem('loginUserName')}
                                                    </Text> 
                                                </View>
                                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                      <Text style={{fontWeight:'500'}}>
                                                        <Text onPress={()=>history.push('/home')}>
                                                        Home / </Text> 
                                                        <Text style={{color:'#F15A25'}}> Appraisal Details</Text>
                                                      </Text> 
                                                </View>
                                                
                                    </View>            
                                    
                                    
                                    <Card style={{  
                                            width:responsiveWidth(38)  ,
                                            height:responsiveHeight(62),
                                            borderRadius:10,
                                            backgroundColor:'#F3F1F1', 
                                            marginTop:responsiveHeight(1)  , 
                                            padding:10            //FORM CARD CONTAINER
                                        }}>
                                    { future_targets_loaded  ?
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
                                                        // alert(JSON.stringify(values))

                                                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.submitAppraisalFromAppraiser , 
                                                            { method:'POST', 
                                                                headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
                                                                        'accept':'application/json',
                                                                        'content-type':'application/json' 
                                                                        }
                                                                        ,
                                                                body:JSON.stringify({
                                                                "appraisal_id":localStorage.getItem('appraisalId_of_loggedin_user') ,
                                                                "past_year_experience":values.past_year_experience ,
                                                                "achievements_of_past_year":values.past_year_achievements ,
                                                                "likes_dislikes_for_organisation":values.likes_dislikes,
                                                                "other_issues":values.other_issues,
                                                                "next_appraisal_targets":values.next_appraisal_targets,
                                                                "prev_appraisal_targets" :values.prev_appraisal_targets 
                                                            })
                                                            }
                                                        )
                                                        .then(response => response.json())
                                                        .then(json => {   console.log(json)
                                                                                if(json.success)
                                                                                { console.log(json)
                                                                                    alert('Form Submitted.')
                                                                                    //  navigation.navigate('Home')  ** do it
                                                                                }
        
                                                                        }
                                                        )
                                                        
                                                                
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
                                                        
                                                        {last_appraisal_achievement.length!=0 && isLoaded ?
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

                                                                                
                                                                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:responsiveHeight(2),
                                                                                                width:responsiveWidth(33)
                                                                                                }}
                                                                                    >
                                                                                    
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
                                                                                                        
                                                                                                        items=
                                                                                                                {
                                                                                                                    [ {
                                                                                                                        label:'1',
                                                                                                                        value:'1',
                                                                                                                    },{
                                                                                                                        label:'2',
                                                                                                                        value:'2',
                                                                                                                    },{
                                                                                                                        label:'3',
                                                                                                                        value:'3',
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
                                                                                                                        value:'9',
                                                                                                                    },{
                                                                                                                        label:'10',
                                                                                                                        value:'10',
                                                                                                                    }
                                                                                                                    ]
                                                                                                        }
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

                                                        
                                                        
                                                        { future_targets_loaded ?
                                                        <React.Fragment>
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
                                                                                                        editable={false}
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
                                                                    
                                                                    <View style={{justifyContent:'center',flexDirection:'row',paddingVertical:responsiveHeight(3)}}>   
                                                                            
                                                                            
                                                                            
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
                                                                                                localStorage.setItem('candidateInfo',JSON.stringify(candidate_info))
                                                                                                window.open(config.SUBDOMAIN+PrintPreviewPage.Link, "",PrintPreviewPage.Window_Width_And_Height, )
                                                                                
                                                                                                }
                                                                                        }
                                                                            />
                                                                
                                                                    </View> 
                                                            
                                                                    </View>
                                                                )}
                                                                />
                                                            </React.Fragment>
                                                        : null
                                                        } 

                                                       

                                                        </Form>
                                                    
                                                    )
                                            }
                                        </Formik>

                                        </ScrollView>
                                    
                                        :
                                        <ActivityIndicator/> 
                                        }
                                    </Card> 
                                                                
                                    
                                    </View>
                            
                                </View> 
                            
                            </ScrollView> 
                        

                        </Card>   
                        
                        <Footer/>
                    
                    </View>
              
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

 