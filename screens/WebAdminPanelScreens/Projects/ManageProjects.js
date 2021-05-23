//import Timepicker from '../../../../components/timepicker'
import base64 from 'base-64';
import * as SQLite from 'expo-sqlite';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { ApiInfo } from '../../../api/constants';
import { RelativeLinkColors } from '../../../assets/Color Constants/WebColors';
import FormButton from '../../../components/FormButton';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';


  

function updateState(selectedItem){
  this.setState({selectedItem})
}
const db = SQLite.openDatabase('db.testDb1')

export default function ManageProjects({navigation}){
  

  const [formvalue,setValue]=React.useState(
                                              [
                                                {},

                                                {proj_name:'Madhulika Kaushik',
                                                task_details:'Email Id',
                                                date:'Password',
                                                start_time:'rajeshbhardwaj@keyss.in',
                                                edit:'Action',},

                                                {proj_name:'Madhulika Kaushik',
                                                task_details:'Email Id',
                                                date:'Password',
                                                start_time:'rajeshbhardwaj@keyss.in',
                                                edit:'Action',},

                                                {proj_name:'Madhulika Kaushik',
                                                task_details:'Email Id',
                                                date:'Password',
                                                start_time:'rajeshbhardwaj@keyss.in',
                                                edit:'Action',},

                                                {proj_name:'Madhulika Kaushik',
                                                task_details:'Email Id',
                                                date:'Password',
                                                start_time:'rajeshbhardwaj@keyss.in',
                                                edit:'Action',}
                                              ]
                                            );

  const [formvalue1,setformvalue]=React.useState([
                                                          {
                                                            project:'Client Name',

                                                          },
                                                          {
                                                            project:'Project Name',
                                                          },   {
                                                            project:'Action',
                                                          },

                                                ]);
          
  
  
  const keyExtractor = (item, index) => index.toString()
   

  
React.useEffect(
                  
                    () => {
                            
                                       

                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.enteredStatusListEndpoint,
                            {
                              method :'POST',
                              headers: {'Authorization': 'Basic ' +base64.encode(localStorage.getItem("username")+ ":" + localStorage.getItem("password")) ,
                                          'accept':'application/json',
                                        'content-type':'application/json'
                                        },
                              body : JSON.stringify({
                                "emp_id": localStorage.getItem('empid'),
                               // "date":  currentDate
                              })
                            }
                            )
                            .then(response => response.json())
                            .then(json => {   
                                                if(json.success)
                                                {
                                                  // formvalue.splice(1, formvalue.length-1)
                                                  // var result= formvalue.concat( json.data); 
                                                 
                                                  // setValue(result)
                                                  //  console.log(result)   
                                                  
                                                }
                                                else{
                                                  console.log('empid')
                                                }

                                            }
                                  )
                            .then(error => console.log(error))
                            // setDeleting(false)              
                          } 
                )
  
  
 


  return(
          
        <View style={{flex:1 ,paddingTop:'1%'}} >

            <SecondHeaderButtons navigation={navigation} color={'#ee4000'} />
                   
            <View style={styles.whiteCardContainer}>
                 <Card style={styles.whiteCard}>
                                
                   <View style={{flexDirection:'row', }}>           
                     
                      
                     <View style={{//marginRight: responsiveWidth(-2),
                                     marginLeft:responsiveWidth(2),
                                     marginTop:responsiveHeight(1) 
                                   }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}> 
                            <View>
                             <Text style={{fontWeight:'500'}}> <Text onPress={()=>navigation.navigate('Home')}>Home</Text><Text> / Projects /</Text><Text style={{color:'#F15A25'}}>Manage Projects</Text></Text>
                            </View>
                            <View style={{paddingTop:0}}>                                   
                                <FormButton
                                buttonType='solid'
                                // type='submit' see if needed in future
                                onPress={()=>navigation.navigate('EnterStatus')}  //it calls the onSubmit(line:246) method passing the form value in object form
                                title='BACK' 
                                titleStyle={{fontSize:responsiveFontSize(1),color:'#F15A25',fontWeight:'bold'}}
                                buttonStyle={{ backgroundColor:'transparent', borderRadius:10,
                                                paddingVertical:responsiveHeight(1) ,
                                                borderColor:'#F15A25'  ,borderWidth:2             
                                            }} 
                                containerStyle={{  
                                                   width:responsiveScreenWidth(5),
                                                   marginTop:responsiveScreenHeight(1)
                                                }} 
                               // buttonColor='#a3f1ff'  
                                />
                                {/* <button type="reset"  style={{width:50,height:20}} onClick={( timeDiff != undefined) && ( timeDiff <= 2 ) ? (handleSubmit ) : setSubmitErrorMessage('* Please enter all fields.') }  //it calls the onSubmit(line:246) method passing the form value in object form
                                >submit</button> */}
                            </View>
                        </View>  
                        <Card style={{ 
                              width:responsiveWidth(56  )  ,
                              height:responsiveHeight(53),
                              borderRadius:10,
                              backgroundColor:'#F3F1F1',  
                              marginTop:responsiveHeight(2)  , 
                              paddingTop:responsiveHeight(2)            //FORM CARD CONTAINER
                            }}>
                          <ScrollView style={{paddingLeft:responsiveWidth(1),
                                              paddingRight:responsiveWidth(1),}}>
                            
                            
                                                
                                                    <FlatList
                                                     // showsVerticalScrollIndicator={false}
                                                      keyExtractor={keyExtractor} 
                                                      data={formvalue1}
                                                      numColumns={5}
                                                      renderItem={
                                                        ({item,index}) => ( 
                                                       
                                                       <View style={{flexShrink:1, display:'flex'}}>
                                                          <ListItem bottomDivider containerStyle={{ 
                                                                                                    borderBottomColor:'#fff',  
                                                                                                    marginHorizontal:0, 
                                                                                                    paddingTop:'3%',               
                                                                                                    paddingBottom:'3%', 
                                                                                                      borderBottomWidth:(index==0 ? 2 : 0 ),
                                                                                                  }}
                                                                                                
                                                        >
                                                    
                                                            <ListItem.Content // style={{}}
                                                              >
                                                            
                                                              
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1), 
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ), 
                                                                                      width:responsiveWidth(15)
                                                                                  }}> 
                                                                {item.project} 
                                                            </ListItem.Title>
                                                             
                                                               
                                                            
                                                            {/* <ListItem.Title style={{ 
                                                                                    fontSize:responsiveFontSize(1.1),
                                                                                    fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                    color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                    paddingBottom:'5%',width:responsiveWidth(10)
                                                                                }}
                                                                      
                                                                          
                                                                            
                                                            >
                                                                  
                                                                  {
                                                                   index==0? formvalue1[0].edit :<View style={{ justifyContent:'space-between',height:responsiveWidth(3)}}  >
                                                                   <Button containerStyle={{padding:0,margin:0,}} 
                                                                           buttonStyle={{backgroundColor:'#f15a25',paddingTop:'5%',paddingBottom:'5%'}} 
                                                                          icon={<Feather name="edit-3" size={15} color="#fff" />}    
                                                                           onPress={()=>{
                                                                                           const copylist=Object.assign([],formvalue)
                                                                                           const startT=copylist[index].start_time
                                                                                           const endT=copylist[index].end_time
                                                                                           const [StartH, StartM] =startT.split(/:| /)
                                                                                           const  [EndH, EndM] = endT.split(/:| /)
                                                                                           date_obj1.setHours(StartH),date_obj1.setMinutes(StartM);
                                                                                           date_obj2.setHours(EndH),date_obj2.setMinutes(EndM)
                                                                                           setStartTime(date_obj1)
                                                                                           setEndTime(date_obj2)
                                                                                           setFieldValue("task",copylist[index].task_details) //for textinput of formik state update And SetField value is a inbuilt method of formik
                                                                                          
                                                                                           updateChild(copylist[index].proj_name)//for project dropdown state update
                                                                                           setEditCount(true)
                                                                                           setP_id(item.progress_id)
                                                                                           setcurrentFormInputIndex(index)
                                                                                          
                                                                                         }
                                                                                   } 
                                                                   />
                                                                   <Button containerStyle={{padding:0,margin:0,marginLeft:'5%'}} 
                                                                           buttonStyle={{backgroundColor:'#f15a25',paddingTop:'5%',paddingBottom:'5%'}} 
                                                                           icon={<MaterialIcons name="delete" size={15} color="#fff" />}    
                                                                         onPress=
                                                                         {
                                                                           ()=>
                                                                               {
                                                                                 
                                                                                 let encryptedCredentials =   base64.encode(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))
                                                   
                                                                                 fetch(withQuery( ApiInfo.baseUrlForWeb+ApiInfo.deleteStatusEndpoint,{"id":item.progress_id}) ,
                                                                                             {
                                                                                               method :'POST',
                                                                                               headers: {'Authorization': 'Basic ' +encryptedCredentials,
                                                                                                           'accept':'application/json',
                                                                                                         'content-type':'application/json',
                                                                                                         
                                                                                                         },
                                                                                                 
                                                                                             }
                                                                                 )
                                                                                 .then(response => response.json())
                                                                                 .then(json => {   
                                                                                                     if(json.success)
                                                                                                     {
                                                                                                      setSubmitting(true) 
                                                                                                       
                                                                                                     }
                                                                                                     else{
                                                                                                     console.log(json.message)
                                                                                                     }
                                                                           
                                                                                                 }
                                                                                       )
                                                                                 .then(error => console.log(error))

                                                                                 setSubmitting(false) 
                                                                                 //console.log(`form length is ${formvalue.length}`) 
                                                                                                     
                                                                               }
                                                                           
                                                                         } 
                                                                   />
                                                             </View> 
                                                                  }
                                                                
                                                                
                                                              </ListItem.Title>
                                                                                    
                                                                               */}
                                                            </ListItem.Content> 
                                                            
                                                            </ListItem> 

                                                            </View>
                                                            )}
                                                            style={{ flex:1}}
                                                       
                                                         />  
                                               
                                             
                            
                              
                           </ScrollView>
                          </Card> 
                         
                            
                      
                     </View>
                 
                  </View>   
               
                </Card> 
               
                <Footer/>
           
            </View> 
        
         </View> 
    
    )

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
              height:responsiveHeight(25), 
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