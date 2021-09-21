import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const AddressHeader = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { name: routeName } = useRoute();

  // const { userData } = useAuth();
  // const address = useMemo(
  //   () =>
  //     userData?.client.delivery_address.find(
  //       (addressItem) =>
  //         addressItem.place_id === userData.client.default_place_id
  //     ),
  //   [userData]
  // );
  const address = {
    surname: '',
    street: '',
    number: '',
  }

  function handleNavigateToMyAddress() {
    // return navigation.navigate("MyAddresses");
    return navigation.navigate("HomePicker");
  }

  useEffect(() => {
    if (routeName !== "Home") {
      navigation.setOptions({
        headerTitleStyle: { marginHorizontal: 25 },
        headerTitleContainerStyle: { left: 45 },
      });
    }
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handleNavigateToMyAddress}
    >
      <Text
        style={{
          textAlignVertical: "center",
          fontFamily: "Sora-SemiBold",
          fontSize: 14,
          lineHeight: 22,
          color: "#252725",
          marginLeft: 0,
        }}
      >
        {address.surname ??
          `${address.street}${address.number ? `, ${address.number}` : ""}`}
      </Text>
      <Feather
        name="chevron-down"
        size={14}
        color={colors.primary}
        style={{ marginLeft: 2, marginTop: 2 }}
      />
    </TouchableWithoutFeedback>
  );
};

export default AddressHeader;
