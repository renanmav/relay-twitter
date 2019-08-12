import { RequestParameters, Variables, UploadableMap } from "relay-runtime";
import { getRequestBody, getHeaders, handleData, isMutation } from "./helpers";
import fetchWithRetries from "./fetchWithRetries";
import AsyncStorage from "@react-native-community/async-storage";

export const GRAPHQL_URL = "http://localhost:5000/graphql";

const fetchQuery = async (
  request: RequestParameters,
  variables: Variables,
  uploadables: UploadableMap
) => {
  try {
    const body = getRequestBody(request, variables, uploadables);
    const headers = {
      ...getHeaders(uploadables)
    };

    const response = await fetchWithRetries(GRAPHQL_URL, {
      method: "POST",
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000]
    });

    const data = await handleData(response);

    if (response.status === 401) {
      await AsyncStorage.clear();
      throw data.errors;
    }

    if (isMutation(request) && data.errors) {
      throw data;
    }

    if (!data.data) {
      await AsyncStorage.clear();
      throw data.errors;
    }

    return data;
  } catch (err) {
    console.log("err: ", err);

    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (
      timeoutRegexp.test(err.message) ||
      serverUnavailableRegexp.test(err.message)
    ) {
      throw new Error("Serviço indisponível. Tente novamente mais tarde.");
    }

    throw err;
  }
};

export default fetchQuery;
