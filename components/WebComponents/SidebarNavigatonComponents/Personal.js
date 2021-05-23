import { FontAwesome5 } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router';
import { RelativeLinkColors } from "../../../assets/Color Constants/WebColors";
import { StaticWordsWeb } from "../../../screens/staticwordsFile";

export const PersonalPageBlueCard={
                        Profile:function(){
                            
                               const history=useHistory();

                                return(
                                    <Card style={styles.card}> 
                                           
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
                                           
                                            <TouchableOpacity onPress={()=> history.push('/personal/profile')} 
                                                        
                                            >
                                                <Text style={{   color:'#fff',  
                                                                    fontWeight:'bold',
                                                                    paddingVertical:responsiveHeight(2),
                                                                    fontSize:responsiveFontSize(.9),
                                                                    paddingLeft:responsiveWidth(2),
                                                                }} >
                                                    {StaticWordsWeb.relativeLinkHeaders.profile} 
                                                    </Text>  
                                            </TouchableOpacity>
                                      
                                            <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                        onPress={()=> history.push('/personal/changepassword')}                      
                                            >
                                                <Text style={{   color:'#fff', 
                                                                    fontWeight:'bold',
                                                                    paddingVertical:responsiveHeight(2),
                                                                    fontSize:responsiveFontSize(.9),
                                                                    paddingLeft:responsiveWidth(2),
                                                    }} >
                                                        {StaticWordsWeb.relativeLinkHeaders.changePassword}
                                                    </Text>  
                                            </TouchableOpacity>
                                      
                                            <TouchableOpacity style={{ 
                                                                backgroundColor:RelativeLinkColors.InactiveDarkCyan ,
                                                                borderBottomStartRadius:10,
                                                                borderBottomEndRadius:10
                                                                }}
                                                        onPress={()=> history.push('/personal/notifications')}                        
                                            >
                                                <Text style={{   color:'#fff', 
                                                                    fontWeight:'bold',
                                                                    paddingVertical:responsiveHeight(2),
                                                                    fontSize:responsiveFontSize(.9),
                                                                    paddingLeft:responsiveWidth(2),
                                                                    
                                                    }} >
                                                        {StaticWordsWeb.relativeLinkHeaders.notifications}
                                                </Text>  

                                            </TouchableOpacity>
                                    </Card> 
                                )},
                        ChangePassword:function(){
                              
                                const history=useHistory();
                                 
                                return(
                                                    <Card style={styles.card}> 
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
                                                        <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                                         onPress={()=> history.push('/personal/profile')}
                                                        >
                                                                <Text style={{   color:'#fff',  
                                                                                    fontWeight:'bold',
                                                                                     paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                                }} >
                                                                    {StaticWordsWeb.relativeLinkHeaders.profile} 
                                                                    </Text>  
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:RelativeLinkColors.AtiveDarkCyan }}
                                                                                                
                                                        >
                                                                <Text style={{   color:'#fff', 
                                                                                    fontWeight:'bold',
                                                                                    paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                    }} >
                                                                        {StaticWordsWeb.relativeLinkHeaders.changePassword}
                                                                    </Text>  
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ 
                                                                    backgroundColor:RelativeLinkColors.InactiveDarkCyan ,
                                                                    borderBottomStartRadius:10,
                                                                    borderBottomEndRadius:10
                                                                    }}
                                                            onPress={()=> history.push('/personal/notifications')}                      
                                                        >
                                                                <Text style={{   color:'#fff', 
                                                                                    fontWeight:'bold',
                                                                                    paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                                    
                                                                    }} >
                                                            {StaticWordsWeb.relativeLinkHeaders.notifications}
                                                        </Text>  
                                            </TouchableOpacity>
                                                    </Card> 
                                    
                                          )
                                        },
                        Notifications:function(){
                                const history=useHistory();
                                       
                                return(
                                                    <Card style={styles.card}> 
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
                                                        <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                                        onPress={()=> history.push('/personal/profile')}
                                                        >
                                                                <Text style={{   color:'#fff',  
                                                                                    fontWeight:'bold',
                                                                                    paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                                }} >
                                                                    {StaticWordsWeb.relativeLinkHeaders.profile} 
                                                                    </Text>  
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                                        onPress={()=> history.push('/personal/changepassword') }                     
                                                        >
                                                                <Text style={{   color:'#fff', 
                                                                                    fontWeight:'bold',
                                                                                    paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                    }} >
                                                                        {StaticWordsWeb.relativeLinkHeaders.changePassword}
                                                                    </Text>  
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ 
                                                                                backgroundColor:RelativeLinkColors.ActiveDarkCyan ,
                                                                                borderBottomStartRadius:10,
                                                                                borderBottomEndRadius:10
                                                                                }}
                                                                        onPress={()=> history.push('/personal/notifications')}                          
                                                        >
                                                                <Text style={{   color:'#fff', 
                                                                                    fontWeight:'bold',
                                                                                    paddingVertical:responsiveHeight(2),
                                                                                    fontSize:responsiveFontSize(.9),
                                                                                    paddingLeft:responsiveWidth(2),
                                                                                    
                                                                    }} >
                                                                        {StaticWordsWeb.relativeLinkHeaders.notifications}
                                                                    </Text>  
                                                        </TouchableOpacity>
                                                    </Card> 
                                    
                                          )
                                     }                
                      }

const styles= StyleSheet.create({
    card:{
        width:responsiveWidth(15)  ,
        height:responsiveHeight(26.6), 
        borderRadius:10,
        backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
        marginLeft: responsiveWidth(1.4),
        marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                        
        }
})