open ReactNative;
open ReactNavigation;

module StackParams = {
  type params =
    | None;
};
include Stack.Make(StackParams);

module UserRegisterWithEmailMutation = [%relay.mutation
  {|
    mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
      userRegisterWithEmail: UserRegisterWithEmail(input: $input) {
        token
        error
      }
    }
  |}
];

let logo =
  Image.Source.fromRequired(Packager.require("../../assets/img/logo.png"));

let styles =
  Style.(
    StyleSheet.create({
      "content":
        viewStyle(
          ~flex=1.0,
          ~justifyContent=`center,
          ~alignItems=`center,
          ~marginHorizontal=40.0->dp,
          (),
        ),
      "logo":
        viewStyle(
          ~width=64.0->dp,
          ~height=64.0->dp,
          ~marginBottom=30.0->dp,
          (),
        ),
      "input":
        textStyle(
          ~borderBottomWidth=StyleSheet.hairlineWidth,
          ~borderBottomColor="#ddd",
          ~width=100.0->pct,
          ~padding=0.0->dp,
          ~marginTop=24.0->dp,
          ~paddingBottom=5.0->dp,
          ~color="#222",
          (),
        ),
      "button":
        viewStyle(
          ~borderWidth=1.0,
          ~borderColor="#1EA1F3",
          ~borderRadius=20.0,
          ~paddingHorizontal=20.0->dp,
          ~paddingVertical=10.0->dp,
          ~width=100.0->pct,
          ~alignItems=`center,
          ~justifyContent=`center,
          ~marginTop=20.0->dp,
          ~height=42.0->dp,
          (),
        ),
      "buttonText": textStyle(~fontWeight=`bold, ~color="#1EA1F3", ()),
      "colorful": style(~backgroundColor="#1EA1F3", ~color="#fff", ()),
    })
  );

external elementToObj: TextInput.element => Js.t({..}) = "%identity";

[@react.component]
let make = (~navigation, ~route) => {
  let (name, setName) = React.useState(() => "");
  let (email, setEmail) = React.useState(() => "");
  let (password, setPassword) = React.useState(() => "");
  let (loading, setLoading) = React.useState(() => false);

  let secondInputRef = React.useRef(Js.Nullable.null);
  let thirdInputRef = React.useRef(Js.Nullable.null);

  let (mutate, _) = UserRegisterWithEmailMutation.use();

  let handleRegister = _ =>
    if (!loading) {
      setLoading(_ => true);

      mutate(
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

            Js.log(data);
          },
        (),
      )
      |> ignore;
    };

  <>
    <StatusBar barStyle=`darkContent backgroundColor="#fff" />
    <TouchableWithoutFeedback onPress={_ => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior=`padding style=styles##content>
        <Image source=logo resizeMode=`contain style=styles##logo />
        <TextInput
          autoCorrect=false
          placeholderTextColor="#999"
          style=styles##input
          placeholder="Nome"
          returnKeyType=`next
          autoCapitalize=`words
          value=name
          onChangeText={e => setName(_ => e)}
          onSubmitEditing={_ =>
            switch (Js.Nullable.toOption(React.Ref.current(secondInputRef))) {
            | Some(ref) => ref->elementToObj##focus()
            | None => ()
            }
          }
        />
        <TextInput
          ref=secondInputRef
          autoCorrect=false
          placeholderTextColor="#999"
          style=styles##input
          keyboardType=`emailAddress
          placeholder="E-mail"
          returnKeyType=`next
          autoCapitalize=`none
          value=email
          onChangeText={e => setEmail(_ => e)}
          onSubmitEditing={_ =>
            switch (Js.Nullable.toOption(React.Ref.current(thirdInputRef))) {
            | Some(ref) => ref->elementToObj##focus()
            | None => ()
            }
          }
        />
        <TextInput
          ref=thirdInputRef
          autoCorrect=false
          secureTextEntry=true
          placeholderTextColor="#999"
          placeholder="Senha"
          style=styles##input
          returnKeyType=`send
          autoCapitalize=`none
          value=password
          onChangeText={e => setPassword(_ => e)}
          onSubmitEditing=handleRegister
        />
        <TouchableOpacity
          style={StyleSheet.flatten([|styles##button, styles##colorful|])}
          onPress=handleRegister>
          {loading
             ? <ActivityIndicator
                 size={ActivityIndicator_Size.exact(18.0)}
                 color="#fff"
               />
             : <Text
                 style={StyleSheet.flatten([|
                   styles##buttonText,
                   styles##colorful,
                 |])}>
                 "Registrar"->React.string
               </Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style=styles##button onPress={_ => navigation->Navigation.goBack()}>
          <Text style=styles##buttonText> "Voltar"->React.string </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </>;
};
