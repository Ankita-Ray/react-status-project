import React from 'react';
import { Image, Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
export default function Page404(){
    return(
        <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
            <Image source={require('../assets/images/OopsImage.jpg')} style={{height:'30%',width:'30%',resizeMode:'contain'}}/>
            <Text style={{fontWeight:'500',fontSize:responsiveFontSize(3)}}>
                404 ( Page Not Found )
            </Text>
        </View>
    )
}