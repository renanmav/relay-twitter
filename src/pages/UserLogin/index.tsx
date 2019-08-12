import React, { useState, useEffect } from "react";
import {
  StatusBar,
  Keyboard,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import SplashScreen from "react-native-splash-screen";

import UserLoginWithEmailMutation from "./mutation/UserLoginWithEmailMutation";

import { Container, Content, Input, Button, ButtonText, Logo } from "./styles";
import { colors } from "../../styles";
import { UserLoginWithEmailMutationResponse } from "./mutation/__generated__/UserLoginWithEmailMutation.graphql";
import AsyncStorage from "@react-native-community/async-storage";
import { TT_TOKEN } from "../../constants";

import { NavigationScreenProp } from "react-navigation";

interface UserLoginProps {
  navigation: NavigationScreenProp<{}>;
}

export default function UserLogin({ navigation }: UserLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const secondInput = React.createRef<TextInput>();

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
      Alert.alert("Algo deu eraddo no login");

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
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            value={password}
            onChangeText={p => setPassword(p)}
            ref={secondInput}
            onSubmitEditing={handleLogin}
          />
          <Button onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size={18} color={colors.primary.string()} />
            ) : (
              <ButtonText>Entrar</ButtonText>
            )}
          </Button>
          <Button colorfull onPress={() => navigation.navigate("UserRegister")}>
            <ButtonText light>Registre-se</ButtonText>
          </Button>
        </Content>
      </Container>
    </>
  );
}
