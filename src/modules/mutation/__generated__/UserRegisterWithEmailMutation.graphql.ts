/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UserRegisterWithEmailInput = {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly clientMutationId?: string | null;
};
export type UserRegisterWithEmailMutationVariables = {
    input: UserRegisterWithEmailInput;
};
export type UserRegisterWithEmailMutationResponse = {
    readonly UserRegisterWithEmail: {
        readonly token: string | null;
        readonly error: string | null;
    } | null;
};
export type UserRegisterWithEmailMutation = {
    readonly response: UserRegisterWithEmailMutationResponse;
    readonly variables: UserRegisterWithEmailMutationVariables;
};



/*
mutation UserRegisterWithEmailMutation(
  $input: UserRegisterWithEmailInput!
) {
  UserRegisterWithEmail(input: $input) {
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
    "type": "UserRegisterWithEmailInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "UserRegisterWithEmail",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UserRegisterWithEmailPayload",
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
    "name": "UserRegisterWithEmailMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserRegisterWithEmailMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UserRegisterWithEmailMutation",
    "id": null,
    "text": "mutation UserRegisterWithEmailMutation(\n  $input: UserRegisterWithEmailInput!\n) {\n  UserRegisterWithEmail(input: $input) {\n    token\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '02b8c3d8795c24233aaa97c479620ab7';
export default node;
