import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Flex } from "@ant-design/react-native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "../../common/components/Input";
import Button from "../../common/components/Button";
import { updateClientAddressSurname } from "../../service/client.api";
import { getValueByKeyInPayload } from "../../service/helpers";
import { useAuth } from "../../contexts/Auth";
import { Address } from "../../common/interfaces";

type LocationSurnameParamList = {
  LocationSurname: {
    address: Address;
    goToPage?: string;
  };
  AddLocationSurname: LocationSurnameParamList["LocationSurname"];
};

type ProfileScreenRouteProp = RouteProp<
  LocationSurnameParamList,
  "LocationSurname" | "AddLocationSurname"
>;

const LocationSurname = () => {
  const { name: routeName, params } = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation();

  const { address, goToPage } = params;

  const insets = useSafeAreaInsets();

  const formRef = React.useRef<FormHandles>(null);

  const { userData, setUserData } = useAuth();

  const focusOnNextInput = (name: string) => () =>
    formRef.current?.getFieldRef(name).focus();

  const handleUpdateAddressSurname = async (
    delivery_address: Partial<Address>
  ) => {
    if (userData?.accessToken && userData.idToken) {
      const id = getValueByKeyInPayload("username", userData.accessToken);
      const savedLocation = await updateClientAddressSurname(
        id!,
        delivery_address
      );

      if (savedLocation.ok && savedLocation.data) {
        setUserData({
          ...userData,
          client: savedLocation.data,
        });

        return navigation.navigate(goToPage ?? "Wait");
      }
    }

    return null;
  };

  const handleSubmit = async (data: Partial<Address>) => {
    const deliveryAddress = {
      place_id: address.place_id,
      ...data,
    };

    return handleUpdateAddressSurname(deliveryAddress);
  };

  return (
    <KeyboardAvoidingView
      style={[
        { flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom },
        routeName === "AddLocationSurname" ? { paddingTop: 0 } : null,
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={[
          {
            ...styles.container,
            justifyContent: "flex-start",
            overflow: "hidden",
          },
          routeName === "AddLocationSurname"
            ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: 0,
              }
            : null,
        ]}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignSelf: "stretch",
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexGrow: 1,
              flexShrink: 0,
              maxHeight: 182,
              position: "relative",
              width: "100%",
            }}
          >
            <View style={styles.map}>
              <MapView
                region={{
                  latitude: address.latitude!,
                  longitude: address.longitude!,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                minZoomLevel={16}
                style={styles.map}
                scrollEnabled={false}
                pitchEnabled={false}
                zoomEnabled={false}
                zoomTapEnabled={false}
                rotateEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: address.latitude!,
                    longitude: address.longitude!,
                  }}
                  title={`${address.street}${
                    address.number ? `, ${address.number}` : null
                  }`}
                />
              </MapView>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, flex: 1, paddingBottom: 20 }}>
            <View
              style={{
                ...styles.horizontalContainer,
                alignItems: "flex-start",
              }}
            >
              <Feather
                name="map-pin"
                size={14}
                color="#41A550"
                style={{ marginTop: 3, marginRight: 3 }}
              />
              <View>
                <Text style={styles.street}>
                  {[address.street, address.number].filter((n) => n).join(", ")}
                </Text>
                <Text style={styles.secondary}>
                  {[
                    address.district,
                    `${address.city}-${address.state}`,
                    address.country,
                  ]
                    .filter((n) => n)
                    .join(", ")}
                </Text>
              </View>
            </View>
            <Flex>
              <Flex.Item style={{ ...styles.item, flexBasis: "30%" }}>
                <View>
                  <Text style={styles.label}>Número</Text>
                  <Input
                    keyboardType="number-pad"
                    name="number"
                    returnKeyType="next"
                    onSubmitEditing={focusOnNextInput("complement")}
                  />
                </View>
              </Flex.Item>
              <Flex.Item style={{ ...styles.item, flexBasis: "70%" }}>
                <View>
                  <Text style={styles.label}>Complemento</Text>
                  <Input
                    name="complement"
                    returnKeyType="next"
                    onSubmitEditing={focusOnNextInput("reference_point")}
                  />
                </View>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item style={styles.item}>
                <View>
                  <Text style={styles.label}>Ponto de referência</Text>
                  <Input
                    name="reference_point"
                    returnKeyType="next"
                    onSubmitEditing={focusOnNextInput("surname")}
                  />
                </View>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item style={styles.item}>
                <View>
                  <Text style={styles.label}>Salvar endereço como</Text>
                  <Input
                    name="surname"
                    placeholder="Ex.: Casa"
                    returnKeyType="send"
                    onSubmitEditing={formRef.current?.submitForm}
                  />
                </View>
              </Flex.Item>
            </Flex>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Button onPress={formRef.current?.submitForm}>Salvar</Button>
            </View>
          </View>
        </ScrollView>
      </Form>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  street: {
    fontFamily: "Sora",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#252725",
  },
  secondary: {
    color: "#899089",
    fontSize: 12,
    lineHeight: 20,
    fontFamily: "Roboto",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Roboto",
    color: "#252725",
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 20,
  },
});

export default LocationSurname;
