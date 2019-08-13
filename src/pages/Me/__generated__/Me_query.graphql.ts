/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Me_query$ref = any;
export type Me_query = {
    readonly me: {
        readonly _id: string | null;
        readonly name: string | null;
        readonly email: string | null;
        readonly active: boolean | null;
    } | null;
    readonly " $refType": Me_query$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Me_query",
  "type": "Query",
  "metadata": null,
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
        }
      ]
    }
  ]
};
(node as any).hash = '4c94f02124e05ddd2582bba24bac0e43';
export default node;
