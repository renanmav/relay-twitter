import React, { useState } from "react";
import {
  NavigationScreenComponent,
  useTheme,
  ThemeColors
} from "react-navigation";
import styled from "styled-components/native";
import { StatusBar, Alert } from "react-native";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

import { colors } from "../../styles";

import CancelButton from "./CancelButton";
import TweetButton from "./TweetButton";

import TweetCreateMutation from "./mutation/TweetCreateMutation";

import { TweetCreateMutationResponse } from "./mutation/__generated__/TweetCreateMutation.graphql";

const Container = styled.View`
  margin-top: ${ifIphoneX(getStatusBarHeight(), 0) + 20}px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

interface Theme {
  theme: "light" | "dark";
}

const TweetInput = styled.TextInput<Theme>`
  margin: 0px 15px;
  font-size: 16px;
  color: ${({ theme }) =>
    theme === "light" ? colors.black.string() : colors.white.string()};
`;

const NewTweet: NavigationScreenComponent = ({ navigation }) => {
  const [content, setContent] = useState("");

  const theme = useTheme();
  const colorsTheme = ThemeColors[theme];

  const handleCreateTweet = () => {
    const input = {
      content
    };

    const onCompleted = (response: TweetCreateMutationResponse) => {
      if (!response.TweetCreate) return;

      const { content: success, error } = response.TweetCreate;

      error && Alert.alert(error);

      success && navigation.goBack();
    };

    const onError = () => {
      Alert.alert("Something goes wrong when creating tweet");
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
          <CancelButton />
          <TweetButton disabled={!content.length} onPress={handleCreateTweet} />
        </Buttons>
        <TweetInput
          value={content}
          onChangeText={t => setContent(t)}
          placeholder="What's up?"
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

export default NewTweet;
