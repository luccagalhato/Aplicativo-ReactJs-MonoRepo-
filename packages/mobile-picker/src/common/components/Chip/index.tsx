import { Icon } from "@ant-design/react-native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ChipProps {
  title: string;
  selected: boolean;
  value: string | number | boolean;
  handleRemove(value: ChipProps["value"]): void;
  handleAdd(value: ChipProps["value"]): void;
}

const Chip = ({
  title,
  selected,
  value,
  handleRemove,
  handleAdd,
}: ChipProps): JSX.Element => (
  <TouchableWithoutFeedback
    style={styles.chipContainer}
    onPress={() => (selected ? handleRemove(value) : handleAdd(value))}
  >
    <Text style={styles.chipText}>{title}</Text>
    {selected && (
      <Icon name="close" color="#41A550" size={12} style={{ marginTop: 2 }} />
    )}
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    backgroundColor: "#EDF9ED",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    marginVertical: 4,
  },
  chipText: {
    color: "#0F281E",
    fontFamily: "Sora",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Chip;
