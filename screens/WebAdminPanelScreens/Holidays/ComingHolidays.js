import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ApiInfo } from '../../../api/constants';
import { RelativeLinkColors } from '../../../assets/Color Constants/WebColors';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { StaticWordsWeb } from '../../../screens/WebView Screens/staticwordsFile';

    
     
export default function ComingHolidays({navigation}){
      const [isLoading, setLoading] = React.useState(true);
       const[dataSource2,setData]=React.useState([]);
       React.useLayoutEffect(() => {
                fetch(ApiInfo.baseUrlForWeb+ApiInfo.holidayEndpoint,
              {
                method:'GET',
                headers: {
                  'Authorization': 'Basic ' + btoa('ankita@keyss.in' + ':' + 'a'),
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
                                 console.log(json.data)
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
              
      }, []);
    
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
              
            <View style={{flex:1 ,paddingTop:'1%'}} >
    
                <SecondHeaderButtons navigation={navigation} style={{backgroundColor:'#fff',marginTop:'10%'}}/>
                       
                <View style={{   backgroundColor:'#003A59',
                                 position:'relative',
                                 top:20,
                                 flex:1,
                                //  left:0,
                                //  right:0,
                                //  bottom:0,
                                 alignItems:'center'
                           }}>
                     <Card style={{
                                   width:responsiveWidth(60)  ,
                                   height:responsiveHeight(65) ,
                                    
                                  // marginHorizontal:responsiveWidth(20),
                                   borderRadius:10, 
                                   marginTop:responsiveHeight(5)  ,            // WHITE CARD
                                 }}>
                                     
                         <View style={{flexDirection:'row', }}>           
                         
                             <Card style={{
                                             width:responsiveWidth(15)  ,
                                             height:responsiveHeight(26.6), 
                                             borderRadius:10,
                                             backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
                                             marginLeft: responsiveWidth(1.4),
                                             marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                              
                                        }}> 
                                 <View style={{  backgroundColor:RelativeLinkColors.HeaderTealt,
                                                 borderTopRightRadius:10,
                                                 borderTopLeftRadius:10, 
                                                 flexDirection:'row',
                                                 alignItems:'center',
                                                 paddingLeft:responsiveWidth(2),
                                             }}>
                                              
                                            <FontAwesome5 name="link" size={16} color="#fff"  />   
                                            <Text style={{color:'#fff', 
                                                         fontWeight:'bold',
                                                         paddingVertical:responsiveHeight(2), 
                                                         fontSize:responsiveFontSize(1.1),
                                                         paddingLeft:responsiveWidth(1),
                                            
                                                         }} >
                                                {StaticWordsWeb.relativeLinkHeaders.relativeLink}
                                            </Text>  
                                 </View>
                                 <TouchableOpacity onPress={()=>navigation.navigate('Holiday')} 
                                                   
                                 >
                                            <Text style={{   color:'#fff',  
                                                             fontWeight:'bold',
                                                             paddingVertical:responsiveHeight(2),
                                                             fontSize:responsiveFontSize(.9),
                                                             paddingLeft:responsiveWidth(2),
                                                         }} >
                                                {StaticWordsWeb.relativeLinkHeaders.holidays} 
                                             </Text>  
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                   onPress={()=>navigation.navigate('Contacts')}                      
                                 >
                                            <Text style={{   color:'#fff', 
                                                             fontWeight:'bold',
                                                             paddingVertical:responsiveHeight(2),
                                                             fontSize:responsiveFontSize(.9),
                                                             paddingLeft:responsiveWidth(2),
                                             }} >
                                                 {StaticWordsWeb.relativeLinkHeaders.contacts} 
                                             </Text>  
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{ 
                                                            backgroundColor:RelativeLinkColors.InactiveDarkCyan ,
                                                            borderBottomStartRadius:10,
                                                            borderBottomEndRadius:10
                                                          }}
                                                   onPress={()=>navigation.navigate('Policy')}                        
                                 >
                                            <Text style={{   color:'#fff', 
                                                             fontWeight:'bold',
                                                             paddingVertical:responsiveHeight(2),
                                                             fontSize:responsiveFontSize(.9),
                                                             paddingLeft:responsiveWidth(2),
                                                             
                                             }} >
                                                 {StaticWordsWeb.relativeLinkHeaders.policy}
                                             </Text>  
                                 </TouchableOpacity>
                             </Card> 
                          
                             <View style={{marginHorizontal: responsiveWidth(3), 
                                        marginTop:responsiveHeight(3)}}>
                             <Text style={{fontWeight:'500'}}> <Text onPress={()=>navigation.navigate('Home')}>Home</Text><Text> / Holidays /</Text><Text style={{color:'#F15A25'}}>Coming Holidays</Text></Text>
                             <Card 
                                      style={{  
                                             width:responsiveWidth(38)  ,
                                             height:responsiveHeight(55),
                                             borderRadius:10,
                                             alignSelf:'center',
                                             backgroundColor:'#F3F1F1', 
                                             paddingLeft:responsiveWidth(2),
                                             paddingRight:responsiveWidth(2),
                                             //paddingRight:responsiveWidth(2),
                                             marginTop:responsiveHeight(2)  ,             //FORM CARD CONTAINER
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
         )
     }
    
   