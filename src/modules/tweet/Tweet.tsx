import React from "react";
import { useFragment, graphql } from "react-relay/hooks";
import styled from "styled-components/native";
import { StyleSheet, Alert } from "react-native";
import { useTheme } from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import { SelectorStoreUpdater } from "relay-runtime";

import { colors } from "../../styles";
import profilePlaceholder from "../../assets/img/ProfilePlaceholder.jpg";

import TweetUpdateMutation from "./mutation/TweetUpdateMutation";

import { Tweet_tweet$key } from "./__generated__/Tweet_tweet.graphql";
import {
  TweetUpdateInput,
  TweetUpdateMutationResponse
} from "./mutation/__generated__/TweetUpdateMutation.graphql";

const Container = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-bottom-color: ${colors.light.string()};
  flex-direction: row;
`;

const ProfilePic = styled.Image.attrs({
  source: profilePlaceholder
})`
  height: 42px;
  width: 42px;
  border-radius: 50px;
  margin-left: 15px;
  margin-top: 15px;
`;

const Wrapper = styled.View`
  margin: 15px;
  flex: 1;
`;

interface Theme {
  color: "light" | "dark";
}

const AuthorName = styled.Text<Theme>`
  font-weight: bold;
  color: ${({ color }) =>
    color === "light" ? colors.black.string() : colors.white.string()};
`;

const Content = styled.Text<Theme>`
  color: ${({ color }) =>
    color === "light" ? colors.black.string() : colors.white.string()};
`;

const FeedbackWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
`;

const Feedback = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const NumberOfFeedbacks = styled.Text`
  color: ${colors.regular.string()};
`;

interface TweetProps {
  tweet: Tweet_tweet$key;
}

const Tweet: React.FC<TweetProps> = props => {
  const theme = useTheme();

  const tweet = useFragment(
    graphql`
      fragment Tweet_tweet on Tweet {
        id
        _id
        content
        likes
        retweets
        author {
          name
        }
      }
    `,
    props.tweet
  );

  const handleTweetUpdate = (
    { like, retweet }: { like?: boolean; retweet?: boolean } = {
      like: false,
      retweet: false
    }
  ) => {
    const input: TweetUpdateInput = {
      id: tweet._id!,
      like,
      retweet
    };

    const feedback = like ? "likes" : "retweets";

    const optimisticUpdater: SelectorStoreUpdater = store => {
      const t = store.get(tweet.id);

      const likeOrRt = t!.getValue(feedback);
      const newLikesOrRts = (likeOrRt as number) + 1;
      t!.setValue(newLikesOrRts, feedback);
    };

    const updater: SelectorStoreUpdater<TweetUpdateMutationResponse> = (
      store,
      _optimisticUpdate
    ) => {
      const tweetUpdateField = store!.getRootField("TweetUpdate");

      const likesOrRts = tweetUpdateField!.getValue(feedback);
      const t = store.get(tweet.id);
      t!.setValue(likesOrRts, feedback);
    };

    const onError = () => {
      Alert.alert(`Something goes wrong when saving ${feedback}`);
    };

    TweetUpdateMutation.commit(input, optimisticUpdater, updater, onError);
  };

  return (
    <Container>
      <ProfilePic />
      <Wrapper>
        <AuthorName color={theme}>{tweet.author!.name}</AuthorName>
        <Content color={theme}>{tweet.content}</Content>
        <FeedbackWrapper>
          <Feedback>
            <Icon name="comment" size={22} color={colors.regular.string()} />
          </Feedback>
          <Feedback onPress={() => handleTweetUpdate({ like: true })}>
            <Icon name="heart" size={22} color={colors.regular.string()} />
            <NumberOfFeedbacks>{tweet.likes}</NumberOfFeedbacks>
          </Feedback>
          <Feedback onPress={() => handleTweetUpdate({ retweet: true })}>
            <Icon name="retweet" size={22} color={colors.regular.string()} />
            <NumberOfFeedbacks>{tweet.retweets}</NumberOfFeedbacks>
          </Feedback>
          <Feedback>
            <Icon
              name="share-apple"
              size={22}
              color={colors.regular.string()}
            />
          </Feedback>
        </FeedbackWrapper>
      </Wrapper>
    </Container>
  );
};

export default Tweet;
