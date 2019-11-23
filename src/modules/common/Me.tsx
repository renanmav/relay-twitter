import React, { useEffect, useCallback } from "react";
import { View } from "react-native";
import { commitLocalUpdate } from "react-relay";
import {
  graphql,
  useRelayEnvironment,
  useLazyLoadQuery
} from "react-relay/hooks";
import { NavigationScreenProp } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

import { TT_THEME } from "../../constants";

interface Props {
  navigation: NavigationScreenProp<{}>;
}

export default function Me(props: Props) {
  const env = useRelayEnvironment();

  const me = useLazyLoadQuery(
    graphql`
      query MeQuery {
        me {
          _id
          name
          email
          active
        }
      }
    `,
    {}
  );

  const verifyUserLoggedIn = useCallback(() => {
    if (me) return props.navigation.navigate("FeedNavigator");
    return props.navigation.navigate("UserLogin");
  }, [me, props.navigation]);

  const verifyTheme = useCallback(async () => {
    try {
      const theme = await AsyncStorage.getItem(TT_THEME);
      commitLocalUpdate(env, store => {
        const root = store.getRoot();
        const settings = root.getLinkedRecord("settings");
        settings!.setValue(theme, "theme");
      });
    } catch (err) {}
  }, [env]);

  useEffect(() => {
    verifyTheme();
    verifyUserLoggedIn();
  }, [verifyTheme, verifyUserLoggedIn]);

  return <View />;
}
