import { Icon, List } from "@ant-design/react-native";
import { useNavigation, useTheme, useRoute } from "@react-navigation/native";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Loc from "expo-location";
import { useDebounce } from "use-debounce";

import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import {
  updateClientGoogleLocation,
  updateClientLatLon,
} from "../../service/client.api";
import { GoogleMapsAddress, LatLng } from "../../common/interfaces";
import { getValueByKeyInPayload } from "../../service/helpers";
import { getGoogleMapsAddress } from "../../service/geolocation.api";
import { useAuth } from "../../contexts/Auth";

const Location = () => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { name: routeName } = useRoute();

  const { userData, setUserData } = useAuth();

  const handleSubmit = useCallback(async () => {}, []);

  const { Item } = List;
  const { Brief } = Item;

  const [addressValue, setAddressValue] = useState("");
  const [count, setCount] = useState(0);
  const [debouncedAddress] = useDebounce<string>(addressValue, 1000);

  const [location, setLocation] = useState<GoogleMapsAddress[]>([]);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedAddress) return;
    const getLoc = async () => {
      setCount(count + 1);
      if (userData?.accessToken && userData.idToken) {
        const resp = await getGoogleMapsAddress(debouncedAddress);

        if (!resp.ok) return;

        if (resp.data) {
          setLocation(resp.data);
        }
      }
    };
    getLoc();
  }, [debouncedAddress]);

  const handlerSaveLocation = async (googleMapsAddress: GoogleMapsAddress) => {
    if (userData?.accessToken && userData.idToken) {
      const id = getValueByKeyInPayload("username", userData.accessToken);
      const savedLocation = await updateClientGoogleLocation(
        id!,
        googleMapsAddress
      );
      if (savedLocation.ok && savedLocation.data) {
        setUserData({
          ...userData,
          client: {
            ...userData.client,
            delivery_address: [
              ...(userData?.client?.delivery_address ?? []),
              savedLocation.data,
            ],
          },
        });
        return navigation.navigate(
          routeName === "AddLocation"
            ? "AddLocationSurname"
            : "LocationSurname",
          {
            address: savedLocation.data,
            goToPage: "MyAddresses",
          }
        );
      }
    }

    return null;
  };

  const saveAppLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Loc.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMessage("Sem permissão");
        Alert.alert(errMessage);
      }

      const currLocation = await Loc.getCurrentPositionAsync({});

      const latlon: LatLng = {
        lat: currLocation.coords.latitude,
        lng: currLocation.coords.longitude,
      };

      if (!userData?.accessToken && !userData?.idToken) {
        throw new Error("Não foi possível carregar os dados do usuário");
      }

      const id = getValueByKeyInPayload("username", userData.accessToken);

      const savedLocation = await updateClientLatLon(id!, latlon);
      // TODO: Para testar a tela é só comentar acima e descomentar abaixo
      // const savedLocation = {
      //   ok: true,
      //   data: {
      //     place_id: "1",
      //     street: "Rua São Paulo",
      //     number: "290",
      //     latitude: latlon.lat,
      //     longitude: latlon.lng,
      //     surname: "Home",
      //   },
      // };

      if (!savedLocation.ok) {
        throw new Error(savedLocation.originalError as unknown as string);
      }

      if (!savedLocation.data) {
        return;
      }

      setUserData({
        ...userData,
        client: {
          ...userData.client,
          delivery_address: [
            ...(userData?.client?.delivery_address ?? []),
            savedLocation.data,
          ],
        },
      });

      navigation.navigate(
        routeName === "AddLocation" ? "AddLocationSurname" : "LocationSurname",
        {
          address: savedLocation.data,
          goToPage: "MyAddresses",
        }
      );
    } catch (error) {
      Alert.alert(error.message ?? "Algo deu Errado ao salvar localização!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderTopLeftRadius: routeName === "Location" ? 30 : 0,
        borderTopRightRadius: routeName === "Location" ? 30 : 0,
        padding: 24,
        marginTop: routeName === "Location" ? 26 : 0,
        position: "relative",
      }}
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Input
          name="location"
          returnKeyType="search"
          icon={
            <Icon
              name="search"
              style={{ position: "absolute", top: 15, left: 8 }}
            />
          }
          iconSide="left"
          placeholder="Buscar endereço e número"
          onChangeText={setAddressValue}
          clearButtonMode="always"
        />
        <ScrollView alwaysBounceVertical>
          <List style={{ justifyContent: "flex-start" }}>
            {location.map((item) => (
              <Item
                key={item.place_id}
                align="top"
                multipleLine
                onPress={() => handlerSaveLocation(item)}
              >
                {item.primary_address} <Brief>{item.secundary_address}</Brief>
              </Item>
            ))}
          </List>
        </ScrollView>
        <Button
          backgroundColor={colors.primary}
          color={colors.card}
          icon="environment"
          onPress={() => {
            saveAppLocation();
          }}
          loading={loading}
        >
          Usar minha localização
        </Button>
      </Form>
    </View>
  );
};

export default Location;
