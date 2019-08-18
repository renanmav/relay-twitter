import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity`
  background: ${({ disabled }) =>
    disabled ? colors.primary.fade(0.8).string() : colors.primary.string()};
  border-radius: 15px;
`;

interface TextProps {
  active: boolean;
}

export const Text = styled.Text<TextProps>`
  font-weight: bold;
  color: ${({ active }) =>
    active ? colors.white.string() : colors.white.fade(0.8).string()};
  padding: 5px 10px;
`;
