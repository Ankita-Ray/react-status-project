import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo } from '../../ApiEndpoints';
import { RelativeLinkColors } from '../../assets/Color Constants/WebColors';
import Footer from '../../components/WebComponents/footer';
//import DateRangePicker from '../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../components/WebComponents/SecondHeaderButtons';
import { HomePageBlueCard } from '../../components/WebComponents/SidebarNavigatonComponents/Homepage';

 
export default function LeavesWeb({history}){
    const [formvalue,setValue]=React.useState(
        [
          {},{}
        ]
      );
    
    const [loaded,setLoading]=React.useState(false);

    const [formvalue1,setformvalue]=React.useState([{
              
              Name:'Name',
              FromDate:'From',
              ToDate:'To',
              Reason:'Reason',
              Category:'Category',
              Action:'Action',
              Details:'Details',
          }  
          ]);
    
     
    
   
    React.useEffect(
      ()=>  {
       
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
                        formvalue.splice(1, formvalue.length-1)
                        var result= formvalue.concat( json.data); 
                    
                        setValue(result)
                        console.log(result)
                        setLoading(true)   
            
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
                  <ScrollView>              
                    <View style={{flexDirection:'row', }}>           
                    
                        {HomePageBlueCard.AllTabLinks()}   
                                   
                        <View style={{marginHorizontal: responsiveWidth(3),
                                   marginTop:responsiveHeight(3)}}>
                           <Text style={{fontWeight:'500'}}> <Text >Home / </Text> <Text style={{color:'#F15A25'}}>Applied Leaves</Text></Text>
                         
                        <Card style={{  
                              width:responsiveWidth(38)  ,
                              height:responsiveHeight(55),
                               borderRadius:10,
                              backgroundColor:'#F3F1F1', 
                                marginTop:responsiveHeight(2)  , 
                                padding:10            //FORM CARD CONTAINER   //apply link to home text
                            }}>
                          <ScrollView>
                           {loaded?<FlatList
                                                      showsVerticalScrollIndicator={false}
                                                      keyExtractor={(item, index) => index.toString()}
                                                      data={formvalue}
                                                      renderItem={
                                                        ({item,index}) => ( 
              
                                                          <ListItem bottomDivider containerStyle={{ 
                                                                                                    borderBottomColor:'#fff',  
                                                                                                    marginHorizontal:0, 
                                                                                                    paddingTop:'3%',               
                                                                                                    paddingBottom:'3%',
                                                                                                    paddingHorizontal:'5%',
                                                                                                    borderBottomWidth:(index==0 ? 2 : 0 ),
                                                                                                    
                                                                                                    // marginTop:item.marginTop,     
                                                                                                    //backgroundColor:(index==0 ? '#E48E37' : (index%2 ? '#E48E3730':'#F15A2550') ),
                                                                                                    borderBottomEndRadius:index==formvalue.length?5:0,
                                                                                                    borderBottomStartRadius:index==formvalue.length?5:0,
                                                                                                    borderTopEndRadius:index==0?5:0,
                                                                                                    borderTopStartRadius:index==0?5:0 
                                                                                                }}
                                                                                                
                                                        >
                                                    
                                                            <ListItem.Content style={{
                                                                                    flexDirection:'row',
                                                                                    justifyContent:'space-between',
                                                                                    //height:responsiveScreenHeight(2),
                                                                                    // paddingLeft:'5%',
                                                                                    // paddingRight:'5%' 
                                                                                }}
                                                                              // key={item.p_id}
                                                            >
                                                            
                                                              
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1), 
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ), 
                                                                                      width:responsiveWidth(5)
                                                                                  }}> 
                                                                {index==0?formvalue1[0].Name:item.name} 
                                                            </ListItem.Title>
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1),
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                      
                                                                                      width:responsiveWidth(5)
                                                                                  }}
                                                                                  
                                                            >
                                                                {index==0?formvalue1[0].FromDate :item.from_date} 
                                                            </ListItem.Title>
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1),
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                        width:responsiveWidth(5)
                                                                                      
                                                                                  }}>
                                                                {index==0?formvalue1[0].ToDate : item.to_date } 
                                                            </ListItem.Title>                   
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1),
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                      
                                                                                       width:responsiveWidth(5)
                                                                                  }}>
                                                                {index==0? formvalue1[0].Reason :item.reason }
                                                            </ListItem.Title>
                                                            <ListItem.Title style={{ 
                                                                                      fontSize:responsiveFontSize(1.1),
                                                                                      fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                      color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                      //width:responsiveWidth(10),
                                                                                       width:responsiveWidth(5)
                                                                                  }}>
                                                                {index==0?formvalue1[0].Category :item.leave_category }
                                                            </ListItem.Title>
                                                            
                                                            
                                                            <ListItem.Title style={{ 
                                                                                    fontSize:responsiveFontSize(1.1),
                                                                                    fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                    color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                    //width:responsiveWidth(10)
                                                                                     width:responsiveWidth(5)
                                                                                }}
                                                                      
                                                                          
                                                                            
                                                            >
                                                                  
                                                                  {
                                                                   index==0? formvalue1[0].Action :
                                                                    <View style={{ justifyContent:'space-between',flexDirection:'row', width:responsiveWidth(4)}}  >
                                                                        <Button containerStyle={{padding:0,margin:0,}} 
                                                                                buttonStyle={{backgroundColor:'#f15a25',paddingVertical:responsiveHeight(.8),paddingHorizontal:responsiveHeight(.8)}} 
                                                                                icon={<AntDesign name="checkcircleo" size={15 } color="#fff" />}    
                                                                                onPress={()=>{
                                                                                              
                                                                                               confirm("Are you sure you want to Accept ?")?
                                                                                               ( fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.rejectLeaveEndpoint,{"id":String(item.leave_id),"mode":"accept" }),
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
                                                                                                              }
                                                                                                      )
                                                                                                ):null  
                                                                                                
                                                                                              }
                                                                                        } 
                                                                        />
                                                                        <Button containerStyle={{padding:0,margin:0,marginLeft:responsiveHeight(.5)}} 
                                                                                buttonStyle={{backgroundColor:'#f15a25',paddingVertical:responsiveHeight(.8),paddingHorizontal:responsiveHeight(.8)}} 
                                                                                icon={<AntDesign name="closecircleo" size={15 } color="#fff" />}    
                                                                                onPress=
                                                                                {
                                                                                ()=>
                                                                                    {
                                                                                      confirm("Are you sure you want to Reject ?")?
                                                                                      ( fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.rejectLeaveEndpoint,{"id":String(item.leave_id),"mode":"reject" }),
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
                                                                                                      if(json.success){
                                                                                                      alert(json.data.msg)
                                                                                                      }

                                                                                                    }
                                                                                            )
                                                                                      ):null
                                                                                                                                           
                                                                                       
                                                                                        
                                                                                        }
                                                                                
                                                                                } 
                                                                        />
                                                                         <Button containerStyle={{padding:0,margin:0,marginLeft:responsiveHeight(.5)}} 
                                                                          
                                                                          buttonStyle={{backgroundColor:'#f15a25',paddingVertical:responsiveHeight(1),paddingHorizontal:responsiveHeight(.8)}} 
                                                                         icon={<FontAwesome name="search" size={15} color="#fff" /> }    
                                                                          onPress={()=>{
                                                                            history.push('/leave-details')
                                                                            //navigation.navigate('LeaveDetails'),
                                                                            localStorage.setItem("selectedEmpId",String(item.emp_id))}
                                                                                  } 
                                                                  />
                                                                    </View> 
                                                                  }
                                                                
                                                                
                                                              </ListItem.Title>
                                                                                    
                                                              {/* <ListItem.Title style={{ 
                                                                                    fontSize:responsiveFontSize(1.1),
                                                                                    fontWeight: (index==0 ? 'bold' : '500' ),
                                                                                    color:(index==0 ? RelativeLinkColors.HeaderTealt : '#333333' ) ,
                                                                                    paddingBottom:'5%',width:responsiveWidth(10)
                                                                                }}
                                                                      
                                                                          
                                                                            
                                                            >
                                                                  
                                                                  {
                                                                   index==0? formvalue1[0].Details :
                                                                     <Button containerStyle={{padding:0,margin:0,}} 
                                                                          
                                                                           buttonStyle={{backgroundColor:'#f15a25',paddingTop:'5%',paddingBottom:'5%'}} 
                                                                          icon={<FontAwesome name="search" size={15} color="#fff" /> }    
                                                                           onPress={()=>{
                                                                                           
                                                                                          
                                                                                         }
                                                                                   } 
                                                                   />
                                                                   
                                                                  }
                                                                
                                                                
                                                              </ListItem.Title>
                                                                               */}
                                                            </ListItem.Content> 
                                                            
                                                        </ListItem> 
                                                    
                                                      )}
                                                      style={{ flex:1}}
                                                       
                                                    />
                                :
                                <ActivityIndicator/>
                            }
                          </ScrollView>
                        </Card> 
                        
                             
                    
                     </View>
                 
                    </View> 
                  </ScrollView>
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