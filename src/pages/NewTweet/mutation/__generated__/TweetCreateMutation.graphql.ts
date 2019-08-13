/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TweetCreateInput = {
    readonly content: string;
    readonly clientMutationId?: string | null;
};
export type TweetCreateMutationVariables = {
    readonly input: TweetCreateInput;
};
export type TweetCreateMutationResponse = {
    readonly TweetCreate: {
        readonly content: string | null;
        readonly error: string | null;
    } | null;
};
export type TweetCreateMutation = {
    readonly response: TweetCreateMutationResponse;
    readonly variables: TweetCreateMutationVariables;
};



/*
mutation TweetCreateMutation(
  $input: TweetCreateInput!
) {
  TweetCreate(input: $input) {
    content
    error
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "TweetCreateInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "TweetCreate",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TweetCreatePayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "content",
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
    "name": "TweetCreateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TweetCreateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TweetCreateMutation",
    "id": null,
    "text": "mutation TweetCreateMutation(\n  $input: TweetCreateInput!\n) {\n  TweetCreate(input: $input) {\n    content\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd615bf9eeb63b4ca580cca6daf956db0';
export default node;
