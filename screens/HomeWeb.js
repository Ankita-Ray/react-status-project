import { FontAwesome, Ionicons } from '@expo/vector-icons';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router-dom';
import { ApiInfo } from '../ApiEndpoints';
import Calendar from '../components/calendar';
import Footer from '../components/WebComponents/footer';
import SecondHeaderButtons from "../components/WebComponents/SecondHeaderButtons";
import { HomePageBlueCard } from '../components/WebComponents/SidebarNavigatonComponents/Homepage';
import { StaticWordsWeb } from './staticwordsFile';

// const Footer=React.lazy(()=> import ('../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../components/WebComponents/SecondHeaderButtons'));
// const Calendar=React.lazy(()=>import ('../components/calendar'));
//  const Demo=React.lazy(()=>import  ('../screens/demo'));
 
    var objectives=[];

 export default function Home(){
  
  const history=useHistory();
      
    // const [objectives,setObjectives]=React.useState([]);
    const [isLoading,setLoading]=React.useState(false); 
    const [objectivesLoaded,setObjectivesLoaded]=React.useState(false);
    const [from,setFrom]=React.useState(null); 
    const [to,setTo]=React.useState(null); 
    const [leaveStatusForAppraiser,setLeaveStatusForAppraiser]=React.useState(null); //we will use this to show applied leave candidate names iterable
    const [showOrNot,setShow]=React.useState();

    const [namesAtAppraiserLaoded,setNamesLoaded]=React.useState(false); 
    const [namesAtHRLaoded,setEmpNamesAtHRLoaded]=React.useState(true);
    const [pendingAppraisalCandidateNamesAtAppraiser,setPendingAppraisalCandidateNamesAtAppraiser]=React.useState([])
    const [pendingAppraisalCandidateNamesAtHR,setPendingAppraisalCandidateNamesAtHR]=React.useState([])
   
    React.useEffect(()=>{  
                        
     
                             //setObjectives([]);
                             objectives.length=0;
                            
                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.objectivesEndpoint , 
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
                                          
                                                for(let i=0;i<json.data.length;i++){
                                                  objectives.push(json.data[i].objectives) 
                                                  i==json.data.length-1?setObjectivesLoaded(true):null
                                                }
                                                console.log(objectives+'objectives')
                                            }
                                        }
                                )
                            
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
                                            if(json.success    )
                                            {
                                             if(json.data.length!=0)
                                              {
                                                setFrom(json.data[0].from_date);
                                                setTo(json.data[0].to_date);
                                                setLeaveStatusForAppraiser(json.data[0].status);
                                                console.log(json);
                                              }
                                             else setLeaveStatusForAppraiser(null)

                                            }  
                                            else console.log(json)                                     // CHANGE THIS CODE TO setValues(json.data)
                                          }
                                )


                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.showAppraisalForm , 
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
                                            setShow(json.data.status)  ;
                                            localStorage.setItem('appraisalId_of_loggedin_user',json.data.appraisal_id)
                                          
                                            }                            // CHANGE THIS CODE TO setValues(json.data)
                                          }
                                )


                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.pendingAtAppraiser , 
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
                                              console.log(json)
                                              for(let i=0;i<json.data.length;i++){
                                                pendingAppraisalCandidateNamesAtAppraiser.push({emp_name:json.data[i].emp_name,appraisal_id:json.data[i].appraisal_id})  ;
                                                i==json.data.length-1?(setNamesLoaded(true), console.log(pendingAppraisalCandidateNamesAtAppraiser)):null;
                                              }
                                              json.data.length==0?localStorage.setItem('showOrNot_AppraisalForm_At_Appraiser','flase'):null;
                                            
                                            } 
                                          }
                                )

                            fetch(ApiInfo.baseUrlForWeb+ApiInfo.pendingAtHR , 
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
                                              console.log(json.data)
                                              for(let i=0;i<json.data.length;i++){
                                                pendingAppraisalCandidateNamesAtHR.push({emp_name:json.data[i].emp_name,appraisal_id:json.data[i].appraisal_id})  ;
                                                i==json.data.length-1?(setEmpNamesAtHRLoaded(true), console.log(pendingAppraisalCandidateNamesAtHR)):null;
                                              }
                                             json.data.length==0?localStorage.setItem('showOrNot_AppraisalForm_At_HR','flase'):localStorage.setItem('showOrNot_AppraisalForm_At_HR','true');

                                            } 
                                          }
                                )
                            
                             
    },[])

    return( 
             
               <View style={{flex:1 }} >
              
                          {/* useMediaQuery('(min-width:600px)')==true? */}
                   <React.Suspense fallback={null}>              
                          <View style={{   backgroundColor:'#003A59',
                                          position:'relative', 
                                          flex:1,
                                      }}>
                              <SecondHeaderButtons   />
                             
                              <View style={{alignItems:'center',flexGrow:1}}>
                 
                                <Card style={{
                                              width:responsiveWidth(63)  , 
                                                flexDirection:"column", 
                                              borderRadius:10, 
                                              marginTop:responsiveHeight(6)  ,            // WHITE CARD
                                              flexGrow:1,  alignSelf:'center',
                                            }}>
                                    
                                    <ScrollView>
                                    
                                      <View style={{flexDirection:'row'}}>
                                      
                                          {HomePageBlueCard.AllTabLinks()}
                                         
                                          <View style={{marginHorizontal: responsiveWidth(3),
                                                      marginTop:responsiveHeight(3)}}>
                                
                                            
                                            
                                            <View style={{flexDirection:'row',justifyContent:'space-between'
                                                          }}>
                                                <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                   <Image source={require('../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                    <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                      Welcome {localStorage.getItem('loginUserName')}
                                                    </Text> 
                                                </View>
                                                <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                  <Text style={{fontWeight:'500'}}> Home</Text>
                                                </View>
                                                
                                             </View>

                                            <Card style={{  
                                                      width:responsiveWidth(42)  ,
                                                      height:responsiveHeight(60),
                                                      borderRadius:10,
                                                      backgroundColor:'#F3F1F1', 
                                                    //  paddingLeft:responsiveWidth(2), 
                                                      marginTop:responsiveHeight(2)  , 
                                                      alignItems:'center'  ,          //FORM CARD CONTAINER
                                                      paddingBottom:responsiveHeight(2)
                                                }}
                                            > 
                                             <ScrollView>
                                              {
                                                objectivesLoaded
                                                ?
                                                <View style={{width:responsiveWidth(40)}}>
                                                  
                                                    <View style={{width:responsiveWidth(40)}}>
                                                      <Calendar/> 
                                                    </View>

                                                    <View style={{ flexDirection:'row', width:responsiveWidth(8) }}>

                                                  
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                                  <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#a6d608',marginTop:'3%'}} ></View>
                                                                  <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                                    {StaticWordsWeb.HomePage.calendarText.present}
                                                                  </Text> 
                                                          </View>
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                              <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#f0e130',marginTop:'3%'}} ></View>
                                                              <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                                {StaticWordsWeb.HomePage.calendarText.absent}
                                                              </Text> 
                                                          </View> 
                                                          
                                                        
                                                            
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                                <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#c40233',marginTop:'3%'}} ></View>
                                                                <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                                  {StaticWordsWeb.HomePage.calendarText.weekend}
                                                                </Text> 
                                                          </View>
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                                <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#ff7f50',marginTop:'3%' }} ></View>
                                                                  <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                                  {StaticWordsWeb.HomePage.calendarText.leavedays}
                                                  
                                                                  </Text>  
                                                          </View>
                                                          
                                                            
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                                  <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#ffc0cb',marginTop:'3%' }} ></View>
                                                                  <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                                    {StaticWordsWeb.HomePage.calendarText.halfday}
                                                                  </Text>  
                                                          </View> 
                                                          <View style={{flexDirection:'row',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(1) }}>
                                                    <View style={{borderColor:'black',borderRadius:7.5, width:15,height:15,backgroundColor:'#ace5ee',marginTop:'3%'}} ></View>
                                                    <Text style={{fontSize:responsiveFontSize(1),fontWeight:'bold',marginLeft:responsiveWidth(0.5)}}>
                                                      {StaticWordsWeb.HomePage.calendarText.holiday}

                                                    </Text>   
                                                  </View>
                                                

                                                  </View>     

                                                    <View style={{ padding:12, marginTop:responsiveHeight(3),marginBottom:responsiveHeight(3),width:responsiveWidth(40) }}>   
                                                    
                                                      { 
                                                          showOrNot==1 //show form fill 
                                                          
                                                          ?    // to show or not appraisal form status at candidate side
                                                                      
                                                          <TouchableOpacity style={{
                                                                                flexDirection:'row',justifyContent:'space-between',
                                                                                width:responsiveWidth(38),backgroundColor:'#ee400030',
                                                                                padding:responsiveHeight(1.5),borderRadius:10,
                                                                                borderWidth:2,borderColor:'#ee4000',
                                                                                marginBottom:responsiveHeight(3)
                                                                              
                                                                              }}
                                                                            onPress={()=>//navigation.navigate('AppraisalForm')
                                                                            history.push('/appraisal-form')
                                                                          }
                                                                            > 
                                                                            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                                                                              <View style={{flexDirection:'row',alignItems:'center'}}>
                                                                          
                                                                                <Ionicons name="notifications-circle" size={20} color="#ee4000" />

                                                                                <Text style={{fontWeight:'bold',justifyContent:'space-between',alignSelf:'flex-start'}}>
                                                                                  {StaticWordsWeb.HomePage.appraisalText.text1}  
                                                                                </Text>
                                                                              </View> 
                                                                                <Text style={{fontWeight:'400',alignSelf:'flex-start'}}>	 	
                                                                                  {StaticWordsWeb.HomePage.appraisalText.text1}  
                                                                                </Text>
                                                                            </View>

                                                          </TouchableOpacity>
                                                        
                                                          :

                                                            (
                                                              showOrNot==2//pending at appraiser
                                                              
                                                              ?

                                                              <TouchableOpacity style={{
                                                                                        flexDirection:'row',justifyContent:'space-between',
                                                                                        width:responsiveWidth(38),backgroundColor:'#ee400030',
                                                                                        padding:responsiveHeight(1),borderRadius:10,borderWidth:2,
                                                                                        borderColor:'#ee4000',alignItems:'flex-start',
                                                                                        marginBottom:responsiveHeight(3)
                                                                                      
                                                                                      }}
                                                                            onPress={()=>history.push('/appraisal-details')}
                                                              >
                                                               <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
                                                                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                                                                <Ionicons name="notifications-circle" size={20} color="#ee4000" />
                                                                
                                                                                <Text style={{fontWeight:'bold',alignSelf:'flex-start'}}>
                                                                                  {StaticWordsWeb.HomePage.appraisalText.status}  
                                                                                </Text> 
                                                                              </View>
                                                                              <Text style={{fontWeight:'500',color:'#ee4000',alignSelf:'flex-start'}}>	 	
                                                                                {StaticWordsWeb.HomePage.appraisalText.pendingAtAppraiser}  
                                                                              </Text>
                                                               </View>
                                                              </TouchableOpacity>  
                                                              
                                                              :

                                                              (
                                                                (
                                                                  showOrNot==3//pending at hr
                                                              
                                                                  ? 

                                                                  <TouchableOpacity
                                                                             style={{
                                                                                      flexDirection:'row',justifyContent:'space-between',
                                                                                      width:responsiveWidth(38),backgroundColor:'#ee400030',
                                                                                      padding:responsiveHeight(1.5),borderRadius:10,borderWidth:2,
                                                                                      borderColor:'#ee4000',marginBottom:responsiveHeight(3)
                                                                                    
                                                                                    }}
                                                                            onPress={()=>history.push('/appraisal-details')}
                                                                                    
                                                                                  >
                                                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                                                                    
                                                                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                                                                
                                                                                      
                                                                                <Ionicons name="notifications-circle" size={20} color="#ee4000" />

                          
                                                                                <Text style={{fontWeight:'bold',alignSelf:'flex-start'}}>
                                                                                  {StaticWordsWeb.HomePage.appraisalText.status}  
                                                                                </Text> 
                                                                            </View>
                                                                            <Text style={{fontWeight:'500',color:'#ee4000',alignSelf:'flex-start'}}>	 	
                                                                              {StaticWordsWeb.HomePage.appraisalText.pendingAtHR}  
                                                                            </Text>
                                                                            </View>
                                                                  </TouchableOpacity>  
                                                                
                                                                  :

                                                                  null
                                                                )
                                                              )
                                                            )
                                          
                                                      }
                                                      
                                                      {
                                                        namesAtAppraiserLaoded // for showing lists of appraisal forms pending at appraiser side
                                                        
                                                        ?

                                                        pendingAppraisalCandidateNamesAtAppraiser.map((item,index)=>{
                                                            return(
                                                                  <TouchableOpacity key={index} style={{
                                                                    flexDirection:'row',justifyContent:'space-between',
                                                                    width:responsiveWidth(38),backgroundColor:'#ee400030',
                                                                    padding:responsiveHeight(1),borderRadius:10,
                                                                    borderWidth:2,borderColor:'#ee4000',
                                                                    marginTop:responsiveHeight(2)
                                                                  }}
                                                                  
                                                                  onPress={()=>{
                                                                            //    navigation.navigate('AppraiserAppraisalForm'),
                                                                            history.push('/appraiser-appraisal-form');
                                                                                localStorage.setItem('appraisal_id',item.appraisal_id)
                                                                                localStorage.setItem('emp_name',item.emp_name)
                                                                  }}
                                                                >
                                                                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                                                                    <Ionicons name="notifications-circle" size={20} color="#ee4000" />
                                                                    <Text style={{fontWeight:'bold'}}>
                                                                      {StaticWordsWeb.HomePage.appraisalText.appraisalCandidate}  
                                                                    </Text> 
                                                                  </View>
                                                                    <Text style={{fontWeight:'500',color:'#ee4000'}}>	 	
                                                                        {item.emp_name}  
                                                                    </Text>
                                                                </TouchableOpacity>
                                                              )
                                                        })

                                                        :

                                                        null
                                                      }

                                                      {

                                                        namesAtHRLaoded //for showing lists of appraisal forms pending at hr side
                                                        
                                                        ?

                                                        pendingAppraisalCandidateNamesAtHR.map((item,index)=>{
                                                            
                                                              return(
                                                                    <TouchableOpacity key={index} style={{
                                                                      flexDirection:'row',justifyContent:'space-between',
                                                                      width:responsiveWidth(38),backgroundColor:'#ee400030',
                                                                      padding:responsiveHeight(1),borderRadius:10,
                                                                      borderWidth:2,borderColor:'#ee4000',
                                                                      marginTop:responsiveHeight(2)
                                                                    }}
                                                                    
                                                                   onPress={()=>{     history.push('/hr-appraisal-form')
                                                                     //navigation.navigate('HRAppraisalForm',{appraisal_id:item.appraisal_id,emp_name:item.emp_name})
                                                                   }}
                                                                  >
                                                                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                                                                      <Ionicons name="notifications-circle" size={20} color="#ee4000" />
                                                                      <Text style={{fontWeight:'bold'}}>
                                                                        {StaticWordsWeb.HomePage.appraisalText.appraisalCandidate}  
                                                                      </Text> 
                                                                    </View>
                                                                      <Text style={{fontWeight:'500',color:'#ee4000'}}>	 	
                                                                          {item.emp_name}  
                                                                      </Text>
                                                                  </TouchableOpacity>
                                                                )
                                                          })

                                                        :

                                                        <ActivityIndicator/>
                                                      }   
                                                        <TouchableOpacity style={{
                                                                      // flexDirection:'row',justifyContent:'space-between',
                                                                        width:responsiveWidth(38),backgroundColor:'#ee400030',marginTop:responsiveHeight(2),
                                                                        padding:responsiveHeight(1),borderRadius:10,borderWidth:2,borderColor:'#ee4000'
                                                                      
                                                                      }}
                                                                   onPress={()=>history.push('/applied-leave-table-view')
                                                                    //navigation.navigate('LeaveTable')
                                                                  }
                                                            >
                                                                <View style={{flexDirection:'row'}}>
                                                                      <Ionicons name="notifications-circle" size={20} color="#ee4000" />
                                                                      <View  style={{flexDirection:'row', justifyContent:'space-between',width:'95%'}}>
                                                                        <View>
                                                                          <Text style={{fontWeight:'bold',marginLeft:responsiveWidth(.5)}}>Requested Leave  </Text> 
                                                                        </View>
                                                                        <View>
                                                                          <Text style={{fontWeight:'400'}}> {from} to {to}</Text>
                                                                        </View>
                                                                      </View>
                                                                </View>
                                                            
                                                                <View  style={{flexDirection:'row', justifyContent:'space-between',width:'100%'}}>
                                                                          <View>
                                                                            <Text style={{fontWeight:'bold',marginLeft:responsiveWidth(2)}}>Leave Status </Text> 
                                                                          </View>
                                                                          <View>
                                                                            <Text style={{fontWeight:'400'}}> {leaveStatusForAppraiser}</Text> 
                                                                          </View>      
                                                                  
                                                                </View>
                                                                
                                                        </TouchableOpacity>
                                                      
                                                      {
                                                        
                                                        leaveStatusForAppraiser!=null   // to show pending leaves at appraiser side

                                                        ?

                                                        <TouchableOpacity style={{
                                                                      // flexDirection:'row',justifyContent:'space-between',
                                                                        width:responsiveWidth(38),backgroundColor:'#ee400030',marginTop:responsiveHeight(2),
                                                                        padding:responsiveHeight(1),borderRadius:10,borderWidth:2,borderColor:'#ee4000'
                                                                      
                                                                      }}
                                                                   onPress={()=>history.push('/applied-leave-table-view')
                                                                    //navigation.navigate('LeaveTable')
                                                                  }
                                                            >
                                                                <View style={{flexDirection:'row'}}>
                                                                      <Ionicons name="notifications-circle" size={20} color="#ee4000" />
                                                                      <View  style={{flexDirection:'row', justifyContent:'space-between',width:'95%'}}>
                                                                        <View>
                                                                          <Text style={{fontWeight:'bold',marginLeft:responsiveWidth(.5)}}>Requested Leave  </Text> 
                                                                        </View>
                                                                        <View>
                                                                          <Text style={{fontWeight:'400'}}> {from} to {to}</Text>
                                                                        </View>
                                                                      </View>
                                                                </View>
                                                            
                                                                <View  style={{flexDirection:'row', justifyContent:'space-between',width:'100%'}}>
                                                                          <View>
                                                                            <Text style={{fontWeight:'bold',marginLeft:responsiveWidth(2)}}>Leave Status </Text> 
                                                                          </View>
                                                                          <View>
                                                                            <Text style={{fontWeight:'400'}}> {leaveStatusForAppraiser}</Text> 
                                                                          </View>      
                                                                  
                                                                </View>
                                                                
                                                            </TouchableOpacity>
                                                          
                                                        :
                                                          
                                                        null
                                                     
                                                      }  
                                                      
                                                      
                                                    
                                                      <Text style={{fontWeight:'bold',display:'flex',flexDirection:'column',marginBottom:responsiveHeight(2),color:'#F15A25'}}>
                                                      
                                                        {StaticWordsWeb.HomePage.objectiveHeading}
                                                      
                                                      </Text>
                                                    
                                                      {
                                                        objectivesLoaded
                                                        
                                                        ?
                                                        
                                                        <FlatList          
                                                          keyExtractor={(item, index) => index.toString()}
                                                                              data={objectives}
                                                                              renderItem={
                                                                                              ({item,index}) => (  <ListItem style={{ marginTop:responsiveHeight(-2),marginLeft:responsiveWidth(-1) }}>
                                                                                          
                                                                                                                      <ListItem.Content>
                                                                                                                      
                                                                                                                        <ListItem.Title>
                                                                                                                       
                                                                                                                           <FontAwesome name="dot-circle-o" size={12} color="#ee4000" />  {item}

                                                                                                                        </ListItem.Title>
                                                                                                                        
                                                                                                                      </ListItem.Content>
                                                                                                                      
                                                                                                                      </ListItem>
                                                                                                )}
                                                          /> 
                                                        
                                                        :

                                                        <ActivityIndicator/>
                                                      }
                                                        
                                                  </View>     
                                              
                                                </View>

                                                :
                                                <ActivityIndicator style={{marginLeft:responsiveWidth(50)}}/>
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
                   </React.Suspense> 
              </View> 
            
         )
     }
    
   // App.js

// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// export default class Home extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       resourcePath: {},
//     };
//   }

//   selectFile = () => {
//     var options = {
//       title: 'Select Image',
//       customButtons: [
//         { 
//           name: 'customOptionKey', 
//           title: 'Choose file from Custom Option' 
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, res => {
//       console.log('Response = ', res);

//       if (res.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (res.error) {
//         console.log('ImagePicker Error: ', res.error);
//       } else if (res.customButton) {
//         console.log('User tapped custom button: ', res.customButton);
//         alert(res.customButton);
//       } else {
//         let source = res;
//         this.setState({
//           resourcePath: source,
//         });
//       }
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Image
//             source={{
//               uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
//             }}
//             style={{ width: 100, height: 100 }}
//           />
//           <Image
//             source={{ uri: this.state.resourcePath.uri }}
//             style={{ width: 200, height: 200 }}
//           />
//           <Text style={{ alignItems: 'center' }}>
//             {this.state.resourcePath.uri}
//           </Text>

//           <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
//               <Text style={styles.buttonText}>Select File</Text>
//           </TouchableOpacity>       
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   button: {
//     width: 250,
//     height: 60,
//     backgroundColor: '#3740ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 4,
//     marginBottom:12    
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#fff'
//   }
// });
