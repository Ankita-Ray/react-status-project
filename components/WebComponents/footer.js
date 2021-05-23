import React from 'react'
import { Text, View } from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { StaticWordsWeb } from '../../screens/staticwordsFile'

export default function Footer(){
    return(
        <View style={{alignItems:'center',marginVertical:responsiveHeight(1)}}>
                    <Text style={{color:'#fff'}}>
                        {StaticWordsWeb.footer.text1}
                    </Text>
                    <Text style={{color:'#fff'}}>
                      {StaticWordsWeb.footer.text2}
                    </Text>
        </View>
    )
}