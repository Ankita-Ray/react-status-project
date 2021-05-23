import React from 'react';
import { Button } from 'react-native-elements';
 
 
  
  const FormButton = ({ title, icon,buttonType, buttonColor,buttonStyle,onPress,style,titleStyle,containerStyle,...rest }) => (
    <Button
      {...rest}
      style={style}
      type={buttonType}
      title={title}
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      containerStyle={containerStyle}
      onPress={onPress}
      icon={icon}
    />
    
  )

export default  FormButton ;