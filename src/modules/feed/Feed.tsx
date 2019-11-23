import React, { useEffect, useState } from "react";
import {
  useTheme,
  ThemeColors,
  withNavigation,
  NavigationScreenProps
} from "react-navigation";
import { StatusBar, FlatList } from "react-native";
import SplashScreen from "react-native-splash-screen";
import styled from "styled-components/native";
import { graphql, usePaginationFragment } from "react-relay/hooks";

import FabNewTweet from "./FabNewTweet";
import Tweet from "../tweet/Tweet";

import { TT_ITEMS_PER_PAGE } from "../../constants";

import NewTweetSubscription from "./subscription/NewTweetSubscription";

import { Feed_tweets$key } from "./__generated__/Feed_tweets.graphql";

const Container = styled.View`
  flex: 1;
`;

interface FeedProps extends NavigationScreenProps {
  tweets: Feed_tweets$key;
}

const Feed: React.FC<FeedProps> = props => {
  const { navigation } = props;

  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const themeColors = ThemeColors[theme];

  useEffect(() => {
    SplashScreen.hide();
    NewTweetSubscription();
  }, []);

  const {
    data,
    hasNext,
    isLoadingNext,
    loadNext,
    refetch
  } = usePaginationFragment(
    graphql`
      fragment Feed_tweets on Query
        @refetchable(queryName: "FeedPaginationQuery")
        @argumentDefinitions(
          count: { type: Int, defaultValue: 10 }
          cursor: { type: String }
        ) {
        tweets(first: $count, after: $cursor) @connection(key: "Feed_tweets") {
          edges {
            node {
              id
              ...Tweet_tweet
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    props.tweets
  );

  const tweets = data!.tweets;

  const handleOnEndReached = () => {
    if (!hasNext || isLoadingNext) return;

    loadNext(TT_ITEMS_PER_PAGE);
  };

  const handleOnRefresh = () => {
    if (isLoadingNext) return;

    setRefreshing(true);

    refetch(
      { count: TT_ITEMS_PER_PAGE },
      {
        onComplete: () => setRefreshing(false),
        fetchPolicy: "store-and-network"
      }
    );
  };

  return (
    <>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={themeColors.header}
      />
      <Container>
        <FlatList
          data={tweets!.edges}
          renderItem={({ item }) => <Tweet tweet={item!.node!} />}
          keyExtractor={item => item!.node!.id!}
          onEndReached={handleOnEndReached}
          onRefresh={handleOnRefresh}
          refreshing={refreshing}
        />
        <FabNewTweet onPress={() => navigation.navigate("NewTweet")} />
      </Container>
    </>
  );
};

export default withNavigation(Feed);
