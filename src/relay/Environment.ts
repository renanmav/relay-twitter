import { Environment, Network, RecordSource, Store } from "relay-runtime";

// TODO - Add types to @ts-ignore flaged packages
// @ts-ignore
import RelayNetworkLogger from "relay-runtime/lib/RelayNetworkLogger";
// @ts-ignore
import { installRelayDevTools } from "relay-devtools";

import cacheHandler from "./cacheHandler";

if (__DEV__) {
  installRelayDevTools();
}

const network = Network.create(
  __DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler
);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store
});

export default env;
