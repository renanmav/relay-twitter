import { createSwitchNavigator, createAppContainer } from "react-navigation";

import UserLogin from "./pages/UserLogin";

const App = createSwitchNavigator(
  {
    UserLogin: { screen: UserLogin }
  },
  { initialRouteName: "UserLogin" }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
