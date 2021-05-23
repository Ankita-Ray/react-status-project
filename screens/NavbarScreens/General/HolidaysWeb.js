import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useHistory } from 'react-router';
import { ApiInfo } from '../../../ApiEndpoints';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { GeneralPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/General';
import { StaticWordsWeb } from '../../staticwordsFile';
// const Demo=React.lazy(()=>import ('../../demo'));

// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
     
     export default function HolidaysWeb(){
     const history=useHistory();
      const [isLoading, setLoading] = React.useState(true);
       const[dataSource2,setData]=React.useState([]);
       React.useEffect(() => {
                           //   localStorage.getItem('password')==null?navigation.navigate('Login'):null
                       
                              fetch(ApiInfo.baseUrlForWeb+ApiInfo.holidayEndpoint,
                            {
                              method:'GET',
                              headers: {
                                'Authorization': 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
                                'Content-Type': 'application/json'
                                } 
                                          }
                            
                              )
                              .then(response => response.json())
                              .then(json => {   
                                              if(json.success)
                                              {
                                                  //setList(json.data,json.data.length),
                                                  setData( json.data)
                                                  // setLength(json.data.length),
                                                  // setList(dataSource,length),
                                                  //alert(data.length)
                                              }
                                              else{
                                                alert('data not found')
                                              }
                                            }
                                  )
                              .catch(error => console.log(error))
                              .finally(() => setLoading(false))
                              
                                 
                              }, []
                      );
    
     const dataSource1=[
                          { date: 'Date', 
                          // marginTop:'0%', 
                          //backgroundColor:'#E48E37', 
                          name:'Holiday',
                            color:'#fff',
                          fontWeight:'bold',
                          topStartRadius:5,
                          topEndtRadius:5,
                          }
                        
                        ]

     const dataSource=dataSource1.concat(dataSource2)                    
      
       
     
        
         
         const keyExtractor = (item, index) => index.toString()
        
         const renderItem = ({ item,index}) => (
                
                 <ListItem bottomDivider containerStyle={{ 
                                                           borderBottomColor:'#fff',  
                                                           marginHorizontal:0,
                                                           paddingTop:'3%',               
                                                           paddingBottom:'3%',
                                                           marginTop:item.marginTop,     
                                                           backgroundColor:(index==0 ? '#E48E37' : (index%2 ? '#E48E3730':'#F15A2550') ) ,
                                                           borderBottomEndRadius:item.bottomStartRadius,
                                                           borderBottomStartRadius:item.bottomEndRadius,
                                                           borderTopEndRadius:item.topEndtRadius,
                                                           borderTopStartRadius:item.topStartRadius 
                                                        }} 
                >
                  <ListItem.Content style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            height:responsiveScreenHeight(2), 
                                        }}
                >
                    <ListItem.Title style={{ 
                                             fontSize:responsiveFontSize(1.1),
                                             fontWeight: (index==0 ? 'bold' : '500' ) ,
                                             color: (index==0 ? '#fff' : '#333333' ) ,
                                             paddingBottom:'5%'
                                          }}>
                                          
                       {item.date} 
                    </ListItem.Title>
                    <ListItem.Title style={{ 
                                             fontSize:responsiveFontSize(1.1), 
                                             fontWeight:(index==0 ? 'bold' : '500' ),
                                             color: (index==0 ? '#fff' : '#333333' ) , 
                                          }}>
                       {item.name}
                    </ListItem.Title>
                  </ListItem.Content> 
                </ListItem> 
            
              )
       

        return(
              
            <View style={{flex:1}} >
    
                 
              <React.Suspense fallback={null}>     
                
                <View style={{  
                                 backgroundColor:'#003A59',
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
                                    }}>
                                        
                            <View style={{flexDirection:'row', }}>           
                            
                                {GeneralPageBlueCard.Holidays()}

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
                                                
                                                     <Text style={{fontWeight:'500'}}> <Text onPress={()=>history.push('/home')}>Home</Text><Text> / General /</Text><Text style={{color:'#F15A25'}}>Holidays</Text></Text>
                                                </View>
                                                
                                  </View>
                                  
                                   <Card 
                                          style={{  
                                                width:responsiveWidth(42)  ,
                                                height:responsiveHeight(62),
                                                borderRadius:10, 
                                                backgroundColor:'#F3F1F1', 
                                                paddingLeft:responsiveWidth(2),
                                                paddingRight:responsiveWidth(2),
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
        
                                            {StaticWordsWeb.Holidays.header}
        
                                        </Text>
                                        
                                        
                                        { isLoading ? <ActivityIndicator/> : (  
                                                                                <FlatList   showsVerticalScrollIndicator={false}
                                                                                            keyExtractor={keyExtractor}
                                                                                            data={dataSource}
                                                                                            renderItem={renderItem}
                                                                                            style={{ flex:1}}
                                                                                />
                                                                              )
                                        }
                                        

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
    
   