import { RequestParameters, Variables, UploadableMap } from "relay-runtime";
import { getRequestBody, getHeaders, handleData, isMutation } from "./helpers";
import AsyncStorage from "@react-native-community/async-storage";
import { Platform } from "react-native";

import fetchWithRetries from "./fetchWithRetries";
import { TT_TOKEN } from "../constants";

export const GRAPHQL_URL = Platform.select({
  android: "http://10.0.3.2:5000/graphql",
  ios: "http://localhost:5000/graphql"
});

const fetchQuery = async (
  request: RequestParameters,
  variables: Variables,
  uploadables: UploadableMap
) => {
  try {
    const token = await AsyncStorage.getItem(TT_TOKEN);

    const body = getRequestBody(request, variables, uploadables);
    const headers = {
      ...getHeaders(uploadables),
      Authorization: token
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
