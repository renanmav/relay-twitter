import {
  RequestParameters,
  Variables,
  UploadableMap,
  CacheConfig
} from "relay-runtime";

export const isMutation = (request: RequestParameters) =>
  request.operationKind === "mutation";
export const isQuery = (request: RequestParameters) =>
  request.operationKind === "query";
export const forceFetch = (cacheConfig: CacheConfig) =>
  !!(cacheConfig && cacheConfig.force);

function getRequestBodyWithUploadables(
  request: RequestParameters,
  variables: Variables,
  uploadables: UploadableMap
) {
  const formData = new FormData();
  formData.append("name", request.name);
  // @ts-ignore
  formData.append("query", request.text);
  formData.append("variables", JSON.stringify(variables));

  Object.keys(uploadables).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });

  return formData;
}

function getRequestBodyWithoutUploadables(
  request: RequestParameters,
  variables: Variables
) {
  return JSON.stringify({
    name: request.name,
    query: request.text,
    variables
  });
}

export function getRequestBody(
  request: RequestParameters,
  variables: Variables,
  uploadables?: UploadableMap
) {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }

  return getRequestBodyWithoutUploadables(request, variables);
}

export const getHeaders = (uploadables?: UploadableMap) => {
  if (uploadables) {
    return {
      Accept: "*/*"
    };
  }

  return {
    Accept: "application/json",
    "Content-type": "application/json"
  };
};

export const handleData = (response: any) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }

  return response.text();
};
