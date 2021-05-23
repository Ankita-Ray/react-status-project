import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';

  export default class LeaveDropdown extends React.Component {
    constructor(props) {
      super(props);
  
      
      this.state = {
        
        
        selectedItem: null,
        
      };
  
    }
  render() {
        const placeholder = {
          label: 'Leave Type ',
          value: null,
          color: 'red',
             
          };
          const items = this.props.leaveItems;
    
        return (      

            <RNPickerSelect
            placeholder={placeholder} 
            items={items}
            onValueChange={value => {
                                      this.setState({
                                          selectedItem: value,
                                      }); 
                                    //  alert(value)
                                    Platform.OS=='web'?localStorage.setItem('leaveSelected',value):(global.leaveSelected=value)
                                    }
                          }
            style={{
            ...pickerSelectStyles, 
            iconContainer: {
                top: 12,
                right: 12,
            },
            placeholder:{
              color:'#33333350',
              fontSize:responsiveFontSize(2)
            },
            inputWeb:{
              height:responsiveHeight(6), 
              fontSize:responsiveFontSize(1.2),
              paddingLeft:responsiveWidth(.5),
              borderRadius:5 ,
              borderWidth:0, 
              color:'#333333'
              
            },
            }}
            value={this.state.selectedItem}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return( 
                  Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                  //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
              )
                }}
            />
        )
      }
  }
  const pickerSelectStyles = StyleSheet.create({
     
    inputAndroid: {  
      paddingHorizontal: '4%', 
      borderRadius: 5,
      color: '#333333',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor:'#fff', 
      borderWidth:1,
      borderColor:'#ececec',
      height:responsiveScreenHeight(6)
    },
    
  });