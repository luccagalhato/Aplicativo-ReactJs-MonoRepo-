import React from 'react';
import { List } from '@ant-design/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { View } from 'react-native';
import Button from 'app/common/components/Button';
import { useAuth } from 'app/contexts/Auth';
import MyAddressItem from './MyAddressItem';

const MyAddresses = () => {
  const { colors } = useTheme();
  
  const navigator = useNavigation();
  
  const { userData, setUserData } = useAuth();

  function handleNavigateToAddLocation() {
    navigator.navigate("AddLocation");
  }

  const onSelectAddress = (default_place_id: string) => {
    setUserData({
      ...userData,
      client: {
        ...userData?.client!,
        default_place_id,
      }
    });
    navigator.navigate("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.card,
      }}
    >
      <List
        style={{
          marginTop: 10,
          justifyContent: "flex-start",
          backgroundColor: colors.card,
        }}
      >
        {userData?.client && userData?.client.delivery_address.map((item) => (
          <MyAddressItem
            key={item.place_id}
            surname={item.surname!}
            street={item.street!}
            number={item.number!}
            onClick={() => onSelectAddress(item.place_id)}
          />
        ))}
      </List>
      <Button
        style={{
          marginEnd: 20,
          marginStart: 20,
          marginBottom: 25,
          backgroundColor: colors.primary,
        }}
        color={colors.card}
        onPress={handleNavigateToAddLocation}
      >
        Adicionar Endereço
      </Button>
    </View>
  );
};

export default MyAddresses;
