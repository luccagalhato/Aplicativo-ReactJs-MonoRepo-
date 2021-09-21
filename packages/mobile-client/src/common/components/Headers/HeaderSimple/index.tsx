import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from 'app/contexts/Cart';

interface HeaderProps {
  title: string;
  rigthButton?: boolean;
}

const HeaderSimple = ({ title, rigthButton = false }: HeaderProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { clearCart, isCartEmpty } = useCart();

  const insets = useSafeAreaInsets();

  const goBack = () => navigation.goBack();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 79,
        paddingTop: insets.top,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: "#EFF0EF",
      }}
    >
      <Icon
        name="arrow-left"
        style={{ color: colors.primary, fontSize: 25 }}
        onPress={goBack}
      />
      <Text
        style={{
          left: 10,
          justifyContent: "space-between",
          margin: "auto",
          fontFamily: "Sora-Bold",
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "600",
          color: "#000",
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: 55,
          alignItems: "center",
        }}
      >
        {!isCartEmpty && rigthButton ? (
          <TouchableWithoutFeedback onPress={clearCart}>
            <Text
              style={{
                right: 0,
                color: colors.primary,
                fontFamily: "Sora-Bold",
                fontSize: 12,
              }}
            >
              Esvaziar
            </Text>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderSimple;
