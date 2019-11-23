import { commitMutation, graphql } from "react-relay";
import { Environment } from "../../../relay";

import {
  UserRegisterWithEmailInput,
  UserRegisterWithEmailMutationResponse,
  UserRegisterWithEmailMutation
} from "./__generated__/UserRegisterWithEmailMutation.graphql";

const mutation = graphql`
  mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
    UserRegisterWithEmail(input: $input) {
      token
      error
    }
  }
`;

function commit(
  input: UserRegisterWithEmailInput,
  onCompleted: (response: UserRegisterWithEmailMutationResponse) => void,
  onError: (error: Error) => void
) {
  return commitMutation<UserRegisterWithEmailMutation>(Environment, {
    mutation,
    variables: {
      input
    },
    onCompleted,
    onError
  });
}

export default { commit };
