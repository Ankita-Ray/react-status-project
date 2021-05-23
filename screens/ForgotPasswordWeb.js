 
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Yup from 'yup';
import { PageBackground } from '../assets/Color Constants/WebColors';
import FormButton from '../components/FormButton';
import { StaticWordsWeb } from '../screens/staticwordsFile';

// const FormButton=React.lazy(()=>import  ('../components/FormButton'));
// const Demo=React.lazy(()=>import  ('../screens/demo'))
 
// make change emp_id declared in employeeNameEndpoint fetch query ********
 
//const db = SQLite.openDatabase('db.testDb1') // returns Database object

export default class ForgotPassword extends Component {
      constructor(props) {
            super(props) ; 
            
             
      }                                                                                           /*Constructor End */   
      
      
   
render() {
              const validationSchema = Yup.object().shape({
                username: Yup.string()
                  .label('username')
                  .email('Enter a valid email')
                  .required('Please enter a registered email')                           })   
   return (
     <React.Suspense fallback={null}>
        <View style={styles.container}> 

          <Formik 
              initialValues={{ username: '' }}  
             onSubmit={
               
              (values,{resetForm})=>{  
               resetForm();
              }
              }
              
             validationSchema={validationSchema}
            
               >
            {({ handleChange, values, handleSubmit,errors,touched,handleBlur}) => (
              <View>                                                                            
                <Card style={styles.formContainer}> 
                 <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{alignItems:'center'}}>                            
                    
                    <Image source={require('../assets/images/keyss_logo_Login.png')}  
                           style={styles.logo}
                           resizeMode={'contain'}
                    />                                                                        
                    
                    <Text style={styles.loginHeading}
                    >                                                                         
                      {StaticWordsWeb.ForgotPasswordPage.header}
                    </Text>
                    <Text style={{maxWidth:responsiveWidth(20),color:'#295584',marginVertical:responsiveHeight(3),textAlign:'center',fontWeight:'500',fontSize:responsiveScreenFontSize(.9)}}
                    >                                                                         
                      {StaticWordsWeb.ForgotPasswordPage.recoverMessage}
                    </Text>
                  </View>                                                                     
                  
                  <View style={{alignItems:'center'}}>                                       
                    
                    <View style={{alignItems:'center'}}>                                      

                        <TextInput 
                            placeholder='Username'                             
                            value={values.email}
                            style ={[styles.textField,{marginTop: responsiveHeight(6.3) }]} 
                            onBlur={handleBlur('username')}
                            onChangeText ={handleChange('username')} 
                            onKeyPress={(event)=>{event.key==="Enter"?handleSubmit():null}}
                       
                        />                                                                     

                        <Text style={styles.errorMessage}
                        >                                                                     
                          {touched.username && errors.username}
                        </Text>                                                               

                         
                       
                        <View style={styles.buttonContainer}>                                   
                            <FormButton
                              buttonType='solid'
                              onPress={handleSubmit}   
                              title={StaticWordsWeb.ForgotPasswordPage.submitButton} 
                              titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',textTransform:'uppercase',fontWeight:'bold'}}
                              buttonStyle={styles.button}  
                              containerStyle={{width:responsiveWidth(22),marginTop:responsiveHeight(1)}}  
                            />
                        </View>                                                                 
                        
                         
                    </View>
                 
                  </View>
                 </ScrollView> 
                </Card>

                <View style={styles.copyrightContainer}>                              
                  <Text style={styles.copyright}>
                  {StaticWordsWeb.copyrightText.copyrightText1}
                  </Text>
                  <Text style={styles.copyright}>
                  {StaticWordsWeb.copyrightText.copyrightText2}
                  </Text>
                  <Text style={styles.copyright}>
                    {StaticWordsWeb.copyrightText.copyrightText3}
                    <Text style={{color:'#F15A25'}}>  
                     {StaticWordsWeb.copyrightText.copyrightText4}
                    </Text>
                  </Text>
                   
                </View>                                                                          
                
                 
              
              </View>                                                                     
              )}
           </Formik> 
        </View>
     </React.Suspense>   
    )//return end
  }//render end
}//class Login end

const styles = StyleSheet.create({
    
    container: {   
                  opacity:1, 
                  paddingTop:'1%',
                  paddingLeft:'10%',
                  paddingRight:'10%',
                  backgroundColor:PageBackground.MidnightBlue,
                  position: 'absolute', 
                  top: responsiveHeight(0), 
                  bottom:  responsiveHeight(0), 
                  left: responsiveHeight(0), 
                  right:  responsiveHeight(0)

                },

    formContainer:{
                    width:responsiveWidth(28),  //450  ,
                    height  :responsiveScreenHeight(68),//586,
                    alignSelf:'center', 
                    borderRadius:10,
                    marginTop:  responsiveHeight(2) ,
                  },
    
    logo:{ 
            marginTop :responsiveHeight(6),
            width : responsiveWidth(12.1), //160,   
            height :responsiveHeight(17.5)//109
         },
    
    loginHeading:{
                  marginTop :responsiveHeight(5),//40,
                 fontSize :responsiveFontSize(2) ,//30,
                 fontWeight:'bold',color:'#295584'
                },
    
    textField:{
       
                backgroundColor:'#F5F5F5', 
                width:responsiveWidth(22) ,//22.5 350 ,
                paddingVertical:responsiveHeight(2), //9// ,
                height:responsiveHeight(5.5) ,//40 ,// 
                marginBottom:responsiveHeight(3),//20,// 
                borderWidth: 1 ,
                borderRadius:5, 
                paddingLeft:responsiveWidth(1),//13, 
                fontSize:responsiveFontSize(1.1) //15
                
              },
    
    errorMessage:{ 
                    color: 'red',
                  //  marginTop:responsiveHeight(-2),
                    alignSelf:'flex-start',
                    marginLeft:10
                  },
    
    checkboxContainer:{
                        backgroundColor:'transparent',
                        //border ':none,
                        borderColor:'white',
                        paddingLeft :0, 
                       height :'10%'    
                      },
    
    button:{
             backgroundColor:'#F15A25', borderRadius:5, 
             paddingVertical:8,paddingHorizontal:25
          },
    
    buttonContainer: {
                        marginTop: responsiveHeight(-1)
                      },
    
    recoverPassword:{
                    fontSize:14, 
                    color:'#295584',
                    fontWeight:'normal', 
                    marginTop:'10%',
                    marginBottom:44//responsiveHeight()
                  },
  
    copyright:{
              color:'#fff',
              fontSize:responsiveFontSize(1), 
              textAlign:'center'
            },
    
    copyrightContainer:{ 
                        alignItems:'center',
                        marginTop:responsiveHeight(3)
                      }
  }) 