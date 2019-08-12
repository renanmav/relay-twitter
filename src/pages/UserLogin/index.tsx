import React, { useState } from "react";
import { StatusBar, Keyboard } from "react-native";

import { Container, Content, Input, Button, ButtonText, Logo } from "./styles";
import { colors } from "../../styles";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            value={password}
            onChangeText={p => setPassword(p)}
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
