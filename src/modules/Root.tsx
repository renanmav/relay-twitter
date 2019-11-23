import React, { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import App from "./App";

import environment from "../relay/Environment";

export default function Root() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
