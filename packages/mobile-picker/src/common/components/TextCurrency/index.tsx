import { TextInputProps } from "@ant-design/react-native/lib/textarea-item";
import React from "react";
import { Text } from "react-native";

interface TextCurrencyProps extends TextInputProps {
  currencyValue: number;
}

const TextCurrency = ({ currencyValue, ...rest }: TextCurrencyProps) => {
  const formatedvalue = `R$ ${currencyValue.toFixed(2)}`;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text {...rest}>{formatedvalue}</Text>;
};

export default TextCurrency;
