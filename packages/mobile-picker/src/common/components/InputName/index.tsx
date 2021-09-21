/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef } from "react";
import { TextInputProps, TextInput, Text, View } from "react-native";
import { useField } from "@unform/core";
import { useTheme } from "@react-navigation/native";
import { labelsTranslated } from "../../../utils/labels-translated";

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  apiMessageError?: string;
}

interface InputReference extends TextInput {
  value: string;
  icon?: string;
  apiMessageError: string;
}

const InputName = ({
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
    if (defaultValue) inputRef.current!.value = defaultValue;
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
      <TextInput
        ref={inputRef}
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        icon={rest.icon}
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

export default InputName;
