import React, { ReactChild } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button as AntButton, Icon } from "@ant-design/react-native";
import { ButtonProps } from "@ant-design/react-native/lib/button";
import ButtonStyles from "@ant-design/react-native/lib/button/style";
import Theme from "@ant-design/react-native/lib/style/themes/default";
import { useTheme } from "@react-navigation/native";
import { IconNames } from "@ant-design/react-native/lib/icon";

type ButtonCustomProps = {
  children: ReactChild;
  backgroundColor?: string;
  color?: string;
  icon?: string;
};

const Button = ({
  children,
  backgroundColor,
  color,
  ...rest
}: ButtonProps & ButtonCustomProps) => {
  const { colors } = useTheme();

  return (
    <AntButton
      style={{
        backgroundColor: backgroundColor ?? colors.primary,
        alignItems: "center",
      }}
      styles={styles}
      {...rest}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name={rest.icon as IconNames}
          style={{
            color: color ?? colors.card,
          }}
        />
        <Text style={[{ color: color ?? colors.card }, styles.largeRawText]}>
          {children}
        </Text>
      </View>
    </AntButton>
  );
};

const Styles = ButtonStyles(Theme);

const newStyle = {
  ...Styles,
  container: {
    ...Styles.container,
  },
  wrapperStyle: {
    ...Styles.wrapperStyle,
    borderRadius: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  largeRaw: {
    ...Styles.largeRaw,
    height: 48,
  },
  largeRawText: {
    ...Styles.largeRawText,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 24,
  },
  defaultRawText: {
    color: "#fff",
  },
};

const styles = StyleSheet.create(newStyle);

export default Button;
