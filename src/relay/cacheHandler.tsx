import {
  RequestParameters,
  Variables,
  CacheConfig,
  UploadableMap
} from "relay-runtime";
import { isMutation } from "./helpers";
import fetchQuery from "./fetchQuery";

const cacheHandler = async (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: UploadableMap
) => {
  if (isMutation(request)) {
    return fetchQuery(request, variables, uploadables);
  }

  const fromServer = await fetchQuery(request, variables, uploadables);

  return fromServer;
};

export default cacheHandler;
