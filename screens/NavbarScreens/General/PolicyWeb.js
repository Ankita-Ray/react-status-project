 import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import HTML from "react-native-render-html";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router';
import { ApiInfo } from '../../../ApiEndpoints';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { GeneralPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/General';
import { StaticWordsWeb } from '../../staticwordsFile';

// const Demo=React.lazy(()=>import ('../../demo'));

// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
     
 
const PolicyWeb=()=>{
  const history=useHistory();
  const [isLoading, setLoading] = React.useState(true);
  const[data,setData]=React.useState();

  React.useEffect(() => {
   
                         // localStorage.getItem('password')==null?navigation.navigate('Login'):null
                          
                          let encryptedCredentials =   btoa(localStorage.getItem("username")+ ":" +localStorage.getItem("password"));
 
                          fetch(ApiInfo.baseUrlForWeb+ApiInfo.policyEndpoint,
                                      {
                                        method:'GET', 
                                        headers: {
                                                  'Authorization': 'Basic ' + encryptedCredentials,
                                                  'accept':'application/json',
                                                }
                                      }
                              )
                        .then(response => response.json())
                        .then(json => {   
                                        if(json.success)
                                        {
                                                setData( json.data)
                                              
                                        }
                                          
                                      }
                              )
                        .catch(error => console.log(error))
                        .finally(() => setLoading(false))
         
                        
 }, []);
    
   

         return(
              
            <View style={{flex:1}} >
    
               <React.Suspense fallback={null}>
                       
                <View style={{   backgroundColor:'#003A59',
                                 position:'relative', 
                                 flex:1, 
                           }}>
                   
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
                                        
                            <View style={{flexDirection:'row', }}>           
                            
                                {GeneralPageBlueCard.Policy()}
                                
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
                                                             <Text style={{fontWeight:'500'}}> <Text onPress={()=>history.push('/home')}>Home</Text><Text> / General /</Text><Text style={{color:'#F15A25'}}>Policy</Text></Text>
                                                    </View>
                                                    
                                    </View>
                                 
                                  
                                    <Card 
                                          style={{  
                                                width:responsiveWidth(42)  ,
                                                height:responsiveHeight(62),
                                                borderRadius:10, 
                                                backgroundColor:'#F3F1F1', 
                                                paddingLeft:responsiveWidth(2), 
                                                marginTop:responsiveHeight(1)  ,             //FORM CARD CONTAINER
                                                }}
                                    >
                                        <Text 
                                                style={{fontWeight:'700',
                                                      fontSize:responsiveFontSize(1.5),
                                                      color:'#333333',
                                                      marginTop:responsiveHeight(2),
                                                      marginBottom:responsiveHeight(0)
                                                    }}>
        
                                            {StaticWordsWeb.PolicyPage.header}
        
                                        </Text>
                                        <ScrollView showsVerticalScrollIndicator={true}>
                                                
                                            <HTML source={{ html:  data  }}   />
                                                  
                                        </ScrollView>
              
                                    </Card> 
                                
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
    
     export default PolicyWeb;