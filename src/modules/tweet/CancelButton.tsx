import React from "react";
import {
  NavigationScreenComponent,
  withNavigation,
  useTheme,
  ThemeColors
} from "react-navigation";
import { StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

import { colors } from "../../styles";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: ${colors.primary.fade(0.4).string()};
`;

const CancelButton: NavigationScreenComponent = ({ navigation }) => {
  const theme = useTheme();
  const themeColors = ThemeColors[theme];

  return (
    <Container
      onPress={() => {
        Platform.OS === "android" &&
          StatusBar.setBackgroundColor(themeColors.header);
        navigation.goBack();
      }}
    >
      <Text>Cancel</Text>
    </Container>
  );
};

export default withNavigation(CancelButton);
