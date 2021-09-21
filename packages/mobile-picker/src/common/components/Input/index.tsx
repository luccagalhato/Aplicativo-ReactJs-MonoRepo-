/* eslint-disable no-param-reassign */
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { TextInputProps, TextInput, Text, View } from "react-native";
import { useField } from "@unform/core";
import { useTheme } from "@react-navigation/native";

interface InputProps extends TextInputProps {
  name: string;
  icon?: ReactNode;
  apiMessageError?: string;
  iconSide?: string;
}

interface InputReference extends TextInput {
  value: string;
  icon?: string;
  apiMessageError: string;
}

const Input = ({
  name,
  onChangeText,
  apiMessageError,
  ...rest
}: InputProps) => {
  const { colors } = useTheme();
  const { registerField, fieldName, defaultValue, error } = useField(name);

  const inputRef = useRef<InputReference>(null);

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

  const handleChangeText = useCallback(
    (text) => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <View>
      {rest.icon ?? null}
      <TextInput
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        style={{
          height: 48,
          fontSize: 16,
          borderRadius: 2,
          borderColor: error || apiMessageError ? "red" : colors.border,
          borderWidth: 1,
          padding: 8,
          paddingLeft: rest.iconSide === "left" ? 35 : 8,
          paddingRight: rest.iconSide === "right" ? 35 : 8,
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

export default Input;
