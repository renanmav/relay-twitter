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

interface TweetProps {
  data: any;
}

export default function Tweet({ data }: TweetProps) {
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
          <Feedback>
            <Icon name="heart" size={22} />
            <NumberOfFeedbacks>{data.likes}</NumberOfFeedbacks>
          </Feedback>
          <Feedback>
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
