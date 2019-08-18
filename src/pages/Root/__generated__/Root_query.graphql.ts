/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Root_query$ref = any;
export type Root_query = {
    readonly settings: {
        readonly theme: string;
    };
    readonly " $refType": Root_query$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Root_query",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "settings",
          "storageKey": null,
          "args": null,
          "concreteType": "Settings",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "theme",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'adc98cefea2f3a7f7e493e05bd33661d';
export default node;
