import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconOutline, IconFill } from "@ant-design/icons-react-native";

const Banner = () => {
  const navigation = useNavigation();
  const images = [
    {
      url: "https://i.ibb.co/GpKrTjK/Rectangle-2.png",
      restaurant: "Restaurante da esquina",
      list: "$$ ⋅ Lista de categorias",
      category: "Brasileira",
      time: "30",
      points: "5",
      price: "30,50",
    },
    {
      url: "https://i.ibb.co/GpKrTjK/Rectangle-2.png",
      restaurant: "Restaurante da cidade",
      list: "$$ ⋅ Lista de categorias",
      category: "Americana",
      time: "40",
      points: "5",
      price: "30,50",
    },
    {
      url: "https://i.ibb.co/GpKrTjK/Rectangle-2.png",
      restaurant: "Restaurante do estado",
      category: "Brasileira",
      list: "$$ ⋅ Lista de categorias",
      time: "50",
      points: "5",
      price: "30,50",
    },
    {
      url: "https://i.ibb.co/GpKrTjK/Rectangle-2.png",
      restaurant: "Restaurante do governo",
      category: "Brasileira",
      list: "$$ ⋅ Lista de categorias",
      time: "600",
      points: "5",
      price: "30,50",
    },
  ];

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {images.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant")}
          key={`${2 * 3.141516 * index ** 2}`}
        >
          <View>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            <ImageBackground
              imageStyle={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              source={{ uri: item.url }}
              style={styles.imageCategory}
            >
              <View style={styles.category}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            </ImageBackground>
            <Text style={styles.title}>{item.restaurant}</Text>
            <Text style={styles.list}>{item.list}</Text>
            <View style={styles.values}>
              <IconOutline
                name="clock-circle"
                style={{ color: "green", alignSelf: "center" }}
              />
              <Text style={styles.time}>{item.time}min</Text>
              <IconFill
                name="star"
                style={{ color: "green", alignSelf: "center" }}
              />
              <Text style={styles.time}>{item.points}</Text>
              <Text style={styles.time}>R${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageCategory: {
    height: 152,
    width: 291,
    marginRight: 12,
  },
  imageClock: {
    height: 16,
    width: 16,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 16,
  },
  values: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 20,
  },
  category: {
    flexDirection: "column",
    alignItems: "center",
    width: 113,
    height: 24,
    left: 8,
    top: 9,
    backgroundColor: "#41A550",
    borderRadius: 100,
  },
  categoryText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    flexGrow: 0,
  },
  list: {
    fontFamily: "Sora",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 20,
    color: "#575C57",
  },
  time: {
    marginRight: 18,
    backgroundColor: "#EDF9ED",
    borderRadius: 2,
  },
  categoryTitle: {
    fontFamily: "Sora-Bold",
    fontSize: 20,
    paddingVertical: 30,
  },
});

export default Banner;
