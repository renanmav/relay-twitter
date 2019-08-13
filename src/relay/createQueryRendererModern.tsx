import * as React from "react";
import { Text, View } from "react-native";
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
  FragmentComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  config: Config
): React.ComponentType {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables!}
          render={({ error, props }) => {
            if (error) {
              return <Text>{error.toString()}</Text>;
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return <View />;
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}
