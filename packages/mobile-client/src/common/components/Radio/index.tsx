import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

type RadioProps = {
  title?: string;
  checked: boolean;
  name: string;
  onChange(name: string): void;
};

const Radio = ({ title, checked, name, onChange }: RadioProps) => {
  function handleCheck() {
    onChange(name);
  }

  return (
    <TouchableOpacity onPress={handleCheck} style={styles.buttonContainer}>
      <View style={[styles.circle, checked ? styles.checked : {}]}>
        {checked && <View style={styles.checkedCircle} />}
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 2,
    padding: 5,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8DAD8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checked: {
    borderColor: "#41a550",
  },
  checkedCircle: {
    width: 8,
    height: 8,
    borderRadius: 7,
    backgroundColor: "#41A550",
  },
  text: {
    fontFamily: "Sora",
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Radio;
