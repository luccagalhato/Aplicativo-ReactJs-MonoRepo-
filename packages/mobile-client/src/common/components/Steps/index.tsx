import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";

interface HeaderProps {
  steps: { title: string; description: string }[];
  current: number;
}

const Steps = ({ steps, current }: HeaderProps) => {
  const { colors } = useTheme();
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flexDirection: "column",
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
        width,
      }}
    >
      {steps.map((step, index) => (
        <View
          key={`step-${(index + 1) * 2}`}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
              width: 12,
            }}
          >
            <View
              style={{
                borderRadius: 100,
                backgroundColor:
                  index <= current ? colors.primary : colors.border,
                width: current === index ? 8 : 6,
                height: current === index ? 8 : 6,
                marginTop: current === index ? 8 : 10,
                marginBottom: 5,
              }}
            />
            {index < steps.length - 1 && (
              <View
                style={{
                  backgroundColor:
                    index <= current ? colors.primary : colors.border,
                  width: 1,
                  height: 35,
                }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Sora",
                lineHeight: 24,
                textAlignVertical: "center",
                fontWeight: "bold",
                color: index <= current ? colors.text : colors.border,
              }}
            >
              {step.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Sora",
                lineHeight: 24,
                textAlignVertical: "center",
                color: index <= current ? colors.text : colors.border,
              }}
            >
              {step.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Steps;
