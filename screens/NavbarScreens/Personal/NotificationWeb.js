import { Formik } from 'formik';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo } from '../../../ApiEndpoints';
import { PageBackground } from '../../../assets/Color Constants/WebColors';
import FormButton from '../../../components/FormButton';
import { PersonalModuleBreadCrumbs } from '../../../components/WebComponents/BreadCrumbs/Personal';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { PersonalPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/Personal';
import { StaticWordsWeb } from '../../staticwordsFile';

// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
// const FormButton=React.lazy(()=>import ('../../../components/FormButton'));
// const Demo=React.lazy(()=>import ('../../demo'));
 
export default function Notifications(){
    const [checked,setChecked]= useState("");

    React.useEffect(
        ()=>{
              
        //      localStorage.getItem('password')==null?navigation.navigate('Login'):null
        
              fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.loginEndpoint , {
                  "fields":"status_self"
                }),
                { 
                  method:'POST', 
                  headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'))}
                }
                
            
              )
              .then(response => response.json())
              .then(json => {   
                            if(json.success)
                            { 
                              setChecked(json.data.status_self=="false"?false:true)
                              console.log(json)
                            }
                            

                        }
              )
              .then(error => console.log(error))

              

            },[]
    )
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
                                 
                <Card style={{
                              width:responsiveWidth(63)  , 
                              borderRadius:10, 
                              marginTop:responsiveHeight(6)  ,            // WHITE CARD
                              alignSelf:'center',
                              flexGrow:1
                            }}>
                                
                    <View style={{flexDirection:'row'}}>           
                        
                        {PersonalPageBlueCard.Notifications()}
                       
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
                                                            {PersonalModuleBreadCrumbs.NotificationPageBreadCrumb()}
                                                    </View>
                                                    
                            </View>         
                           
                        <Formik 
           
                            initialValues={{ firstname: '', lastName: '' }} //must required to store form intitial values else after writing the field wont keep the values in the field
                            
                            onSubmit={
                            ()=>{  
                                fetch(ApiInfo.baseUrlForWeb+ApiInfo.setNotificationEndpoint,
                                    {
                                      method :'POST',
                                      headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
                                                  'accept':'application/json',
                                                'content-type':'application/json'
                                                },
                                      body : JSON.stringify({
                                         
                                              'status_self':checked==""?'false':checked
                                      
                                            })
                                    }
                                )
                                .then(response => response.json())
                                .then(json => {   
                                                        if(json.success)
                                                        {
                                                            alert(checked==true?"You will receive status entries details in your mail .":"You won't receive status entries details in your mail .")
                                                            fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.loginEndpoint,{"fields":"status_self"}),
                                                            {
                                                              method :'POST',
                                                              headers: {
                                                                        'Authorization': 'Basic ' +btoa(localStorage.getItem('username') + ":" + localStorage.getItem("password")),
                                                                        'accept':'application/json',
                                                                        'content-type':'application/json'
                                                                        }
                                                              
                                                            }
                                                            )
                                                            .then(response => response.json())
                                                            .then(json => {   
                                                                                    if(json.success)
                                                                                    { 
                                                                                    setChecked(json.data.status_self=="false"?false:true)
                                                                                      console.log(json)
                                                                                    }
                                                                                  
                                                          
                                                                                }
                                                                      )
                                                            .then(error => console.log(error))
                                                        }
                                                        else{
                                                         alert('failed')
                                                        }
                              
                                                    }
                                          )
                                .then(error => console.log(error)) 
                                
                                }}
                        
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
                              
                                <Text 
                                        style={{fontWeight:'700',
                                              fontSize:responsiveFontSize(1.5),
                                              color:'#333333',
                                              marginTop:responsiveHeight(2),
                                              marginBottom:responsiveHeight(3)
                                            }}>
                                      {StaticWordsWeb.NotificationPage.header}
                                    

                                </Text>
                                
                                <CheckBox 
                                            title='Receive Status Report of Self Entries.' 
                                            checked={checked} 
                                            onPress={() => {setChecked( !checked),console.log(checked)}}
                                            checkedColor='#F15A25' uncheckedColor='#F15A25'
                                            containerStyle={{
                                                            backgroundColor:'transparent',
                                                            border:'none',
                                                            borderColor:'white',
                                                            paddingLeft: 0, 
                                                            height:'10%',
                                                            alignSelf:'center'
                                                            }}
                                            textStyle={{fontSize:14,fontWeight:'normal'}}
                                            />
                                
                                <View style={styles.buttonContainer}>                                   
                                    <FormButton
                                    buttonType='solid'
                                    // type='submit' see if needed in future
                                    onPress={handleSubmit}  //it calls the onSubmit(line:246) method passing the form value in object form
                                    title='SUBMIT' 
                                    titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                    buttonStyle={{  
                                                    backgroundColor:'#F15A25', borderRadius:20,
                                                    paddingVertical:responsiveHeight(1) 
                                                                    
                                                }} 
                                                containerStyle={{width:responsiveScreenWidth(10),
                                                marginTop:responsiveScreenHeight(1)}} 
                                    buttonColor='#a3f1ff'  
                                    />
                                </View> 
                        </Card> 
                        
                        )}
                       
                       </Formik>    
                    
                     </View>
                 
                    </View> 
                </Card>   
                 
                <Footer/>
           
            </View> 
        
          </React.Suspense>

        </View> 
     )
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(6), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 

