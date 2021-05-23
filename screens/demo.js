import React, { Component } from "react";
import { Text } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import styled, { keyframes } from "styled-components";
const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 20px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Dot = styled.div`
  background-color: black;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.7s linear infinite;
  animation-delay: ${props => props.delay};
`;
class LoadingDots extends Component {
  render() {
    return (
      <DotWrapper>
          <Text style={{fontSize:responsiveFontSize(3),marginRight:responsiveWidth(1)}}>Loading</Text>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    )
  }
}
export default LoadingDots