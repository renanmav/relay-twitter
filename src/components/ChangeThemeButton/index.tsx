import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { colors } from "../../styles";
import { Container } from "./styles";
import { commitLocalUpdate } from "react-relay";
import env from "../../relay/Environment";
import { useTheme } from "react-navigation";

const ChangeThemeButton = () => {
  const handleChangeTheme = () => {
    commitLocalUpdate(env, store => {
      const settings = store.getRoot().getLinkedRecord("settings");
      const currentTheme = settings!.getValue("theme");
      currentTheme === "light"
        ? settings!.setValue("dark", "theme")
        : settings!.setValue("light", "theme");
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
