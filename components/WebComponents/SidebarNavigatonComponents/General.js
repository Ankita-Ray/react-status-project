import { FontAwesome5 } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router';
import { RelativeLinkColors } from "../../../assets/Color Constants/WebColors";
import { StaticWordsWeb } from "../../../screens/staticwordsFile";

export const GeneralPageBlueCard={
  
 

                    
                                    Holidays:function(){
                                           
                                            const history=useHistory();

                                            return(
                                                    <Card style={{
                                                                    width:responsiveWidth(15)  ,
                                                                    height:responsiveHeight(26.6), 
                                                                    borderRadius:10,
                                                                    backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
                                                                    marginLeft: responsiveWidth(1.4),
                                                                    marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                                                    
                                                                }}
                                                    > 
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
                                                    
                                                        <TouchableOpacity onPress={()=>history.push('/general/holidays')} 
                                                                        
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
                                                                        onPress={()=>history.push('/general/contacts')}                      
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
                                                                        onPress={()=>history.push('/general/policy')}                        
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
                                
                                                )},

                                    Contacts:function(){
                                          
                                        const history=useHistory();

                                        return( 
                                                    <Card style={{
                                                                    width:responsiveWidth(15)  ,
                                                                    height:responsiveHeight(26.6), 
                                                                    borderRadius:10,
                                                                    backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
                                                                    marginLeft: responsiveWidth(1.4),
                                                                    marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                                                    
                                                                }}
                                                    > 
                                                    
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
                                                    
                                                        <TouchableOpacity  style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                                        onPress={()=>history.push('/general/holidays')} 
                                                                        
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
                                                    
                                                        <TouchableOpacity style={{backgroundColor:RelativeLinkColors.ActiveDarkCyan }}
                                                                        onPress={()=>history.push('/general/contacts')}                      
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
                                                                        onPress={()=>history.push('/general/policy')}                        
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
                               
                                          )
                                        }, 

                                    Policy:function(){
                                          
                                        const history=useHistory();

                                        return( 
                                                    <Card style={{
                                                                        width:responsiveWidth(15)  ,
                                                                        height:responsiveHeight(26.6), 
                                                                        borderRadius:10,
                                                                        backgroundColor:RelativeLinkColors.ActiveDarkCyan, 
                                                                        marginLeft: responsiveWidth(1.4),
                                                                        marginTop:responsiveHeight(3)  ,    // BLUE CARD
                                                                                                        
                                                                    }}
                                                    > 
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
                                                        
                                                            <TouchableOpacity  style={{backgroundColor:RelativeLinkColors.InactiveDarkCyan }}
                                                                                onPress={()=>history.push('/general/holidays')} 
                                                                            
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
                                                                            onPress={()=>history.push('/general/contacts')}                      
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
                                                                                        backgroundColor:RelativeLinkColors.ActiveDarkCyan ,
                                                                                        borderBottomStartRadius:10,
                                                                                        borderBottomEndRadius:10
                                                                                    }}
                                                                            onPress={()=>history.push('/general/policy')}                        
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