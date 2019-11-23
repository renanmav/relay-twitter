/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UserLoginWithEmailInput = {
    readonly email: string;
    readonly password: string;
    readonly clientMutationId?: string | null;
};
export type UserLoginWithEmailMutationVariables = {
    input: UserLoginWithEmailInput;
};
export type UserLoginWithEmailMutationResponse = {
    readonly UserLoginWithEmail: {
        readonly token: string | null;
        readonly error: string | null;
    } | null;
};
export type UserLoginWithEmailMutation = {
    readonly response: UserLoginWithEmailMutationResponse;
    readonly variables: UserLoginWithEmailMutationVariables;
};



/*
mutation UserLoginWithEmailMutation(
  $input: UserLoginWithEmailInput!
) {
  UserLoginWithEmail(input: $input) {
    token
    error
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UserLoginWithEmailInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "UserLoginWithEmail",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UserLoginWithEmailPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "error",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserLoginWithEmailMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserLoginWithEmailMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UserLoginWithEmailMutation",
    "id": null,
    "text": "mutation UserLoginWithEmailMutation(\n  $input: UserLoginWithEmailInput!\n) {\n  UserLoginWithEmail(input: $input) {\n    token\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '53fa8bbe8d39c4923351899a0e47fae8';
export default node;
