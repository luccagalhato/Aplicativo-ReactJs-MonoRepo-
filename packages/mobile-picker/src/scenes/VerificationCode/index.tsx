import { Provider, Toast } from "@ant-design/react-native";
import { useNavigation, useTheme, RouteProp } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import React, { useRef } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { FormHandles, SubmitHandler } from "@unform/core";
import Button from "../../common/components/Button";
import CodeInput from "../../common/components/CodeInput";
import {
  confirmCode,
  resendConfirmationCode,
} from "../../service/authentication.api";
import { User, UserRegistration } from "../../common/interfaces";
import { useAuth } from "../../contexts/Auth";

type VerificationCodeParamList = {
  VerificationCode: {
    email?: string;
    phone?: string;
    user: UserRegistration;
  };
};

type ProfileScreenRouteProp = RouteProp<
  VerificationCodeParamList,
  "VerificationCode"
>;

type Props = {
  route: ProfileScreenRouteProp;
};

type VerificationCodeResponse = {
  ok: boolean;
  data: {
    accessToken: {
      jwtToken: string;
    };
    idToken: {
      jwtToken: string;
    };
    client: User;
  };
};

const VerificationCode = ({ route }: Props) => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { setUserData } = useAuth();

  const { email, phone, user } = route.params;

  const handleSubmit: SubmitHandler<FormData & { "code-digit": string }> =
    async (data): Promise<void> => {
      if (data["code-digit"]?.length < 6) {
        Toast.fail("O código de confirmação deve ter 6 dígitos", 2);
        return;
      }

      const respVerifyCode = (await confirmCode(
        user,
        data["code-digit"]
      )) as VerificationCodeResponse;

      if (!respVerifyCode.ok) {
        Alert.alert("Codigo de verificação inválido!");
        return;
      }

      setUserData({
        accessToken: respVerifyCode.data.accessToken.jwtToken,
        idToken: respVerifyCode.data.idToken.jwtToken,
        client: respVerifyCode.data.client,
      });

      navigation.navigate("FirstLastName", {
        user,
      });
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Provider>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 24,
            marginTop: 26,
          }}
        >
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  textAlign: "left",
                  fontFamily: "Sora",
                  color: colors.text,
                }}
              >
                Enviamos um código de 6 digitos para {email ?? phone}
              </Text>
              <CodeInput
                name="code-digit"
                onEndEditing={formRef.current?.submitForm}
              />
              <Pressable
                onPress={async () => {
                  await resendConfirmationCode(user);
                  Alert.alert("Codigo Reenviado!");
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "bold",
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  Reenviar código
                </Text>
              </Pressable>
            </View>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
              backgroundColor={colors.primary}
              color={colors.card}
            >
              Continuar
            </Button>
          </Form>
        </View>
      </Provider>
    </KeyboardAvoidingView>
  );
};

export default VerificationCode;
