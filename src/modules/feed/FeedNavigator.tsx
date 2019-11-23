import React from "react";
import { useLazyLoadQuery, graphql } from "react-relay/hooks";
import {
  createStackNavigator,
  NavigationScreenComponent
} from "react-navigation";

import { TT_ITEMS_PER_PAGE } from "../../constants";

import Feed from "./Feed";
import NewTweet from "../tweet/NewTweet";
import ChangeThemeButton from "./ChangeThemeButton";

import { FeedNavigatorQuery } from "./__generated__/FeedNavigatorQuery.graphql";

const FeedRoot: NavigationScreenComponent<{}, {}, {}> = () => {
  const tweets = useLazyLoadQuery<FeedNavigatorQuery>(
    graphql`
      query FeedNavigatorQuery($count: Int, $cursor: String) {
        ...Feed_tweets @arguments(count: $count, cursor: $cursor)
      }
    `,
    {
      cursor: null,
      count: TT_ITEMS_PER_PAGE
    }
  );

  return <Feed tweets={tweets} />;
};

FeedRoot.navigationOptions = {
  title: "Home",
  headerRight: <ChangeThemeButton />
};

const FeedNavigator = createStackNavigator(
  {
    Feed: { screen: FeedRoot },
    NewTweet: { screen: NewTweet }
  },
  {
    initialRouteName: "Feed"
  }
);

export default FeedNavigator;
