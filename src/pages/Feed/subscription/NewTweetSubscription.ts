import { graphql, requestSubscription } from "react-relay";
import { Environment } from "../../../relay";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { NewTweetSubscriptionResponse } from "./__generated__/NewTweetSubscription.graphql";

const newTweetSubscription = graphql`
  subscription NewTweetSubscription {
    NewTweet {
      tweetEdge {
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
    }
  }
`;

export default () => {
  const subscriptionConfig: GraphQLSubscriptionConfig<
    NewTweetSubscriptionResponse
  > = {
    subscription: newTweetSubscription,
    variables: {},
    onNext: response => {
      if (!response) return;

      const { NewTweet } = response;
      console.log(NewTweet);
    },
    onError: error => console.log(error),
    // @ts-ignore
    updater: (store, data: NewTweetSubscriptionResponse) => {
      const root = store.getRoot();
      console.log(root);
    }
  };

  // @ts-ignore
  requestSubscription(Environment, subscriptionConfig);
};
