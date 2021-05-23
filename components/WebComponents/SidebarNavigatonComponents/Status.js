import { FontAwesome5 } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useHistory } from 'react-router';
import { RelativeLinkColors } from "../../../assets/Color Constants/WebColors";
import { StaticWordsWeb } from "../../../screens/staticwordsFile";

export const StatusPageBlueCard={
                      
                                    EnterStatus:function(){
                                        const history=useHistory();

                                        return(
                                                <Card style={styles.blueCard}>
                                                    <View style={styles.relativeLinkContainer}>
                                                    <FontAwesome5 name="link" size={16} color="#fff"  />                          
                                                    <Text style={styles.relativeLink} >
                                                                    {StaticWordsWeb.relativeLinkHeaders.relativeLink}
                                                    </Text>  
                                                    </View>
                                                    <TouchableOpacity onPress={()=>history.push('/status/checkstatus')}>
                                                    <Text style={styles.checkStatus} >
                                                                    {StaticWordsWeb.relativeLinkHeaders.checkStatus}
                                                    </Text>  
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{backgroundColor:'#0085BF' }}
                                                                                            
                                                    >
                                                    <Text style={styles.enterStatus} >
                                                                    {StaticWordsWeb.relativeLinkHeaders.enterStatus}
                                                                    </Text>  
                                                    </TouchableOpacity>
                                                </Card>
                                    
                                            )},

                                    CheckStatus:function(props){
                                       
                                          return( 
                                                    <Card style={{
                                                                    width:responsiveWidth(15)  ,
                                                                    height:responsiveHeight(25), borderRadius:10,     
                                                                    backgroundColor:'#0079AE', 
                                                                    marginLeft: responsiveWidth(1.4), 
                                                                    marginTop:responsiveHeight(3)  ,                        // BLUE CARD
                                                                }}
                                                    >                                                   
                                                        <View style={{ backgroundColor:'#006498',
                                                                        borderTopRightRadius:10,
                                                                        borderTopLeftRadius:10,
                                                                        paddingLeft:responsiveWidth(2),
                                                                        flexDirection:'row',
                                                                        alignItems:'center'
                                                                    }}>
                                                            <FontAwesome5 name="link" size={14} color="#fff"  />                          
                                                            <Text style={{color:'#fff', 
                                                                        fontWeight:'bold',
                                                                        paddingVertical:responsiveHeight(2),
                                                                        paddingLeft:responsiveWidth(1),
                                                                        fontSize:responsiveFontSize(1.1)
                                                                        }} >
                                                                            RELATIVE LINKS
                                                                        </Text>  
                                                        </View>
                                                    
                                                        <TouchableOpacity style={{backgroundColor:'#0085BF' }}  onPress={()=>props.history.push('/status/checkstatus')} >
                                                            <Text style={{  color:'#fff', 
                                                                            paddingLeft:responsiveWidth(2),
                                                                            fontWeight:'bold',
                                                                            paddingVertical:responsiveHeight(2),
                                                                            fontSize:responsiveFontSize(0.9)
                                                                        }} >
                                                                            CHECK STATUS
                                                            </Text>  
                            
                                                        </TouchableOpacity>
                                                    
                                                        <TouchableOpacity onPress={()=>props.history.push('/status/enterstatus')} >
                                                            <Text style={{color:'#fff',paddingLeft:responsiveWidth(2),
                                                                        fontWeight:'bold',paddingVertical:responsiveHeight(2),
                                                                        fontSize:responsiveFontSize(0.9)
                                                                        }} >
                                                                            ENTER STATUS
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
                                        
        },
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
})