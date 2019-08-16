import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";

import {
  Container,
  Wrapper,
  AuthorName,
  Content,
  FeedbackWrapper,
  Feedback,
  NumberOfFeedbacks,
  ProfilePic
} from "./styles";
import { TweetUpdateInput } from "./mutation/__generated__/TweetUpdateMutation.graphql";
import { Alert } from "react-native";
import TweetUpdateMutation from "./mutation/TweetUpdateMutation";
import { SelectorStoreUpdater } from "relay-runtime";

interface TweetProps {
  data: {
    id: string;
    _id: string;
    content: string;
    likes: number;
    retweets: number;
    author: {
      name: string;
    };
  };
}

export default function Tweet({ data }: TweetProps) {
  const handleTweetUpdate = (
    { like, retweet }: { like?: boolean; retweet?: boolean } = {
      like: false,
      retweet: false
    }
  ) => {
    const input: TweetUpdateInput = {
      id: data._id,
      like,
      retweet
    };

    const optimisticUpdater: SelectorStoreUpdater = () => {};

    const updater: SelectorStoreUpdater = store => {
      const root = store.getRoot();
      console.log(root);
    };

    const onError = () => {
      Alert.alert("Algo deu errado ao salvar o like");
    };

    TweetUpdateMutation.commit(input, optimisticUpdater, updater, onError);
  };

  return (
    <Container>
      <ProfilePic />
      <Wrapper>
        <AuthorName>{data.author.name}</AuthorName>
        <Content>{data.content}</Content>
        <FeedbackWrapper>
          <Feedback>
            <Icon name="comment" size={22} />
          </Feedback>
          <Feedback onPress={() => handleTweetUpdate({ like: true })}>
            <Icon name="heart" size={22} />
            <NumberOfFeedbacks>{data.likes}</NumberOfFeedbacks>
          </Feedback>
          <Feedback onPress={() => handleTweetUpdate({ retweet: true })}>
            <Icon name="retweet" size={22} />
            <NumberOfFeedbacks>{data.retweets}</NumberOfFeedbacks>
          </Feedback>
          <Feedback>
            <Icon name="share-apple" size={22} />
          </Feedback>
        </FeedbackWrapper>
      </Wrapper>
    </Container>
  );
}
