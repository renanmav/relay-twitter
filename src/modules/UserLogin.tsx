import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import SplashScreen from "react-native-splash-screen";
import { NavigationScreenProp } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StatusBar,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";

import { colors } from "../styles";
import logo from "../assets/img/logo.png";
import { TT_TOKEN } from "../constants";

import UserLoginWithEmailMutation from "./mutation/UserLoginWithEmailMutation";
import { UserLoginWithEmailMutationResponse } from "./mutation/__generated__/UserLoginWithEmailMutation.graphql";

export const Container = styled.TouchableWithoutFeedback`
  justify-content: flex-end;
  flex: 1;
`;
export const Content = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : undefined
})`
  flex: 1;
  background: ${colors.white.string()};
  justify-content: center;
  align-items: center;
  margin: 0px 40px;
`;
export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: "contain"
})`
  width: 64px;
  height: 64px;
  margin-bottom: 30px;
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
  padding-bottom: 5px;
`;
export const Button = styled.TouchableOpacity<{ colorfull?: boolean }>`
  border-width: 1px;
  border-color: ${colors.primary.string()};
  border-radius: 20px;
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ colorfull }) =>
    colorfull ? colors.primary.string() : colors.white.string()};
  margin-top: 20px;
  height: 42px;
`;
export const ButtonText = styled.Text<{ light?: boolean }>`
  color: ${({ light }) =>
    light ? colors.white.string() : colors.primary.string()};
  font-weight: bold;
`;

interface UserLoginProps {
  navigation: NavigationScreenProp<{}>;
}

const UserLogin: React.FC<UserLoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const secondInput = React.createRef<TextInput>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleLogin = () => {
    setLoading(true);

    const input = {
      email,
      password
    };

    const onCompleted = (response: UserLoginWithEmailMutationResponse) => {
      setLoading(false);
      if (!response.UserLoginWithEmail) return;

      const { error, token } = response.UserLoginWithEmail;

      error && Alert.alert(error);

      token &&
        AsyncStorage.setItem(TT_TOKEN, token) &&
        navigation.navigate("FeedNavigator");
    };

    const onError = () => {
      Alert.alert("Something goes wrong with login");

      setLoading(false);
    };

    UserLoginWithEmailMutation.commit(input, onCompleted, onError);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white.string()}
      />
      <Container onPress={Keyboard.dismiss}>
        <Content>
          <Logo />
          <Input
            keyboardType="email-address"
            placeholder="E-mail"
            returnKeyType="next"
            value={email}
            onChangeText={e => setEmail(e)}
            onSubmitEditing={() => secondInput.current!.focus()}
            autoCapitalize="none"
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            value={password}
            onChangeText={p => setPassword(p)}
            ref={secondInput}
            onSubmitEditing={handleLogin}
            autoCapitalize="none"
          />
          <Button onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size={18} color={colors.primary.string()} />
            ) : (
              <ButtonText>Login</ButtonText>
            )}
          </Button>
          <Button colorfull onPress={() => navigation.navigate("UserRegister")}>
            <ButtonText light>Register</ButtonText>
          </Button>
        </Content>
      </Container>
    </>
  );
};

export default UserLogin;
