import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Text } from "./styles";

const TweetarButton = (props: TouchableOpacityProps) => {
  return (
    <Container {...props}>
      <Text>Tweetar</Text>
    </Container>
  );
};

export default TweetarButton;
