open ReactNavigation;

include Stack.Make({
  type params = unit;
});

[@react.component]
let make = () => {
  <Native.NavigationContainer>
    <Navigator initialRouteName="UserLogin">
      <Screen
        name="UserLogin"
        component=UserLogin.make
        options={_ => options(~headerShown=false, ())}
      />
      <Screen
        name="UserRegister"
        component=UserRegister.make
        options={_ => options(~headerShown=false, ())}
      />
    </Navigator>
  </Native.NavigationContainer>;
};
