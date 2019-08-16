import React, { useState } from "react";
import {
  StatusBar,
  Keyboard,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationScreenProp } from "react-navigation";

import UserRegisterWithEmailMutation from "./mutation/UserRegisterWithEmailMutation";
import { UserRegisterWithEmailMutationResponse } from "./mutation/__generated__/UserRegisterWithEmailMutation.graphql";

import {
  Container,
  Content,
  Input,
  Button,
  ButtonText,
  Logo
} from "../UserLogin/styles";
import { colors } from "../../styles";
import { TT_TOKEN } from "../../constants";

interface UserRegisterProps {
  navigation: NavigationScreenProp<{}>;
}

export default function UserRegister({ navigation }: UserRegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const secondInput = React.createRef<TextInput>();
  const thirdInput = React.createRef<TextInput>();

  const handleRegister = () => {
    setLoading(true);

    const input = {
      name,
      email,
      password
    };

    const onCompleted = (response: UserRegisterWithEmailMutationResponse) => {
      setLoading(false);
      if (!response.UserRegisterWithEmail) return;

      const { error, token } = response.UserRegisterWithEmail;

      error && Alert.alert(error);

      token &&
        AsyncStorage.setItem(TT_TOKEN, token) &&
        navigation.navigate("FeedNavigator");
    };

    const onError = () => {
      Alert.alert("Algo deu errado no login");

      setLoading(false);
    };

    UserRegisterWithEmailMutation.commit(input, onCompleted, onError);
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
            placeholder="Nome"
            returnKeyType="next"
            value={name}
            onChangeText={n => setName(n)}
            onSubmitEditing={() => secondInput.current!.focus()}
            autoCapitalize="words"
          />
          <Input
            keyboardType="email-address"
            placeholder="E-mail"
            returnKeyType="next"
            value={email}
            onChangeText={e => setEmail(e)}
            ref={secondInput}
            onSubmitEditing={() => thirdInput.current!.focus()}
            autoCapitalize="none"
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            value={password}
            onChangeText={p => setPassword(p)}
            ref={thirdInput}
            onSubmitEditing={handleRegister}
            autoCapitalize="none"
          />
          <Button onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator size={18} color={colors.primary.string()} />
            ) : (
              <ButtonText>Registrar-se</ButtonText>
            )}
          </Button>
          <Button colorfull onPress={() => navigation.navigate("UserLogin")}>
            <ButtonText light>Voltar ao login</ButtonText>
          </Button>
        </Content>
      </Container>
    </>
  );
}
