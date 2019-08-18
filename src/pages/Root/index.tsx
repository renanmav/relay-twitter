import React from "react";
import App from "../../routes";
import { createFragmentContainer, graphql } from "react-relay";
import { createQueryRendererModern } from "../../relay";

interface RelayProps {
  query: {
    settings: {
      theme: "light" | "dark";
    };
  };
}

function Root({
  query: {
    settings: { theme }
  }
}: RelayProps) {
  return <App theme={theme} />;
}

const RootFragment = createFragmentContainer(Root, {
  query: graphql`
    fragment Root_query on Query {
      settings {
        theme
      }
    }
  `
});

export default createQueryRendererModern(RootFragment, Root, {
  query: graphql`
    query RootQuery {
      __typename
      ...Root_query
    }
  `
});
