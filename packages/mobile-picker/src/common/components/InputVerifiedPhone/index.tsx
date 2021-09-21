/* eslint-disable no-param-reassign */
import React, { useCallback, useState, useEffect, useRef } from "react";
import { TextInputProps, TextInput, Text, View } from "react-native";
import { useField } from "@unform/core";
import { useTheme } from "@react-navigation/native";
import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text";
import { labelsTranslated } from "../../../utils/labels-translated";

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  type: TextInputMaskTypeProp;
  apiMessageError?: string;
}

interface InputReference extends TextInput {
  value: string;
  icon?: string;
  type: TextInputMaskTypeProp;
  apiMessageError: string;
}

const InputName = ({
  name,
  type,
  onChangeText,
  apiMessageError,
  ...rest
}: InputProps) => {
  const { colors } = useTheme();
  const { registerField, fieldName, defaultValue, error } = useField(name);

  const inputRef = useRef<InputReference>(null);

  const [text, setText] = useState("");
  const [rawText, setRawText] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.value,
      setValue: (ref, value) => {
        inputRef.current?.setNativeProps({ text: value });
        ref.current.value = value;
      },
      clearValue: (ref) => {
        inputRef.current?.setNativeProps({ text: "" });
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  const handlerPlaceHolder = (typeInputMask: TextInputMaskTypeProp) => {
    const placeholders: { [key: string]: string } = {
      cpf: "000.000.000-00",
      "cel-phone": "(00) 00000-0000",
    };
    return placeholders[`${typeInputMask}`] || typeInputMask;
  };

  const handleChangeText = useCallback(
    (maskedText, unmaskedText) => {
      if (inputRef.current) inputRef.current.value = unmaskedText;
      setText(maskedText);
      setRawText(unmaskedText);
    },
    [text]
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "Sora",
          color: "#575C57",
          paddingBottom: 12,
        }}
      >
        {labelsTranslated[fieldName] || fieldName}
      </Text>
      <TextInputMask
        type={type}
        includeRawValueInChangeText
        value={text}
        onChangeText={handleChangeText}
        customTextInput={TextInput}
        defaultValue={defaultValue}
        icon={rest.icon}
        customTextInputProps={{
          ref: inputRef,
          placeholder: handlerPlaceHolder(type),
          rawText,
          onInitialData: setText,
        }}
        style={{
          height: 38,
          fontSize: 14,
          borderRadius: 2,
          borderColor: error || apiMessageError ? "red" : colors.border,
          borderWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          paddingRight: 12,
          paddingLeft: 12,
        }}
        {...rest}
      />

      {/* Rever verificação de email e telefone */}
      {!error && (
        <Text style={{ color: "green", fontSize: 10 }}>Verificado</Text>
      )}

      {error && <Text style={{ color: "red", fontSize: 10 }}>{error}</Text>}
      {apiMessageError ? (
        <Text style={{ color: "red", fontSize: 10 }}>{apiMessageError}</Text>
      ) : null}
    </View>
  );
};

export default InputName;
