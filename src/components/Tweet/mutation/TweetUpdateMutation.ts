import { graphql, commitMutation } from "react-relay";

import {
  TweetUpdateMutation,
  TweetUpdateInput,
  TweetUpdateMutationResponse
} from "./__generated__/TweetUpdateMutation.graphql";
import { Environment } from "../../../relay";
import { SelectorStoreUpdater } from "relay-runtime";

const mutation = graphql`
  mutation TweetUpdateMutation($input: TweetUpdateInput!) {
    TweetUpdate(input: $input) {
      likes
      retweets
      error
    }
  }
`;

function commit(
  input: TweetUpdateInput,
  optimisticUpdater: SelectorStoreUpdater,
  updater: SelectorStoreUpdater<TweetUpdateMutationResponse>,
  onError: (error: Error) => void
) {
  return commitMutation<TweetUpdateMutation>(Environment, {
    mutation,
    variables: {
      input
    },
    optimisticUpdater,
    updater,
    onError
  });
}

export default { commit };
