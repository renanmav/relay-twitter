import styled from "styled-components/native";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import { colors } from "../../styles";

export const Container = styled.View`
  margin-top: ${ifIphoneX(getStatusBarHeight(), 0)}px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

interface Theme {
  theme: "light" | "dark";
}

export const TweetInput = styled.TextInput<Theme>`
  margin: 0px 15px;
  font-size: 16px;
  color: ${({ theme }) =>
    theme === "light" ? colors.black.string() : colors.white.string()};
`;
