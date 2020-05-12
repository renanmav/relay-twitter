module Query = [%relay.query
  {|
    query AppQuery {
      __typename
    }
  |}
];

[@react.component]
let make = () =>
  <ReasonRelay.Context.Provider environment=Environment.environment>
    <React.Suspense fallback=React.null> <Router /> </React.Suspense>
  </ReasonRelay.Context.Provider>;
