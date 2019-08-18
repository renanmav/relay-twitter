import React from "react";
import {
  NavigationScreenComponent,
  withNavigation,
  useTheme,
  ThemeColors
} from "react-navigation";

import { Container, Text } from "./styles";
import { StatusBar } from "react-native";

const CancelarButton: NavigationScreenComponent = ({ navigation }) => {
  const theme = useTheme();
  const colors = ThemeColors[theme];

  return (
    <Container
      onPress={() => {
        StatusBar.setBackgroundColor(colors.header);
        navigation.goBack();
      }}
    >
      <Text>Cancelar</Text>
    </Container>
  );
};

export default withNavigation(CancelarButton);
