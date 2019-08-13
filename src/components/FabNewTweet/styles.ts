import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity`
  background: ${colors.primary.string()};
  position: absolute;
  bottom: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 10px;
  height: 54px;
  width: 54px;
  elevation: 10;
`;
