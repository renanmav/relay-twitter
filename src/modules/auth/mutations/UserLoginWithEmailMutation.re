exception MutationFailed(string);

open ReactNative;
open ReactNavigation;
open UserLoginWithEmailMutation_graphql.Types;

module StackParams = {
  type params =
    | None;
};
include Stack.Make(StackParams);

module UserLoginWithEmailMutation = [%relay.mutation
  {|
    mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
      userLoginWithEmail: UserLoginWithEmail(input: $input) {
        token
        error
      }
    }
  |}
];

let commit = (~environment, ~setLoading, ~email, ~password, ~navigation) => {
  setLoading(_ => true);

  UserLoginWithEmailMutation.commitMutation(
    ~environment,
    ~variables={
      input: {
        clientMutationId: None,
        email,
        password,
      },
    },
    ~onCompleted=
      (data, _) => {
        setLoading(_ => false);

        (
          switch (data) {
          | {userLoginWithEmail: None} =>
            raise(MutationFailed("Could not find userLoginWithEmail."))
          | {userLoginWithEmail: Some({error: Some(error)})} =>
            Alert.alert(~title="Error", ())
          | {userLoginWithEmail: Some(userLoginWithEmail)} =>
            switch (userLoginWithEmail.token) {
            | Some(token) =>
              ReactNativeAsyncStorage.setItem("token", token) |> ignore;
              navigation->Navigation.navigate("FeedNavigator");
            | None => Alert.alert(~title="Error", ())
            }
          }
        )
        |> ignore;
      },
    (),
  )
  |> ignore;
};
