/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeedPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
};
export type FeedPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Feed_tweets">;
};
export type FeedPaginationQuery = {
    readonly response: FeedPaginationQueryResponse;
    readonly variables: FeedPaginationQueryVariables;
};



/*
query FeedPaginationQuery(
  $count: Int = 10
  $cursor: String
) {
  ...Feed_tweets_1G22uz
}

fragment Feed_tweets_1G22uz on Query {
  tweets(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...Tweet_tweet
        __typename
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

fragment Tweet_tweet on Tweet {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int",
    "defaultValue": 10
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeedPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Feed_tweets",
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeedPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tweets",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "TweetConnection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edges",
            "storageKey": null,
            "args": null,
            "concreteType": "TweetEdge",
            "plural": true,
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
                  (v2/*: any*/),
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
                      },
                      (v2/*: any*/)
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pageInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "PageInfoExtended",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasNextPage",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "endCursor",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "tweets",
        "args": (v1/*: any*/),
        "handle": "connection",
        "key": "Feed_tweets",
        "filters": null
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FeedPaginationQuery",
    "id": null,
    "text": "query FeedPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n) {\n  ...Feed_tweets_1G22uz\n}\n\nfragment Feed_tweets_1G22uz on Query {\n  tweets(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        ...Tweet_tweet\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment Tweet_tweet on Tweet {\n  id\n  _id\n  content\n  likes\n  retweets\n  author {\n    name\n    id\n  }\n}\n",
    "metadata": {
      "derivedFrom": "Feed_tweets",
      "isRefetchableQuery": true
    }
  }
};
})();
(node as any).hash = '301b398a1a698c740b2db20d013742b5';
export default node;
