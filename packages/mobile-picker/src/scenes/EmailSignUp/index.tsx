import { useTheme } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import * as Yup from "yup";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import { AppTypeEnum } from "../../common/enums";
import { useAuth } from "../../contexts/Auth";
import { EmailSignUp as SignUpData, validateSchema } from "./form";

const EmailSignUp = () => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);
  const [apiMessageError, setApiMessageError] = useState<string>("");

  const { signIn } = useAuth();

  const handleSubmit = async (data: SignUpData) => {
    try {
      formRef.current?.setErrors({});
      await validateSchema(data);
      const user = { ...data, appType: AppTypeEnum.COLLABORATOR_APP };
      const respRegisterUser = await signIn(user);
      if (!respRegisterUser.ok) {
        setApiMessageError("Usuário ou senha inválidos");
      }

    } catch (err) {
      const ValidationErrors: any = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          ValidationErrors[error.path as string] = error.message;
        });
        formRef.current?.setErrors(ValidationErrors);
        console.log(formRef.current?.getErrors());
      }
      return err;
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%", justifyContent: "space-between" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingLeft: 20,
          paddingTop: 32,
          paddingRight: 20,
          paddingBottom: 32,
          marginTop: 26,
          position: "relative",
        }}
      >
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ flex: 1, justifyContent: "space-between" }}
        >
          <View>
            <View style={{ paddingBottom: 12 }}>
              <Input
                name="email"
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="E-mail"
                autoCapitalize="none"
              />
            </View>
            <Input
              secureTextEntry
              name="password"
              apiMessageError={apiMessageError}
              autoCompleteType="password"
              returnKeyType="next"
              placeholder="Senha"
            />
          </View>

          <View>
            <Button
              backgroundColor={colors.primary}
              color={colors.card}
              onPress={() => {
                setApiMessageError("");
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </View>
        </Form>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmailSignUp;
