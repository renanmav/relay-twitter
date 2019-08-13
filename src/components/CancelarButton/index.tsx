import React from "react";
import { NavigationScreenComponent, withNavigation } from "react-navigation";

import { Container, Text } from "./styles";

const CancelarButton: NavigationScreenComponent = ({ navigation }) => {
  return (
    <Container onPress={() => navigation.goBack()}>
      <Text>Cancelar</Text>
    </Container>
  );
};

export default withNavigation(CancelarButton);
