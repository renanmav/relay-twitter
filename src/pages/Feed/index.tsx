import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";
import { createStackNavigator, NavigationScreenProps } from "react-navigation";
import SplashScreen from "react-native-splash-screen";

import { colors } from "../../styles";
import FabNewTweet from "../../components/FabNewTweet";
import { Container } from "./styles";
import NewTweet from "../NewTweet";
import Tweet from "../../components/Tweet";

import {
  graphql,
  createPaginationContainer,
  RelayPaginationProp
} from "react-relay";
import { createQueryRendererModern } from "../../relay";
import { Feed_query } from "./__generated__/Feed_query.graphql";
import { TT_ITEMS_PER_PAGE } from "../../constants";
import NewTweetSubscription from "./subscription/NewTweetSubscription";

interface RelayProps {
  query: Feed_query;
  relay: RelayPaginationProp;
}

type FeedProps = RelayProps & NavigationScreenProps;

const Feed = ({ navigation, query, relay }: FeedProps) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    NewTweetSubscription();
  }, []);

  const { tweets } = query;

  const handleOnEndReached = () => {
    if (!relay.hasMore() || relay.isLoading()) return;

    relay.loadMore(TT_ITEMS_PER_PAGE);
  };

  const handleOnRefresh = () => {
    if (relay.isLoading()) return;

    setRefreshing(true);

    relay.refetchConnection(tweets!.edges.length, () => setRefreshing(false));
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white.string()}
      />
      <Container>
        <FlatList
          data={tweets!.edges!}
          renderItem={({ item }) => <Tweet data={item!.node!} />}
          keyExtractor={item => item!.node!._id!}
          onEndReached={handleOnEndReached}
          onRefresh={handleOnRefresh}
          refreshing={refreshing}
        />
        <FabNewTweet onPress={() => navigation.navigate("NewTweet")} />
      </Container>
    </>
  );
};

Feed.navigationOptions = {
  title: "Início"
};

const FeedPaginationContainer = createPaginationContainer(
  Feed,
  {
    query: graphql`
      fragment Feed_query on Query {
        tweets(first: $count, after: $cursor) @connection(key: "Feed_tweets") {
          edges {
            node {
              id
              _id
              content
              likes
              retweets
              author {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `
  },
  {
    direction: "forward",
    query: graphql`
      query FeedPaginationQuery($count: Int!, $cursor: String) {
        ...Feed_query
      }
    `,
    getConnectionFromProps: props => props.query && props.query.tweets,
    getVariables: (_, { count, cursor }, __) => ({ count, cursor })
  }
);

const FeedFragment = createQueryRendererModern(FeedPaginationContainer, Feed, {
  query: graphql`
    query FeedQuery($count: Int!, $cursor: String) {
      ...Feed_query
    }
  `,
  variables: { cursor: null, count: TT_ITEMS_PER_PAGE }
});

const FeedNavigator = createStackNavigator(
  {
    Feed: { screen: FeedFragment },
    NewTweet: { screen: NewTweet }
  },
  {
    initialRouteName: "Feed"
  }
);

export default FeedNavigator;
