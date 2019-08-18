import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { useTheme } from "react-navigation";

import { colors } from "../../styles";
import { Container } from "./styles";
import { commitLocalUpdate } from "react-relay";
import env from "../../relay/Environment";
import { TT_THEME } from "../../constants";

const ChangeThemeButton = () => {
  const handleChangeTheme = () => {
    commitLocalUpdate(env, async store => {
      const settings = store.getRoot().getLinkedRecord("settings");
      const currentTheme = settings!.getValue("theme");
      if (currentTheme === "light") {
        settings!.setValue("dark", "theme");
        await AsyncStorage.setItem(TT_THEME, "dark");
      } else {
        settings!.setValue("light", "theme");
        await AsyncStorage.setItem(TT_THEME, "light");
      }
    });
  };

  const theme = useTheme();

  return (
    <Container onPress={handleChangeTheme}>
      <MaterialIcons
        name={theme === "light" ? "brightness-2" : "brightness-7"}
        size={28}
        color={
          theme === "light"
            ? colors.black.fade(0.3).string()
            : colors.white.string()
        }
      />
    </Container>
  );
};

export default ChangeThemeButton;
