/* eslint-disable no-param-reassign */
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { TextInputProps, TextInput, Text, View } from "react-native";
import { useField } from "@unform/core";
import { useTheme } from "@react-navigation/native";
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from "react-native-masked-text";
import { labelsTranslated } from "../../../utils/labels-translated";

interface InputProps extends TextInputProps {
  name: string;
  icon?: ReactNode;
  type: TextInputMaskTypeProp;
  apiMessageError?: string;
  noLabel?: boolean;
  placeholder?: string;
  options?: TextInputMaskOptionProp;
}

interface InputReference extends TextInput {
  value: string;
  type: TextInputMaskTypeProp;
  apiMessageError: string;
}

const InputMask = ({
  name,
  type,
  placeholder,
  noLabel,
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
      "cel-phone": "00 00000-0000",
      "credit-card": "Número do cartão",
    };
    return placeholders[`${typeInputMask}`];
  };

  const handleChangeText = useCallback((maskedText, unmaskedText) => {
    if (inputRef.current) inputRef.current.value = unmaskedText;
    setText(maskedText);
    setRawText(unmaskedText);
  }, []);

  return (
    <View style={{ marginBottom: 8 }}>
      {!noLabel && (
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
      )}
      {rest.icon ?? null}
      <TextInputMask
        type={type}
        includeRawValueInChangeText
        value={text}
        onChangeText={handleChangeText}
        customTextInput={TextInput}
        defaultValue={defaultValue}
        customTextInputProps={{
          ref: inputRef,
          placeholder: placeholder ?? handlerPlaceHolder(type),
          rawText,
          onInitialData: setText,
        }}
        style={{
          height: 48,
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
      {error && <Text style={{ color: "red", fontSize: 10 }}>{error}</Text>}
      {apiMessageError ? (
        <Text style={{ color: "red", fontSize: 10 }}>{apiMessageError}</Text>
      ) : null}
    </View>
  );
};

export default InputMask;
