import styled from "styled-components/native";
import { colors } from "../../styles";
import { StyleSheet } from "react-native";

// @ts-ignore
import logo from "../../assets/img/logo.png";

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: "contain"
})`
  width: 64px;
  height: 64px;
  margin-bottom: 30px;
`;

export const Container = styled.TouchableWithoutFeedback``;

export const Content = styled.SafeAreaView`
  flex: 1;
  background: ${colors.white.string()};
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 40px;
`;

export const Input = styled.TextInput.attrs({
  autoCorrect: false,
  placeholderTextColor: colors.regular.string()
})`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${colors.light.string()};
  width: 100%;
  padding: 0;
  margin-top: 24px;
`;

interface ButtonProps {
  colorfull?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  border-width: 1px;
  border-color: ${colors.primary.string()};
  border-radius: 20px;
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  background: ${({ colorfull }) =>
    colorfull ? colors.primary.string() : colors.white.string()};
  margin-top: 20px;
  height: 42px;
`;

interface ButtonTextProps {
  light?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ light }) =>
    light ? colors.white.string() : colors.primary.string()};
  font-weight: bold;
`;
