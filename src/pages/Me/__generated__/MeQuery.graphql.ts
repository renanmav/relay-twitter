/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Me_query$ref = any;
export type MeQueryVariables = {};
export type MeQueryResponse = {
    readonly " $fragmentRefs": Me_query$ref;
};
export type MeQuery = {
    readonly response: MeQueryResponse;
    readonly variables: MeQueryVariables;
};



/*
query MeQuery {
  ...Me_query
}

fragment Me_query on Query {
  me {
    _id
    name
    email
    active
    id
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Me_query",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MeQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "active",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MeQuery",
    "id": null,
    "text": "query MeQuery {\n  ...Me_query\n}\n\nfragment Me_query on Query {\n  me {\n    _id\n    name\n    email\n    active\n    id\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'f0c29de261017f5e597ee492be8e3653';
export default node;
