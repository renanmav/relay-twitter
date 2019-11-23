import { graphql, commitMutation } from "react-relay";
import {
  TweetCreateInput,
  TweetCreateMutationResponse,
  TweetCreateMutation
} from "./__generated__/TweetCreateMutation.graphql";
import { Environment } from "../../../relay";

const mutation = graphql`
  mutation TweetCreateMutation($input: TweetCreateInput!) {
    TweetCreate(input: $input) {
      content
      error
    }
  }
`;

function commit(
  input: TweetCreateInput,
  onCompleted: (response: TweetCreateMutationResponse) => void,
  onError: (error: Error) => void
) {
  return commitMutation<TweetCreateMutation>(Environment, {
    mutation,
    variables: {
      input
    },
    onCompleted,
    onError
  });
}

export default { commit };
