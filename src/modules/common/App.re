module Query = [%relay.query
  {|
    query AppQuery {
      __typename
    }
  |}
];

[@react.component]
let make = () => <Router />;
