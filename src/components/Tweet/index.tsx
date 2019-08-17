import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { Alert } from "react-native";
import { SelectorStoreUpdater } from "relay-runtime";

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
import {
  TweetUpdateInput,
  TweetUpdateMutationResponse
} from "./mutation/__generated__/TweetUpdateMutation.graphql";
import TweetUpdateMutation from "./mutation/TweetUpdateMutation";

interface TweetProps {
  data: {
    readonly id: string;
    readonly _id: string | null;
    readonly content: string | null;
    readonly likes: number | null;
    readonly retweets: number | null;
    readonly author: {
      readonly name: string | null;
    } | null;
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
      id: data._id!,
      like,
      retweet
    };

    const optimisticUpdater: SelectorStoreUpdater = store => {
      const tweet = store.get(data.id);
      const likes = tweet!.getValue("likes");
      const newLikes = (likes as number) + 1;
      tweet!.setValue(newLikes, "likes");
    };

    const updater: SelectorStoreUpdater<TweetUpdateMutationResponse> = (
      store,
      _optimisticUpdate
    ) => {
      const tweetUpdateField = store!.getRootField("TweetUpdate");
      const likes = tweetUpdateField!.getValue("likes");
      const tweet = store.get(data.id);
      tweet!.setValue(likes, "likes");
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
        <AuthorName>{data.author!.name}</AuthorName>
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
