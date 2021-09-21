import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import RangeSlider from "react-native-range-slider-expo";

interface RangeProps {
  setFromValue(value: number): void;
  setToValue(value: number): void;
  initialFromValue: number;
  initialToValue: number;
  min?: number;
  max?: number;
  step?: number;
}

const Range = ({
  setFromValue,
  setToValue,
  initialFromValue,
  initialToValue,
  min = 0,
  max = 150,
  step = 5,
}: RangeProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        fromValueOnChange={setFromValue}
        toValueOnChange={setToValue}
        initialFromValue={initialFromValue}
        initialToValue={initialToValue}
        toKnobColor={colors.card}
        fromKnobColor={colors.card}
        inRangeBarColor="#BFEFC5"
        outOfRangeBarColor="#EFF0EF"
        rangeLabelsTextColor="#979797"
        valueLabelsBackgroundColor="#252725"
        styleSize="small"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Range;
