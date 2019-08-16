import React, { useState } from "react";
import { Alert } from "react-native";
import { NavigationScreenComponent, withNavigation } from "react-navigation";

import CancelarButton from "../../components/CancelarButton";
import TweetarButton from "../../components/TweetarButton";
import { Container, Buttons, TweetInput } from "./styles";
import { TweetCreateMutationResponse } from "./mutation/__generated__/TweetCreateMutation.graphql";
import TweetCreateMutation from "./mutation/TweetCreateMutation";

const NewTweet: NavigationScreenComponent = ({ navigation }) => {
  const [content, setContent] = useState("");

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
    <Container>
      <Buttons>
        <CancelarButton />
        <TweetarButton disabled={!content.length} onPress={handleCreateTweet} />
      </Buttons>
      <TweetInput
        value={content}
        onChangeText={t => setContent(t)}
        placeholder="O que está acontecendo?"
        autoFocus
        multiline
      />
    </Container>
  );
};

NewTweet.navigationOptions = {
  header: null
};

export default withNavigation(NewTweet);
