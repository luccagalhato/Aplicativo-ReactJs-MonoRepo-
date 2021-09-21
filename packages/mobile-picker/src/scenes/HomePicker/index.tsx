import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RoundIcon from "../../common/components/RoundIcon";
import OrderDelivered from "../../../assets/orderInProgress.svg";
import TabBar from "../../common/components/TabBar";
import { useAuth } from "../../contexts/Auth";

const HomePicker: React.FC = () => {
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { signOut } = useAuth()

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isEnabled ? (
        <View style={styles.topo}>
          <Text style={styles.title}>Você está ativo</Text>
          <Switch
            style={{ alignSelf: "center" }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      ) : (
        <View style={styles.topoInativo}>
          <Text style={styles.title}>Você está Inativo</Text>
          <Switch
            style={{ alignSelf: "center" }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      )}

      <View style={styles.circle}>
        <RoundIcon size="large" svgIcon={OrderDelivered} />
      </View>
      <Text style={styles.subtitle}>Você não possui pedidos </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Delivered")}>
        <Text>Home Marco </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signOut()}><Text>Sair</Text></TouchableOpacity>

      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  topo: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    backgroundColor: "#EDF9ED",
    justifyContent: "space-between",
  },
  topoInativo: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    backgroundColor: "#F5F5F4",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Sora",
    fontSize: 14,
    alignSelf: "center",
    justifyContent: "center",
    color: "#252725",
    marginLeft: 19,
  },
  circle: {
    marginTop: 90,
    alignSelf: "center",
    width: 196,
    height: 196,
    borderRadius: 100,
    backgroundColor: "#DAF7DE",
  },
  subtitle: {
    fontFamily: "Sora",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    alignSelf: "center",
    marginVertical: 30,
  },
});

export default HomePicker;
