import React from "react";
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSignInWithAnonymously() {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert(
              "E-mail não disponível. Escolha outro e-mail para cadastrar!"
            );
            break;
          case "auth/invalid-email":
            Alert.alert("E-mail inválido!");
            break;
          case "auth/weak-password":
            Alert.alert("A senha deve ter no mínimo 6 dígitos!");
            break;
        }
      });
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
