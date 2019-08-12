import React from "react";
import { Text } from "react-native";
import { GraphQLTaggedNode, Variables } from "relay-runtime";
import { QueryRenderer } from "react-relay";
import hoistStatics from "hoist-non-react-statics";

import Environment from "./Environment";

interface Config {
  query?: GraphQLTaggedNode;
  queriesParams?: (props: Object) => Object;
  variables?: Variables;
  hideSplash?: boolean;
}

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType,
  Component: React.ComponentType,
  config: Config
): JSX.Element {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      if (variables)
        return (
          <QueryRenderer
            environment={Environment}
            query={query}
            variables={variables}
            render={({ error, props }) => {
              if (error) {
                return <Text>{error.toString()}</Text>;
              }

              if (props) {
                // @ts-ignore
                return <FragmentComponent {...this.props} query={props} />;
              }

              return <Text>Loading</Text>;
            }}
          />
        );
    }
  }

  // @ts-ignore
  return hoistStatics(QueryRendererWrapper, Component);
}
