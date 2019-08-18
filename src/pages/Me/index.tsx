import React, { useEffect } from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import {
  createFragmentContainer,
  graphql,
  commitLocalUpdate
} from "react-relay";
import createQueryRenderer from "../../relay/createQueryRendererModern";
import { Me_query } from "./__generated__/Me_query.graphql";
import AsyncStorage from "@react-native-community/async-storage";
import { TT_THEME } from "../../constants";
import env from "../../relay/Environment";

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

    const verifyTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem(TT_THEME);
        commitLocalUpdate(env, store => {
          const root = store.getRoot();
          const settings = root.getLinkedRecord("settings");
          settings!.setValue(theme, "theme");
        });
      } catch (err) {
        console.log(err);
      }
    };

    verifyTheme();
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
  `
});
