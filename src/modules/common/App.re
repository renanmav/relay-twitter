open ReactNative;

module Query = [%relay.query
  {|
    query AppQuery {
      __typename
    }
  |}
];

[@react.component]
let make = () => {
  <SafeAreaView> <Text> "App component"->React.string </Text> </SafeAreaView>;
};
