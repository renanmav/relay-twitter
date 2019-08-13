import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../styles";
// @ts-ignore
import profilePlaceholder from "../../assets/img/ProfilePlaceholder.jpg";

export const Container = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-bottom-color: ${colors.light.string()};
  flex-direction: row;
`;

export const ProfilePic = styled.Image.attrs({
  source: profilePlaceholder
})`
  height: 42px;
  width: 42px;
  border-radius: 50px;
  margin-left: 15px;
  margin-top: 15px;
`;

export const Wrapper = styled.View`
  margin: 15px;
  flex: 1;
`;

export const AuthorName = styled.Text`
  font-weight: bold;
  color: ${colors.black.string()};
`;

export const Content = styled.Text`
  color: ${colors.black.string()};
`;

export const FeedbackWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`;

export const Feedback = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const NumberOfFeedbacks = styled.Text`
  color: ${colors.regular.string()};
`;
