import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

import { colors } from "../../styles";

const Container = styled.TouchableOpacity`
  background: ${({ disabled }) =>
    disabled ? colors.primary.fade(0.8).string() : colors.primary.string()};
  border-radius: 15px;
`;

const Text = styled.Text<{ active: boolean }>`
  font-weight: bold;
  color: ${({ active }) =>
    active ? colors.white.string() : colors.white.fade(0.8).string()};
  padding: 5px 10px;
`;

const TweetButton = (props: TouchableOpacityProps) => {
  return (
    <Container {...props}>
      <Text active={!props.disabled!}>Tweet</Text>
    </Container>
  );
};

export default TweetButton;
