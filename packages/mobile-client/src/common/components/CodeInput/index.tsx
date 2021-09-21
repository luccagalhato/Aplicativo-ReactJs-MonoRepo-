import { Flex } from "@ant-design/react-native";
import { useTheme } from "@react-navigation/native";
import { useField } from "@unform/core";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const CODE_LENGTH = 6;

interface InputProps extends TextInputProps {
  name: string;
}

interface InputReference extends TextInput {
  value: string;
}

const style = StyleSheet.create({
  container: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
    height: 48,
    maxWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 20,
    fontFamily: "Sora",
  },
  hiddenCodeInput: {
    position: "absolute",
    opacity: 0,
  },
});

const CodeInput = ({ name, onChangeText, ...props }: InputProps) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const { registerField, fieldName, defaultValue = "" } = useField(name);
  const [code, setCode] = useState("");
  const { colors } = useTheme();

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);

  const inputRef = useRef<InputReference>(null);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    inputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = " ";
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...style.inputContainer, borderColor: colors.background }
        : style.inputContainer;

    return (
      <Flex.Item key={idx} style={{ margin: 5 }}>
        <View style={containerStyle}>
          <Text style={style.inputText}>{digit}</Text>
        </View>
      </Flex.Item>
    );
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
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
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;
      if (onChangeText) onChangeText(value);
      setCode(value);
    },
    [onChangeText]
  );

  return (
    <SafeAreaView style={style.container}>
      <Flex
        direction="column"
        style={{ marginTop: 0, alignItems: "center", justifyContent: "center" }}
      >
        <Pressable style={style.inputsContainer} onPress={handleOnPress}>
          {codeDigitsArray.map(toDigitInput)}
        </Pressable>
      </Flex>
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
        {...props}
      />
    </SafeAreaView>
  );
};

export default CodeInput;
