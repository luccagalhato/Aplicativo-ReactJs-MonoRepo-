import React from "react";
import { View } from "react-native";

interface RoundIconProps {
  backgroundColor?: string;
  children?: JSX.Element;
  size: "large" | "medium" | "small";
  svgIcon?: JSX.Element;
}

const sizes = [
  { type: "small", iconWidth: 20, viewSize: 40 },
  { type: "medium", iconWidth: 48, viewSize: 96 },
  { type: "large", iconWidth: 100, viewSize: 196 },
];

const RoundIcon = ({
  children,
  svgIcon,
  backgroundColor,
  size,
}: RoundIconProps) => {
  const Svg = svgIcon as any;

  function getSize(value: string) {
    return sizes.find((item) => item.type === value) || sizes[0];
  }

  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 100,
        padding: 10,
        margin: 5,
        width: getSize(size).viewSize,
        height: getSize(size).viewSize,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children || <Svg width={getSize(size).iconWidth} />}
    </View>
  );
};

export default RoundIcon;
