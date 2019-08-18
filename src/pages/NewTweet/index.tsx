import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import {
  NavigationScreenComponent,
  withNavigation,
  useTheme,
  ThemeColors
} from "react-navigation";

import CancelarButton from "../../components/CancelarButton";
import TweetarButton from "../../components/TweetarButton";
import { Container, Buttons, TweetInput } from "./styles";
import { TweetCreateMutationResponse } from "./mutation/__generated__/TweetCreateMutation.graphql";
import TweetCreateMutation from "./mutation/TweetCreateMutation";
import { colors } from "../../styles";

const NewTweet: NavigationScreenComponent = ({ navigation }) => {
  const [content, setContent] = useState("");

  const theme = useTheme();
  const colorsTheme = ThemeColors[theme];

  const handleCreateTweet = () => {
    const input = {
      content
    };

    // TODO: implement optimistic to update the Relay store
    const onCompleted = (response: TweetCreateMutationResponse) => {
      if (!response.TweetCreate) return;

      const { content: success, error } = response.TweetCreate;

      error && Alert.alert(error);

      success && navigation.goBack();
    };

    const onError = () => {
      Alert.alert("Algo deu errado ao criar o tweet");
    };

    TweetCreateMutation.commit(input, onCompleted, onError);
  };

  return (
    <>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={colorsTheme.body}
      />
      <Container>
        <Buttons>
          <CancelarButton />
          <TweetarButton
            disabled={!content.length}
            onPress={handleCreateTweet}
          />
        </Buttons>
        <TweetInput
          value={content}
          onChangeText={t => setContent(t)}
          placeholder="O que está acontecendo?"
          placeholderTextColor={colors.regular.string()}
          theme={theme}
          autoFocus
          multiline
        />
      </Container>
    </>
  );
};

NewTweet.navigationOptions = {
  header: null
};

export default withNavigation(NewTweet);
