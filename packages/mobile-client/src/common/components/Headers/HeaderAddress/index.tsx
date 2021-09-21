import React, { useMemo, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useAuth } from 'app/contexts/Auth';

const HeaderAddress = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { name: routeName } = useRoute();

  const { userData } = useAuth();

  const address = useMemo(() => {
    const client = userData?.client!;
    return client.delivery_address.find(({ place_id }) => {
      return place_id === client.default_place_id;
    });
  }, [userData]);

  function handleNavigateToMyAddress() {
    navigation.navigate("MyAddresses");
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
    <View style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
    }}>
      <TouchableWithoutFeedback
        style={{
          justifyContent: 'flex-start',
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
          {address?.surname ??
            `${address?.street}${address?.number ? `, ${address.number}` : ""}`}
        </Text>
        <Feather
          name="chevron-down"
          size={14}
          color={colors.primary}
          style={{ marginLeft: 2, marginTop: 2 }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeaderAddress;
