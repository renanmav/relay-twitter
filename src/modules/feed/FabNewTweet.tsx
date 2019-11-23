import React from "react";
import { TouchableOpacityProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { colors } from "../../styles";

const Container = styled.TouchableOpacity`
  background: ${colors.primary.string()};
  position: absolute;
  bottom: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 10px;
  height: 54px;
  width: 54px;
  elevation: 10;
  margin-bottom: ${getBottomSpace()}px;
`;

export default function FabNewTweet(props: TouchableOpacityProps) {
  return (
    <Container {...props}>
      <Icon name="md-create" size={24} color={colors.white.string()} />
    </Container>
  );
}
