import React from "react";
import { TouchableOpacityProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Container } from "./styles";
import { colors } from "../../styles";

export default function FabNewTweet(props: TouchableOpacityProps) {
  return (
    <Container {...props}>
      <Icon name="md-create" size={24} color={colors.white.string()} />
    </Container>
  );
}
