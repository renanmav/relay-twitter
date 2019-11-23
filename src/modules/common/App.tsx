import React from "react";
import { useLazyLoadQuery, graphql } from "react-relay/hooks";

import { AppQuery } from "./__generated__/AppQuery.graphql";
import Routes from "./Routes";

export default function App() {
  const { settings } = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        __typename
        settings {
          theme
        }
      }
    `,
    {}
  );

  return <Routes theme={(settings.theme as "light" | "dark") || "light"} />;
}
