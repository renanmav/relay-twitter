exception MutationFailed(string);

open ReactNative;
open ReactNavigation;
open UserRegisterWithEmailMutation_graphql.Types;

module StackParams = {
  type params =
    | None;
};
include Stack.Make(StackParams);

module UserLoginWithEmailMutation = [%relay.mutation
  {|
    mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
        userRegisterWithEmail: UserRegisterWithEmail(input: $input) {
          token
          error
        }
    }
  |}
];

let commit =
    (
      ~environment,
      ~email,
      ~password,
      ~name,
      ~setLoading,
      ~loading,
      ~navigation,
    ) =>
  if (!loading) {
    setLoading(_ => true);

    UserLoginWithEmailMutation.commitMutation(
      ~environment,
      ~variables={
        input: {
          clientMutationId: None,
          email,
          password,
          name,
        },
      },
      ~onCompleted=
        (data, _) => {
          setLoading(_ => false);

          switch (data) {
          | {userRegisterWithEmail: None} =>
            raise(MutationFailed("Could not find userRegisterWithEmail."))
          | {userRegisterWithEmail: Some({error: Some(error)})} =>
            Alert.alert(~title="Error", ~message=error, ())
          | {userRegisterWithEmail: Some(userRegisterWithEmail)} =>
            switch (userRegisterWithEmail.token) {
            | Some(token) =>
              ReactNativeAsyncStorage.setItem("token", token) |> ignore;
              navigation->Navigation.navigate("FeedNavigator");
            | None => Alert.alert(~title="Error", ())
            }
          };
        },
      (),
    )
    |> ignore;
  };
