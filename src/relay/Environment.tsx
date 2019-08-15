import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  CacheConfig,
  RequestParameters,
  LegacyObserver
} from "relay-runtime";

import { SubscriptionClient } from "subscriptions-transport-ws";

// TODO - Add types to @ts-ignore flaged packages
// @ts-ignore
import RelayNetworkLogger from "relay-runtime/lib/RelayNetworkLogger";
// @ts-ignore
import { installRelayDevTools } from "relay-devtools";

import cacheHandler from "./cacheHandler";
import {
  GRAPHQL_SUBSCRIPTION_ANDROID_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_IOS_ENDPOINT
} from "../constants";
import { Platform } from "react-native";

if (__DEV__) {
  installRelayDevTools();
}

const setupSubscription = (
  request: RequestParameters,
  variables: Variables,
  __: CacheConfig,
  observer?: LegacyObserver<any>
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
      .request({ query, variables })
      // @ts-ignore
      .subscribe(({ data }) => observer.onNext({ data }))
  );
};

const network = Network.create(
  __DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler,
  setupSubscription
);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store
});

export default env;
