import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button as AntButton, Icon } from '@ant-design/react-native';

import { useAuth } from 'app/contexts/Auth';

const Home = () => {
  const { userData } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  function goTo(url: string) {
    return () => navigation.navigate(url);
  }

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                borderRadius: 100,
                backgroundColor: "#333",
                width: 40,
                height: 40,
                marginTop: 15,
                marginLeft: "5%",
              }}
            />
            <Text style={styles.name}>{userData?.client?.first_name},</Text>
            <Text style={styles.bomdia}> bom dia :)</Text>
          </View>

          <View style={{ alignSelf: "center", marginHorizontal: "6%" }}>
            <Text style={styles.textWelcome}>
              Encontre o que faz bem para seu corpo, mente e alma. Para você,
              friends e lovers! São mais de 200 parceiros: restaurantes, beauty,
              hortifruti, presentes, serviços, farmácia e muito mais!
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              height: 80,
              alignSelf: "center",
              marginHorizontal: "9%",
            }}
          >
            <Text style={styles.textBold}>
              Explore e aproveite, você está em casa.
            </Text>

            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={goTo("RestaurantRoutes")}>
                <Image source={require("assets/DeliveryHome.png")} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={require("assets/AssinaturaHome.png")} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={require("assets/RedeSocialHome.png")} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: "5%",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity>
                <Image source={require("assets/ServicosHome.png")} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("assets/KindleHome.png")} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("assets/GrifeHome.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", marginTop: 260 }}>
            <Image
              style={{ flex: 1, width: "100%", resizeMode: "cover" }}
              source={require("assets/banner-comunidade.png")}
            />
            <View
              style={{
                position: "absolute",
                marginTop: "7%",
                marginLeft: "8%",
              }}
            >
              <Text style={styles.textComunidadeTodo}>Comunidade To Do</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                top: -135,
                marginLeft: 10,
              }}
            >
              <View style={{ marginRight: 15 }}>
                <Image source={require("assets/AcaoSocialHome.png")} />
              </View>

              <View style={{ marginRight: 15 }}>
                <Image
                  source={require("assets/DesenvJovensHome.png")}
                />
              </View>

              <View style={{ marginRight: 15 }}>
                <Image
                  source={require("assets/SustentabilidadeHome.png")}
                />
              </View>
            </View>
          </View>
          <AntButton
            style={{
              backgroundColor: "#41A550",
              alignSelf: "center",
              width: 335,
              height: 62,
              borderRadius: 12,
              top: -50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Icon
                style={{ justifyContent: "center" }}
                size="lg"
                color="white"
                name="instagram"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#14412d",
                  fontFamily: "Sora-Bold",
                }}
              >
                Conecte-se com a gente
              </Text>
            </View>
          </AntButton>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    alignSelf: "flex-end",
    marginLeft: 10,
    marginBottom: 10,
    color: "#41A550",
    fontFamily: "Sora-Bold",
  },
  bomdia: {
    color: "#000",
    alignSelf: "flex-end",
    marginBottom: 10,
    fontFamily: "Sora-Bold",
  },
  textWelcome: {
    fontFamily: "Sora",
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "normal",
    marginTop: 30,
    color: "#575c57",
  },
  textBold: {
    fontSize: 14,
    fontFamily: "Sora-Bold",
    fontWeight: "600",
    lineHeight: 22,
  },
  textComunidadeTodo: {
    fontFamily: "Sora-Bold",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
    alignItems: "center",
    color: "#252725",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#41A550",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginHorizontal: 20,
  },
  modalText: {
    marginBottom: 30,
    fontSize: 16,
    fontFamily: "Sora",
    lineHeight: 22,
    textAlign: "center",
    color: "#575C57",
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    lineHeight: 24,
    textAlign: "center",
  },
});

export default Home;
