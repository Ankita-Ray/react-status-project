import { Formik } from 'formik';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { ApiInfo } from '../../../ApiEndpoints';
import { PageBackground } from '../../../assets/Color Constants/WebColors';
import FormButton from '../../../components/FormButton';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { PersonalPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/Personal';
import { StaticWordsWeb } from '../../staticwordsFile';
 
// const Demo=React.lazy(()=>import ('../../demo'));

// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
// const FormButton=React.lazy(()=>import ('../../../components/FormButton'));
 

export default function ChangePasswordWeb(){
   
    const history=useHistory();

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
          .label('oldPassword') 
          .required('Please enter your old Password'),
        newPassword: Yup.string()
          .label('newPassword')
          .required('Please enter your new Password') ,
        confirmPassword: Yup.string()
          .label('confirmPassword')
          .required('Please re-enter your new Password') 
   })  /*validationschema end */

     
    
    
    return(
          
        <View style={{flex:1 }} >
         <React.Suspense fallback={null}>
           <View style={{   
                             backgroundColor:PageBackground.MidnightBlue,
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
                           
                           
                            {PersonalPageBlueCard.ChangePassword()}
                           
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
                                                                <Text onPress={()=>history.push('/home')}>Home</Text>
                                                                <Text> / Personal /</Text>
                                                                <Text style={{color:'#F15A25'}}> Change Password</Text>
                                                            </Text>
                                                    </View>
                                                    
                                    </View>
                        
                               <Formik 
                
                                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword : ''}} //must required to store form intitial values else after writing the field wont keep the values in the field
                                        
                                        onSubmit={
                                                    (values)=>{  console.log(values.newPassword.localeCompare(values.confirmPassword)==1 );
                                                        
                                                        
                                                                let encryptedCredentials =   btoa(localStorage.getItem('username')+ ":" + localStorage.getItem('password'));
                                                                values.newPassword.localeCompare(values.confirmPassword)==0 
                                                                ?
                                                                (
                                                                    fetch(ApiInfo.baseUrlForWeb+ApiInfo.changePasswordEndpoint,
                                                                            {
                                                                                method:'POST', 
                                                                                headers: {
                                                                                            'Authorization': 'Basic ' + encryptedCredentials,
                                                                                            'Accept': 'application/json',
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                body:JSON.stringify({
                                                                                    "currentPassword":values.oldPassword,
                                                                                    "newPassword":values.newPassword,
                                                                                    "newPasswordConfirm":values.confirmPassword
                                                                                })
                                                                            }
                                                                    )
                                                                    
                                                                    
                                                                    .then(response => response.json())
                                                                    .then(json => {  
                                                                                     console.log(json);   
                                                                                    if(json.success)
                                                                                    {
                                                                                            
                                                                                        alert(json.data.msg)
                                                                                        localStorage.setItem('password',values.newPassword);
                                                                                       // navigation.navigate('Home')
                                                                                       history.push('/home');
                                                                                    }
                                                                                    else{
                                                                                        alert('Your old Password is not correct')
                                                                                        }
                                                                                    }
                                                                            )
                                                                    .catch(error => console.log(error)) 
                                                                ) 
                                                                :alert('New password and Confirm password do not match.')

                                                            }
                                                }
                                        validationSchema={validationSchema}

                               >
                            
                                 {({ handleChange, values, handleSubmit,errors,touched,handleBlur}) => (
                        
                                   <Card 
                                         style={{  
                                                    width:responsiveWidth(42)  ,
                                                    height:responsiveHeight(62),
                                                    borderRadius:10,
                                                    backgroundColor:'#F3F1F1', 
                                                    paddingLeft:responsiveWidth(2),
                                                    //paddingRight:responsiveWidth(2),
                                                    marginTop:responsiveHeight(1)  ,             //FORM CARD CONTAINER
                                               }}
                                   >
                                   
                                   <ScrollView style={{paddingRight:responsiveWidth(2)}}>

                                        <Text 
                                                style=
                                                        {{
                                                        fontWeight:'700',
                                                        fontSize:responsiveFontSize(1.5),
                                                        color:'#333333',
                                                        marginTop:responsiveHeight(2),
                                                        marginBottom:responsiveHeight(3)
                                                        }}
                                        >

                                            {StaticWordsWeb.ChangePassword.header}

                                        </Text>
                                    
                                        <View 
                                                style={{  
                                                        marginBottom:'2%',
                                                    }}
                                        >
                                            <TextInput 
                                                        secureTextEntry
                                                        placeholder='OldPassword' 
                                                        placeholderTextColor={'#33333380' }                              
                                                        value={values.oldPassword}
                                                        style={{
                                                                    borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                            }} 
                                                        onBlur={handleBlur('oldPassword')}
                                                        onChangeText ={handleChange('oldPassword')} 
                                            />
                                            <Text style={{ color: 'red',
                                                        alignSelf:'flex-start',
                                                        marginBottom:'2%',
                                                        marginLeft:'.5%'
                                                        }}
                                                    >                                                                     
                                                    {touched.oldPassword && errors.oldPassword}
                                            </Text>
                                        </View>
                                        <View 
                                            style={{  
                                                    marginBottom:'2%',
                                                    }}
                                        >
                                            <TextInput 
                                                        placeholder='New Password' 
                                                        secureTextEntry
                                                        placeholderTextColor={'#33333380' }                              
                                                        value={values.newPassword}
                                                        style         ={{borderColor:'#ECECEC',  
                                                                        paddingVertical:3,
                                                                        backgroundColor:'#fff',
                                                                        height:responsiveHeight(6) , 
                                                                        // borderColor: '#DEDEDE', 
                                                                        borderWidth: 1 ,
                                                                        borderRadius:5, 
                                                                        paddingLeft:responsiveScreenWidth(.9),
                                                                        fontSize:responsiveFontSize(1),
                                                                        // borderColor: this.state.borderColor
                                                                        }} 
                                                        onBlur={handleBlur('newPassword')}
                                                        onChangeText ={handleChange('newPassword')} 
                                            />
                                            <Text style={{  
                                                            color: 'red',
                                                            alignSelf:'flex-start',
                                                            marginBottom:'2%',
                                                            marginLeft:'.5%'

                                                        }}
                                            >                                                                     
                                                    {touched.newPassword && errors.newPassword}
                                            </Text>
                                        </View>
                                        <View 
                                            style={{  
                                                    marginBottom:'2%',
                                                    }}
                                        >
                                            <TextInput 
                                                        placeholder='Confirm Password'
                                                        secureTextEntry 
                                                        placeholderTextColor={'#33333380' }                              
                                                        value={values.confirmPassword}
                                                        style={{borderColor:'#ECECEC',  
                                                                paddingVertical:3,
                                                                backgroundColor:'#fff',
                                                                height:responsiveHeight(6) , 
                                                                // borderColor: '#DEDEDE', 
                                                                borderWidth: 1 ,
                                                                borderRadius:5, 
                                                                paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                // borderColor: this.state.borderColor
                                                            }} 
                                                        onBlur={handleBlur('confirmPassword')}
                                                        onChangeText ={handleChange('confirmPassword')} 
                                            />
                                            <Text style={{  
                                                            color: 'red',
                                                            alignSelf:'flex-start',
                                                            marginBottom:'2%',
                                                            marginLeft:'.5%'

                                                        }}
                                            >                                                                     
                                                        {touched.confirmPassword && errors.confirmPassword}
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
         </React.Suspense>
        </View> 
     )
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(4), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 

