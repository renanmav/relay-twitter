/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type NewTweetSubscriptionVariables = {};
export type NewTweetSubscriptionResponse = {
    readonly NewTweet: {
        readonly tweetEdge: {
            readonly node: {
                readonly id: string;
                readonly _id: string | null;
                readonly content: string | null;
                readonly likes: number | null;
                readonly retweets: number | null;
                readonly author: {
                    readonly name: string | null;
                } | null;
            };
        } | null;
    } | null;
};
export type NewTweetSubscription = {
    readonly response: NewTweetSubscriptionResponse;
    readonly variables: NewTweetSubscriptionVariables;
};



/*
subscription NewTweetSubscription {
  NewTweet {
    tweetEdge {
      node {
        id
        _id
        content
        likes
        retweets
        author {
          name
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "content",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "likes",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "retweets",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NewTweetSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "NewTweet",
        "storageKey": null,
        "args": null,
        "concreteType": "NewTweetPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "tweetEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "TweetEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Tweet",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "author",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NewTweetSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "NewTweet",
        "storageKey": null,
        "args": null,
        "concreteType": "NewTweetPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "tweetEdge",
            "storageKey": null,
            "args": null,
            "concreteType": "TweetEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Tweet",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "author",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v0/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "subscription",
    "name": "NewTweetSubscription",
    "id": null,
    "text": "subscription NewTweetSubscription {\n  NewTweet {\n    tweetEdge {\n      node {\n        id\n        _id\n        content\n        likes\n        retweets\n        author {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '908b6f865ee89a1e636f7ce1cae74ed4';
export default node;
