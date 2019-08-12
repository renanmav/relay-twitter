// @ts-ignore
import RelayQueryResponseCache from "relay-runtime/lib/RelayQueryResponseCache";

import {
  RequestParameters,
  Variables,
  CacheConfig,
  UploadableMap
} from "relay-runtime";
import { isMutation, isQuery, forceFetch } from "./helpers";
import fetchQuery from "./fetchQuery";

const oneMinute = 60 * 1000;
const relayResponseCache = new RelayQueryResponseCache({
  size: 250,
  ttl: oneMinute
});

const cacheHandler = async (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: UploadableMap
) => {
  const queryID = request.text;

  if (isMutation(request)) {
    relayResponseCache.clear();
    return fetchQuery(request, variables, uploadables);
  }

  const fromCache = relayResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables, uploadables);
  if (fromServer) {
    relayResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
