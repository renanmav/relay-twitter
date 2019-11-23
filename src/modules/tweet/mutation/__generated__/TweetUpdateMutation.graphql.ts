/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TweetUpdateInput = {
    readonly id: string;
    readonly like?: boolean | null;
    readonly retweet?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type TweetUpdateMutationVariables = {
    input: TweetUpdateInput;
};
export type TweetUpdateMutationResponse = {
    readonly TweetUpdate: {
        readonly likes: number | null;
        readonly retweets: number | null;
        readonly error: string | null;
    } | null;
};
export type TweetUpdateMutation = {
    readonly response: TweetUpdateMutationResponse;
    readonly variables: TweetUpdateMutationVariables;
};



/*
mutation TweetUpdateMutation(
  $input: TweetUpdateInput!
) {
  TweetUpdate(input: $input) {
    likes
    retweets
    error
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "TweetUpdateInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "TweetUpdate",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TweetUpdatePayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "likes",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "retweets",
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
    "name": "TweetUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TweetUpdateMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "TweetUpdateMutation",
    "id": null,
    "text": "mutation TweetUpdateMutation(\n  $input: TweetUpdateInput!\n) {\n  TweetUpdate(input: $input) {\n    likes\n    retweets\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '2d7e5a088f6c34a9a11e328fd649dfc3';
export default node;
