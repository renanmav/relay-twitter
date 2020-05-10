open ReactNavigation;

include Stack.Make({
  type params = unit;
});

[@react.component]
let make = () => {
  <Native.NavigationContainer>
    <Navigator initialRouteName="Test">
      <Screen
        name="UserLogin"
        component=UserLogin.make
        options={_ => options(~headerShown=false, ())}
      />
    </Navigator>
  </Native.NavigationContainer>;
};
