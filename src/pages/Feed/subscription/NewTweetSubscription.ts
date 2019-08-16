import { graphql, requestSubscription } from "react-relay";
import { Environment } from "../../../relay";
import { GraphQLSubscriptionConfig, ConnectionHandler } from "relay-runtime";
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
    onError: error => console.log(error),
    // @ts-ignore
    updater: store => {
      const payload = store.getRootField("NewTweet");
      const edge = payload!.getLinkedRecord("tweetEdge");
      const tweet = edge!.getLinkedRecord("node");

      const root = store.getRoot();

      const tweetsConnection = ConnectionHandler.getConnection(
        root,
        "Feed_tweets"
      );
      const tweetEdge = ConnectionHandler.createEdge(
        store,
        tweetsConnection!,
        tweet!,
        "TweetsEdge"
      );
      ConnectionHandler.insertEdgeBefore(tweetsConnection!, tweetEdge!);
    }
  };

  // @ts-ignore
  requestSubscription(Environment, subscriptionConfig);
};
