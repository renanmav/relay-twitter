import React, { useEffect } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { createFragmentContainer, graphql } from "react-relay";
import createQueryRenderer from "../../relay/createQueryRendererModern";
import { Me_query } from "./__generated__/Me_query.graphql";

interface OwnProps {
  navigation: NavigationScreenProp<{}>;
}
interface RelayProps {
  query: Me_query;
}

type MeProps = OwnProps & RelayProps;

function Me({ navigation, query }: MeProps) {
  useEffect(() => {
    const verifyUserLoggedIn = () => {
      if (query.me) return navigation.navigate("FeedNavigator");

      return navigation.navigate("UserLogin");
    };

    verifyUserLoggedIn();
  }, [navigation, query.me]);

  return <View />;
}

const MeFragmentContainer = createFragmentContainer(Me, {
  query: graphql`
    fragment Me_query on Query {
      me {
        _id
        name
        email
        active
      }
    }
  `
});

export default createQueryRenderer(MeFragmentContainer, Me, {
  query: graphql`
    query MeQuery {
      ...Me_query
    }
  `,
  queriesParams: () => ({
    Authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGNjMTVlMmVmNzMwMWZkNTY3YTc0YiIsImlhdCI6MTU2NTcwMDY4NX0.0EejFGLyW4I-VsysTJ29WWO5AOV3L8NXVaM57ptAHdY"
  })
});
