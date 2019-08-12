import { createSwitchNavigator, createAppContainer } from "react-navigation";

import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";

const App = createSwitchNavigator(
  {
    UserLogin: { screen: UserLogin },
    UserRegister: { screen: UserRegister }
  },
  { initialRouteName: "UserLogin" }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
