 
//import Constants from 'expo-constants';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router';
import * as Yup from 'yup';
import { ApiInfo } from '../ApiEndpoints';
import { PageBackground } from '../assets/Color Constants/WebColors';
import FormButton from '../components/FormButton';
import { StaticWordsWeb } from '../screens/staticwordsFile';
// import Demo from './demo';

// const FormButton=React.lazy(()=>import ('../components/FormButton'));



var cookieEmail=''; 

class LoginWeb extends Component {
  
    constructor(props) {
            super(props) ; 
            this.state = {
              data: null,
              name:null , 
              checked:false,
              call:1,
              email:'',
              password:'',
              cookiesSet:false,
             } ;                                                                                     /*state end */
             
           
           
             
      }                                                                                           /*Constructor End */   
     
     componentDidMount(){
       
      function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        // because unescape has been deprecated, replaced with decodeURI
        //return unescape(dc.substring(begin + prefix.length, end));
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 
    
    
        var userCookie = getCookie("cookUser");
        var passCookie = getCookie("cookPass");
    
        if (userCookie == null && passCookie==null) {
            // do cookie doesn't exist stuff;
         this.setState({cookiesSet:true})
        }
        else {
          const username= document.cookie
          .split('; ')
          .find(row => row.startsWith('cookUser='))
          .split('=')[1]; 
         
          const password= document.cookie
          .split('; ')
          .find(row => row.startsWith('cookPass='))
          .split('=')[1];
           this.setState({username,password,checked:true,cookiesSet:true});
     
        }
   
           
      } 
      
render() {
              const validationSchema = Yup.object().shape({
                username: Yup.string()
                  .label('username')
                  .email('Enter a valid email')
                  .required('Please enter a registered email'),
                password: Yup.string()
                  .label('Password')
                  .required()
                                                         })  /*validationschema end */

   return (
        <View style={styles.container}> 

         <React.Suspense fallback={null}>
            {this.state.cookiesSet?

              <Formik 
              //this type of formik code is for web and mobile as all elements are capitalised
              
                initialValues={{ username:this.state.username, password:this.state.password }} //must required to store form intitial values else after writing the field wont keep the values in the field
                // REMOVE HEROKU URL IN PRODUCTION LEVEL
                onSubmit={
                  
                  (values,{resetForm})=>{  
                  
                    localStorage.setItem('username',values.username);
                    console.log(values.username);
                    console.log(values.password);
                    //localStorage.setItem('password',base64.encode(btoa(values.password)))  *****************DO THIS REQUIRED FOR SECURITY PURPOSE
                // console.log(await this.state.username) ;   
                  if(this.state.checked)
                    {
                      document.cookie=`cookUser=${values.username}; expires=${new Date(new Date().setDate(new Date().getDate()+31))}`,
                    document.cookie=`cookPass=${values.password}; expires=${new Date(new Date().setDate(new Date().getDate()+31))}`
                  
                    }
                    else
                    {
                      var pathBits = location.pathname.split('/');
                      var pathCurrent = ' path=';
                  
                      // do a simple pathless delete first.
                      document.cookie = 'cookUser' + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
                      document.cookie = 'cookPass' + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
                  
                      for (var i = 0; i < pathBits.length; i++) {
                          pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
                          document.cookie = 'cookUser' + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
                          document.cookie = 'cookPass' + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
                      }
                  
                    };

                    fetch(ApiInfo.baseUrlForWeb+ApiInfo.loginEndpoint , 
                              { method:'POST', 
                              //referrer:'https://status.keyss.in/Login',
                              // referrerPolicy:'unsafe-url',
                                headers: {'Authorization': 'Basic ' + btoa(values.username + ':' + values.password),
                                          'accept':'application/json',
                                          'content-type':'application/json' 
                                        }
                                    
                              } 
                        )
                          .then(response => response.json())
                          .then(json => {    localStorage.removeItem('HRorNot'),
                                            localStorage.removeItem('appraiserOrNot')
                                                  if(json.success)
                                                  {
                                                    this.props.history.push('/home');
                                                    window.location.reload(); 
                                                    
                                                    //  this.props.navigation.navigate('Nav');
                                                    //   this.newItem(json.data);
                                                      //  this.fetchData;
                                                        
                                                      //  localStorage.setItem("HRorNot",'true')
                                                      localStorage.setItem('empDetails',JSON.stringify(json.data));
                                                        localStorage.setItem('loginUserName',json.data.name); 
                                                        localStorage.setItem("next_appraisal_date",json.data.next_appraisal_date);
                                                        localStorage.setItem("appraiserOrNot",json.data.status_self);
                                                        resetForm();
                                                        // fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.projDropdownEndpoint , {
                                                        //                     "emp_id":json.data.emp_id
                                                        //                   }),
                                                        //                   { 
                                                        //                     method:'GET', 
                                                        //                     headers: {'Authorization': 'Basic ' + btoa(values.username + ':' + values.password)}
                                                        //                   },
                                                                          
                                                                      
                                                        //       )
                                                        // .then(response => response.json())
                                                        // .then(json => {   
                                                        //                   if(json.success)
                                                        //                   {
                                                        //                     //  this.newItemForProj(json.data);
                                                        //                     localStorage.setItem('EnterStatusProjDropdownItems',json.data);
                                                        //                     //this.fetchData;
                                                        //                   }
                                                        //                   else{
                                                        //                     console.log('cant insert data')
                                                        //                   }
                                                
                                                        //               }
                                                        //     )
                                                        // .then(error => console.log(error))
                                                        
                                                        // fetch(ApiInfo.baseUrlForWeb+ApiInfo.employeeNameEndpoint,
                                                        //   {
                                                        //     method :'POST',
                                                        //     headers: {'Authorization': 'Basic ' +btoa(values.username + ':' + values.password) ,
                                                        //                 'accept':'application/json',
                                                        //               'content-type':'application/json'
                                                        //               },
                                                        //     body : JSON.stringify({
                                                        //       "emp_id":localStorage.getItem('empid') //localStorage.getItem('empid'),
                                                        //       })
                                                        //   }
                                                        //   )
                                                        //   .then(response => response.json())
                                                        //   .then(json => {   
                                                        //                       if(json.success)
                                                        //                       {  this.newItemForEmpName(json.data);
                                                        //                               console.log(json.data)
                                                                                
                                                        //                      }
                                                        //                       else{
                                                        //                         console.log('emp name is not fetched')
                                                        //                       }
                                                
                                                        //                   }
                                                        //         )
                                                        //   .then(error => console.log(error))
                                                
                                                  }
                                                  else
                                                  {
                                                    alert('WRONG USERNAME OR PASSWORD')
                                                  }
                                            
                                        }
                              )
                          .then(error => console.log(error))
                    
                    }
                  }
                  
                validationSchema={validationSchema}
                //must required, without it submit of form wont work
    
                  >
                {({ handleChange, values, handleSubmit,errors,touched,handleBlur}) => (
                  <View>                                                                            
                    <Card style={styles.formContainer}> 
                    {/* <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'green',paddingTop:responsiveHeight(2)}}> */}
                      <View style={{alignItems:'center'}}>                            
                        
                        <Image source={require('../assets/images/keyss_logo_Login.png')}  
                              style={styles.logo}
                              resizeMode='contain'
                        />                                                                        
                        
                        <Text style={styles.loginHeading}
                        >                                                                         
                          {StaticWordsWeb.LoginPage.login}
                        </Text>
                        
                      </View>                                                                     
                      
                      <View style={{alignItems:'center'}}>                                       
                        
                        <View style={{alignItems:'center'}}>                                      

                            <TextInput 
                                placeholder='Username'                             
                                value={values.username}
                                style ={[styles.textField,{marginTop: responsiveHeight(6.3), borderColor: this.state.borderColor}]} 
                                onBlur={handleBlur('username')}
                                onChangeText ={handleChange('username')} 
                    
                    onKeyPress={(event)=>{event.key==="Enter"?(handleSubmit(),values.password?localStorage.setItem('password',values.password):null):null}}
                            
                                
                            />                                                                     

                            <Text style={[styles.errorMessage,{marginTop:-5,marginBottom:3}]}
                            >                                                                     
                              {touched.username && errors.username}
                            </Text>                                                               

                            <TextInput
                              placeholder='Password'
                              secureTextEntry 
                              value={values.password}
                              style={[styles.textField,{borderColor: '#DEDEDE'}]} 
                              onBlur={handleBlur('password')}
                              onChangeText={handleChange('password')} 
                              onKeyPress={(event)=>{event.key==="Enter"?(handleSubmit(),values.password?localStorage.setItem('password',values.password):null):null}}
                            
                            />                                                                      
                          {touched.password && 
                            <Text style={[styles.errorMessage,{marginTop:-5,marginBottom:3}]}
                            >                                                                       
                              {errors.password}
                            </Text>                                                               
                            }
                            <View style={{alignSelf:'flex-start'}}>                                
                                
                                <CheckBox 
                                  title={StaticWordsWeb.LoginPage.rememberMe} 
                                  checked={this.state.checked} 
                                  onPress={async() =>{await this.setState({checked: !this.state.checked})
                                  console.log(this.state.checked)
                                                
                                                  
                                                }}
                                  checkedColor='#F15A25' uncheckedColor='#F15A25'
                                  containerStyle={styles.checkboxContainer}
                                  textStyle={{fontSize:responsiveFontSize(1),fontWeight:'normal'}}
                                />
                            
                            </View>                                                                 

                            <View style={styles.buttonContainer}>                                   
                                <FormButton
                                  buttonType='solid'
                                  // type='submit' see if needed in future
                                  onPress={()=>(handleSubmit(),values.password?localStorage.setItem('password',values.password):null)}  //it calls the onSubmit(line:246) method passing the form value in object form
                                  
                                  title={StaticWordsWeb.LoginPage.login} 
                                  titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',textTransform:'uppercase'}}
                                  buttonStyle={styles.button}  
                                  containerStyle={{width:responsiveWidth(22),marginTop:responsiveHeight(1)}}  
                                />
                            </View>                                                                 
                                    <TouchableOpacity onPress={()=>{ this.props.history.push('/forgotpassword')
                                    window.location.reload()
                                    }} >
                                    <Text style={styles.recoverPassword}
                                    >                                                                       
                                      {StaticWordsWeb.LoginPage.recoverPassword}
                                    </Text>                                                                
                                  </TouchableOpacity>
                        
                            
                        </View>
                    
                      </View>
                    {/* </ScrollView>  */}
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
                    
                    
                  
                  </View>                                                                             /*card, copyright and localstorage container*/
                  )}
              </Formik> 

              :
              null
            }
         </React.Suspense>

        </View>
         
    )//return end
  }//render end
}//class Login end

export default withRouter(LoginWeb);
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
                    paddingTop:responsiveHeight(2), 
                     marginTop:  responsiveHeight(2) ,
                  },
    
    logo:{ 
           // marginTop :responsiveHeight(3),
            width : responsiveWidth(12.1), //160,   
            height :responsiveHeight(17.5)//109
         },
    
    loginHeading:{
                  marginTop :responsiveHeight(5),//40,
                 fontSize :responsiveFontSize(2.1) ,//30,
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
                        margin: 10
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