import { commitMutation, graphql } from "react-relay";
import { Environment } from "../../relay";

import {
  UserLoginWithEmailInput,
  UserLoginWithEmailMutationResponse,
  UserLoginWithEmailMutation
} from "./__generated__/UserLoginWithEmailMutation.graphql";

const mutation = graphql`
  mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    UserLoginWithEmail(input: $input) {
      token
      error
    }
  }
`;

function commit(
  input: UserLoginWithEmailInput,
  onCompleted: (response: UserLoginWithEmailMutationResponse) => void,
  onError: (error: Error) => void
) {
  return commitMutation<UserLoginWithEmailMutation>(Environment, {
    mutation,
    variables: {
      input
    },
    onCompleted,
    onError
  });
}

export default { commit };
