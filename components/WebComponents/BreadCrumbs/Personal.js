import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useHistory } from 'react-router';
import { StaticWordsWeb } from '../../../screens/staticwordsFile';

const activeBreadCrumbColor='#F15A25'

export const PersonalModuleBreadCrumbs={
  
    ProfilePageBreadCrumb:function(){
        const history=useHistory();
             return(   
                       <Text style={styles.BreadCrumbTextFontWeight}>
                        <Text onPress={()=>history.push('/home')}>
                            {StaticWordsWeb.BreadCrumbs.home}
                        </Text>
                        <Text>
                            / {StaticWordsWeb.BreadCrumbs.PersonalModule.personal} /
                        </Text>
                        <Text style={styles.ActiveBreadCrumbTextColor}>
                            {StaticWordsWeb.BreadCrumbs.PersonalModule.profile}
                         </Text>
                       </Text>
                   )
             },
    ChangePasswordPageBreadCrumb:function(){
        const history=useHistory();

                        return(   
                                    <Text style={styles.BreadCrumbTextFontWeight}>
                                        <Text onPress={()=>history.push('/home')}>
                                            {StaticWordsWeb.BreadCrumbs.home}
                                        </Text>
                                        <Text>
                                            / {StaticWordsWeb.BreadCrumbs.PersonalModule.personal} /
                                        </Text>
                                        <Text style={styles.ActiveBreadCrumbTextColor}>
                                            {StaticWordsWeb.BreadCrumbs.PersonalModule.changePassword}
                                        </Text>
                                    </Text>
                                )
    },
    NotificationPageBreadCrumb:function(){
        const history=useHistory();
        return(   
                                <Text style={styles.BreadCrumbTextFontWeight}>
                                <Text onPress={()=>history.push('/home')}>
                                    {StaticWordsWeb.BreadCrumbs.home}
                                </Text>
                                <Text>
                                    / {StaticWordsWeb.BreadCrumbs.PersonalModule.personal} /
                                </Text>
                                <Text style={styles.ActiveBreadCrumbTextColor}>
                                    {StaticWordsWeb.BreadCrumbs.PersonalModule.notifications}
                                    </Text>
                                </Text>
                            )
        }             
}

const styles=StyleSheet.create({
    BreadCrumbTextFontWeight:{
        fontWeight:'500'},
   ActiveBreadCrumbTextColor:{  
        color:activeBreadCrumbColor
    }
})