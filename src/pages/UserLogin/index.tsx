import React, { useState, useEffect } from "react";
import { StatusBar, Keyboard, TextInput } from "react-native";
import SplashScreen from "react-native-splash-screen";

import { Container, Content, Input, Button, ButtonText, Logo } from "./styles";
import { colors } from "../../styles";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const secondInput = React.createRef<TextInput>();

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
          />
          <Button>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <Button colorfull>
            <ButtonText light>Registre-se</ButtonText>
          </Button>
        </Content>
      </Container>
    </>
  );
}
