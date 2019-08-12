import ExecutionEnvironment from "./ExecutionEnvironment";

export type InitWithRetries = {
  body?: unknown;
  cache?: string | null;
  credentials?: string | null;
  fetchTimeout?: number | null;
  headers?: unknown;
  method?: string | null;
  mode?: string | null;
  retryDelays?: Array<number> | null;
};

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

function fetchWithRetries(
  uri: string,
  initWithRetries?: InitWithRetries | null
): Promise<any> {
  // @ts-ignore
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};
  const _fetchTimeout = fetchTimeout !== null ? fetchTimeout : DEFAULT_TIMEOUT;
  const _retryDelays = retryDelays !== null ? retryDelays : DEFAULT_RETRIES;

  let requestsAttempted = 0;
  let requestStartTime = 0;
  return new Promise((resolve, reject) => {
    function sendTimedRequest(): void {
      requestsAttempted++;
      requestStartTime = Date.now();
      let isRequestAlive = true;
      // @ts-ignore
      const request = fetch(uri, init);
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          console.log(false, "fetchWithRetries: HTTP timeout, retrying.");
          retryRequest();
        } else {
          reject(
            new Error(
              `fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`
            )
          );
        }
      }, _fetchTimeout);

      request
        // @ts-ignore
        .then(response => {
          clearTimeout(requestTimeout);
          if (isRequestAlive) {
            if (response.status >= 200 && response.status < 300) {
              resolve(response);
            } else if (response.status === 401) {
              resolve(response);
            } else if (shouldRetry(requestsAttempted)) {
              console.log(false, "fetchWithRetries: HTTP error, retrying."),
                retryRequest();
            } else {
              // Request was not successful, giving up.
              const error: any = new Error(
                `fetchWithRetries(): Still no successful response after ${requestsAttempted} retries, giving up.`
              );
              error.response = response;
              reject(error);
            }
          }
        })
        // @ts-ignore
        .catch(error => {
          clearTimeout(requestTimeout);
          if (shouldRetry(requestsAttempted)) {
            retryRequest();
          } else {
            reject(error);
          }
        });
    }

    function retryRequest(): void {
      const retryDelay = _retryDelays[requestsAttempted - 1];
      const retryStartTime = requestStartTime + retryDelay;
      setTimeout(sendTimedRequest, retryStartTime - Date.now());
    }

    function shouldRetry(attempt: number): boolean {
      return ExecutionEnvironment.canUseDOM && attempt <= _retryDelays.length;
    }

    sendTimedRequest();
  });
}

export default fetchWithRetries;
