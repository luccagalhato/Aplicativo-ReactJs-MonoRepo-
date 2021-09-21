/* eslint-disable no-param-reassign */
import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { TextInputProps, TextInput, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  const [secure, setSecure] = useState(rest.secureTextEntry);
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 48,
          borderRadius: 2,
          borderColor: error || apiMessageError ? "red" : colors.border,
          borderWidth: 1,
          padding: 8,
          paddingLeft: rest.iconSide === "left" ? 35 : 8,
          paddingRight: rest.iconSide === "right" ? 35 : 8,
        }}
      >
        <TextInput
          ref={inputRef}
          onChangeText={handleChangeText}
          defaultValue={defaultValue}
          style={{
            fontSize: 16,
            flexGrow: 1,
          }}
          {...rest}
          secureTextEntry={secure}
        />
        {rest.secureTextEntry && (
          <Ionicons
            name={secure ? 'eye' : 'eye-off'}
            size={24}
            color={colors.text}
            onPress={() => setSecure(!secure)}
          />
        )}
      </View>
      {error && <Text style={{ color: "red", fontSize: 10 }}>{error}</Text>}
      {apiMessageError ? (
        <Text style={{ color: "red", fontSize: 10 }}>{apiMessageError}</Text>
      ) : null}
    </View>
  );
};

export default Input;
