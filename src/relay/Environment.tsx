import {
  Environment,
  Network,
  RecordSource,
  Store,
  commitLocalUpdate,
  SubscribeFunction
} from "relay-runtime";

import { SubscriptionClient } from "subscriptions-transport-ws";

// @ts-ignore
import { installRelayDevTools } from "relay-devtools";

import {
  GRAPHQL_SUBSCRIPTION_ANDROID_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_IOS_ENDPOINT
} from "../constants";
import { Platform } from "react-native";
import fetchQuery from "./fetchQuery";

if (__DEV__) {
  installRelayDevTools();
}

const setupSubscription: SubscribeFunction = (
  request,
  variables,
  __,
  observer
) => {
  const query = request.text;

  const subscriptionClient = new SubscriptionClient(
    Platform.select({
      android: GRAPHQL_SUBSCRIPTION_ANDROID_ENDPOINT,
      ios: GRAPHQL_SUBSCRIPTION_IOS_ENDPOINT
    }),
    { reconnect: true }
  );

  if (!observer) return;

  return (
    subscriptionClient
      .request({ query: query!, variables })
      // @ts-ignore
      .subscribe(({ data }) => observer.onNext({ data }))
  );
};

const network = Network.create(fetchQuery, setupSubscription);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store
});

commitLocalUpdate(env, proxyStore => {
  const fieldKey = "settings";
  const __typename = "Settings";

  const dataID = `client:${__typename}`;
  const record = proxyStore.create(dataID, __typename);

  record.setValue("light", "theme");

  // avoid garbage collection
  env.retain({
    dataID,
    variables: {},
    // @ts-ignore
    node: { selections: [] }
  });

  const root = proxyStore.getRoot();
  root.setLinkedRecord(record, fieldKey);
});

export default env;
