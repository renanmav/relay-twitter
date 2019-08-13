import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity``;

export const Text = styled.Text`
  color: ${colors.primary.fade(0.4).string()};
`;
