import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const StoriesCategories = () => {
  const categories = [
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Brasileira",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Brasileira",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Brasileira",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Brasileira",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Japonesa",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      name: "Mineira",
    },
    {
      image:
        "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",

      url: "Gaúcha",
    },
  ];

  return (
    <ScrollView horizontal={true} style={{ flex: 1, backgroundColor: "#fff" }}>
      {categories.map((item, index) => (
        <>
          <View style={{ width: 85, padding: 5 }}>
            {console.log(item)}

            <ImageBackground
              imageStyle={{ borderRadius: 100, backgroundColor: "#333" }}
              source={{ uri: item.name }}
              style={styles.imageCategory}
            ></ImageBackground>
          </View>
        </>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageCategory: {
    height: 30,
    width: 30,
    marginRight: 12,
  },

  categoryText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#FFFFFF",
    flexGrow: 0,
  },
});

export default StoriesCategories;
