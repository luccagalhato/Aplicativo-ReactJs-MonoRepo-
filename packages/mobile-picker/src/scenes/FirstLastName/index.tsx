import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useRef, useCallback } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import { validateSchema } from "./form";
import { updateClient } from "../../service/client.api";
import { getValueByKeyInPayload } from "../../service/helpers";
import { useAuth } from "../../contexts/Auth";

interface NameData {
  firstName: string;
  lastName: string;
}

const FirstLastName = () => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { userData } = useAuth();

  const handleSubmit = useCallback(async (data: NameData) => {
    try {
      if (userData?.accessToken && userData.idToken) {
        formRef.current?.setErrors({});

        await validateSchema(data);

        const id = getValueByKeyInPayload("username", userData.accessToken);
        if (id) {
          const respClient = await updateClient(id, {
            first_name: data.firstName,
            last_name: data.lastName,
          });

          if (respClient.ok)
            return navigation.navigate("Location", {
              clientId: id,
            });
        }
      }

      Alert.alert(
        "Falha ao atualizar usuário, por favor coloque email e senha novamente!"
      );
      return navigation.navigate("EmailSignUp");
    } catch (err) {
      const ValidationErrors: any = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          ValidationErrors[error.path!] = error.message;
        });
        formRef.current?.setErrors(ValidationErrors);
      }

      return err;
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        marginTop: 26,
        position: "relative",
      }}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={{ paddingBottom: 12 }}>
            <Input name="firstName" returnKeyType="next" placeholder="Nome" />
          </View>
          <Input name="lastName" returnKeyType="next" placeholder="Sobrenome" />
        </View>

        <Button
          backgroundColor={colors.primary}
          color={colors.card}
          onPress={() => {
            formRef.current?.submitForm();
          }}
        >
          Continuar
        </Button>
      </Form>
    </View>
  );
};

const style = (colors: any) =>
  StyleSheet.create({
    textError: {
      flex: 1,
      backgroundColor: colors.card,
      marginTop: 10,
      marginLeft: 4,
      color: "red",
    },
    conatiner: {
      flex: 1,
      backgroundColor: colors.card,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      marginTop: 26,
      position: "relative",
    },
  });

export default FirstLastName;
