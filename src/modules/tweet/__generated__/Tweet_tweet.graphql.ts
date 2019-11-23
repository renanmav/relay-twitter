/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Tweet_tweet = {
    readonly id: string;
    readonly _id: string | null;
    readonly content: string | null;
    readonly likes: number | null;
    readonly retweets: number | null;
    readonly author: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "Tweet_tweet";
};
export type Tweet_tweet$data = Tweet_tweet;
export type Tweet_tweet$key = {
    readonly " $data"?: Tweet_tweet$data;
    readonly " $fragmentRefs": FragmentRefs<"Tweet_tweet">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Tweet_tweet",
  "type": "Tweet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
      "name": "content",
      "args": null,
      "storageKey": null
    },
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
      "kind": "LinkedField",
      "alias": null,
      "name": "author",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'fe6130ed3d2c562db70366df2c2cbcab';
export default node;
