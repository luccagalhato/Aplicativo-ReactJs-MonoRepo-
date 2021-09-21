import { Icon } from '@ant-design/react-native';
import { useTheme } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
// import { useAuth } from 'app/contexts/Auth';
import InputName from 'app/common/components/InputName';
import Button from 'app/common/components/Button';
import InputMask from 'app/common/components/InputMask';
// import { updateClient } from 'app/service/client.api';
// import { User } from 'app/common/interfaces';

export interface Chat {
  message: string;
}

export const schema = Yup.object().shape({
  message: Yup.string().required(`É necessário digitar ao menos uma frase`),
});

export const validateSchema = async ({ message }: Chat) =>
  schema.validate(message, { abortEarly: false });

const Chat = () => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);

  // const { userData } = useAuth();

  const { width, height } = Dimensions.get("window");

  const handleSubmit = useCallback(async () => {}, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.card,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 75,
          height: 75,
          margin: 25,
          borderRadius: 37.5,
          backgroundColor: "#EFF0EF",
        }}
      >
        <Icon name="camera" />
      </View>
      <View
        style={{
          alignItems: "center",
          paddingBottom: 25,
          flex: 1,
          backgroundColor: colors.card,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: "relative",
        }}
      >
        <ScrollView>
          <Form
            initialData={{}}
            ref={formRef}
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              width: width * 0.9,
              height: height * 0.65,
            }}
          >
            <InputName
              name="firstName"
              returnKeyType="next"
              placeholder="Nome"
            />
            <InputName
              name="lastName"
              returnKeyType="next"
              placeholder="Sobrenome"
            />
            <InputMask
              defaultValue="998456125495"
              type="cpf"
              name="cpf"
              keyboardType="numeric"
            />
            {/* <InputMask type="cpf" name="cpf" keyboardType="numeric" /> */}
            {/* <InputName name="email" returnKeyType="next" placeholder="E-mail" /> */}
            <InputName name="email" returnKeyType="next" placeholder="E-mail" />
            {/* <InputMask type="cel-phone" name="phone" keyboardType="numeric" /> */}
            <InputMask type="cel-phone" name="phone" keyboardType="numeric" />
            <View style={{ width: 370, marginTop: 15 }}>
              <Button
                backgroundColor={colors.primary}
                color={colors.card}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Atualizar Usuario
              </Button>
            </View>
          </Form>
        </ScrollView>
      </View>

      {/* <InputName /> */}
    </View>
  );
};

export default Chat;
