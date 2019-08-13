import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity`
  background: ${({ disabled }) =>
    disabled ? colors.primary.fade(0.8).string() : colors.primary.string()};
  border-radius: 15px;
`;

export const Text = styled.Text`
  font-weight: bold;
  color: ${colors.white.string()};
  padding: 5px 10px;
`;
