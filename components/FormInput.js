import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  style,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="grey"
      name={name}
      value={value}
      placeholder={placeholder}
      containerStyle={{width:'50%'}}
      inputContainerStyle={{borderWidth:1,color:'black',padding:0,borderRadius:5,paddingHorizontal:5}}
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
     margin: 15
  },
  iconStyle: {
   marginRight: 5
  }
})

export default FormInput