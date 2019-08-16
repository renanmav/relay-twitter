import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  margin-top: ${getStatusBarHeight()}px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

export const TweetInput = styled.TextInput`
  margin: 0px 15px;
  font-size: 16px;
`;
