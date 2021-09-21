import { DefaultTheme } from "@react-navigation/native";

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#41A550",
    background: "#0F281E",
    card: "#FFFFFF",
    text: "#575c57",
    border: "#D8DAD8",
    notification: "#14412D",
    grayLigth: "#EFF0EF",
  },
};

export default Theme;
