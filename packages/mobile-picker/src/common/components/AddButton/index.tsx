import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { IconOutline } from "@ant-design/icons-react-native";

const style = StyleSheet.create({
  filled: {
    color: "#41A550",
    backgroundColor: "rgba(65, 164, 80, 0.2)",
    borderRadius: 100,
  },
  outlined: {
    color: "#41A550",
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    paddingHorizontal: 10,
    lineHeight: 26,
  },
});

interface ButtonProps {
  buttonStyle: "outlined" | "filled";
  value: number;
  minValue: number;
  onChange(value: number): void;
}

const AddButton = ({
  buttonStyle,
  value,
  minValue,
  onChange,
}: ButtonProps) => {
  function onValueChange(inputValue: number) {
    return () => {
      const newValue = value + inputValue;
      onChange(newValue >= minValue ? newValue : minValue);
    };
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {value > 0 && (
        <TouchableOpacity onPress={onValueChange(-1)}>
          <IconOutline
            name={buttonStyle === "outlined" ? "minus" : "minus-circle"}
            size={buttonStyle === "outlined" ? 26 : 22}
            style={buttonStyle === "outlined" ? style.outlined : style.filled}
          />
        </TouchableOpacity>
      )}
      {value > 0 && <Text style={style.text}>{value}</Text>}
      <TouchableOpacity onPress={onValueChange(+1)}>
        <IconOutline
          name={buttonStyle === "outlined" ? "plus" : "plus-circle"}
          style={buttonStyle === "outlined" ? style.outlined : style.filled}
          size={buttonStyle === "outlined" ? 26 : 22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;
