import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useFilters } from "../../../contexts/Filters";
import { OrderBy } from "../../enums";
import Button from "../Button";
import Chip from "../Chip";
import Radio from "../Radio";
import Range from "../Range";

const Filters = (): JSX.Element => {
  const { colors } = useTheme();
  const { filters, setFilters, cleanFilters, toggleFiltersBox } = useFilters();

  const [viewAll, setViewAll] = useState(false);

  function handleChangeOrderBy(registerFieldName: OrderBy) {
    setFilters({
      orderBy: registerFieldName,
    });
  }

  function handleSetFromValue(value: number) {
    setFilters({
      time_of_delivery: {
        ...filters.time_of_delivery,
        min: value,
      },
    });
  }

  function handleSetToValue(value: number) {
    setFilters({
      time_of_delivery: {
        ...filters.time_of_delivery,
        max: value,
      },
    });
  }

  function handleAddChip(value: string) {
    const actualFilters = [...filters.categories]
      .sort((a, b) => a.value.localeCompare(b.value))
      .map((category) => {
        if (category.value === value) {
          return {
            ...category,
            selected: true,
          };
        }

        return category;
      });
    setFilters({
      categories: actualFilters
        .filter((category) => category.selected)
        .concat(actualFilters.filter((category) => !category.selected)),
    });
  }

  function handleRemoveChip(value: string) {
    const actualFilters = [...filters.categories]
      .sort((a, b) => a.value.localeCompare(b.value))
      .map((category) => {
        if (category.value === value) {
          return {
            ...category,
            selected: false,
          };
        }

        return category;
      });
    setFilters({
      categories: actualFilters
        .filter((category) => category.selected)
        .concat(actualFilters.filter((category) => !category.selected)),
    });
  }

  function handleFilterClick() {
    toggleFiltersBox(false);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          position: "relative",
        }}
      >
        <Text
          style={{
            flex: 1,
          }}
        />
        <Text
          style={{
            fontFamily: "Sora-SemiBold",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            flex: 2,
          }}
        >
          Filtrar
        </Text>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={cleanFilters}>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: colors.primary,
                fontFamily: "Sora-SemiBold",
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              Limpar
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            textAlign: "left",
            color: "black",
            fontFamily: "Sora-SemiBold",
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Ordenar por
        </Text>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.RECOMMENDED}
              onChange={handleChangeOrderBy}
              name={OrderBy.RECOMMENDED}
              title="Recomendados"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.MOST_POPULAR}
              onChange={handleChangeOrderBy}
              name={OrderBy.MOST_POPULAR}
              title="Mais Populares"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.RATING}
              onChange={handleChangeOrderBy}
              name={OrderBy.RATING}
              title="Avaliação"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.TIME_OF_DELIVERY}
              onChange={handleChangeOrderBy}
              name={OrderBy.TIME_OF_DELIVERY}
              title="Tempo de entrega"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.PRICE}
              onChange={handleChangeOrderBy}
              name={OrderBy.PRICE}
              title="Preço"
            />
          </View>
          <View style={{ width: "50%" }}>
            <Radio
              checked={filters.orderBy === OrderBy.PRICE_OF_DELIVERY}
              onChange={handleChangeOrderBy}
              name={OrderBy.PRICE_OF_DELIVERY}
              title="Preço da entrega"
            />
          </View>
        </View>
      </View>
      <View style={[styles.row, { justifyContent: "flex-start" }]}>
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            color: "black",
            fontFamily: "Sora-SemiBold",
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Categorias
        </Text>
        {filters.categories.length && (
          <FlatList
            data={viewAll ? filters.categories : filters.categories.slice(0, 9)}
            style={{
              flexGrow: 0,
              maxHeight: 180,
            }}
            nestedScrollEnabled
            persistentScrollbar
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Chip
                key={item.value}
                title={item.name}
                selected={item.selected}
                value={item.value}
                handleRemove={handleRemoveChip}
                handleAdd={handleAddChip}
              />
            )}
            numColumns={3}
            extraData={
              filters.categories
                .filter((category) => category.selected)
                .map((category) => category.value)[0]
            }
            ListFooterComponent={
              filters.categories.length > 9 && !viewAll ? (
                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                  <TouchableWithoutFeedback
                    onPress={() => setViewAll(true)}
                    style={{ flexDirection: "row" }}
                  >
                    <Text style={{ color: "#979797" }}>Ver tudo</Text>
                    <Feather
                      name="chevron-down"
                      size={14}
                      color={colors.primary}
                      style={{ marginLeft: 2, marginTop: 2 }}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ) : null
            }
          />
        )}
      </View>
      <View style={styles.row}>
        <Text
          style={{
            flex: 1,
            textAlign: "left",
            color: "black",
            fontFamily: "Sora-SemiBold",
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Tempo de entrega
        </Text>
        <Range
          setFromValue={handleSetFromValue}
          setToValue={handleSetToValue}
          initialFromValue={filters.time_of_delivery.min}
          initialToValue={filters.time_of_delivery.max}
          min={20}
          max={90}
        />
      </View>
      <View>
        <Button onPress={handleFilterClick}>Filtrar</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  row: {
    marginBottom: 27,
  },
});

export default Filters;
