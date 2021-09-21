// import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
  // BackHandler,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import {
  FlatList,
  // TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
// import Button from 'app/common/components/Button';
import { DeliveryStatusEnum } from 'app/common/enums';
import { labelsTranslated } from 'app/utils/labels-translated';
import useFetchOrders from './useFetchOrders';

// const PaymentsType: Record<string, string> = {
//   credit_card: "Cartão de crédito",
// };

type RenderItemProps = {
  id: string;
  orderNumber: string;
  status: DeliveryStatusEnum;
  imageUri: string;
  partners: {
    id: string;
    name: string;
  };
};

const OrderHistory = () => {
  // const { colors } = useTheme();
  // const navigation = useNavigation();

  const orders = useFetchOrders();
  function renderItem({ item }: ListRenderItemInfo<RenderItemProps>) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log("teste", item.id)}>
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: item.imageUri }} />
          <View style={styles.infoContainer}>
            <View style={styles.partnerName}>
              <Text style={styles.textName}>{item.partners.name}</Text>
              <Icon
                name="right"
                style={{
                  color: "#41A550",
                  fontSize: 16,
                  fontWeight: "600",
                  padding: 5,
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  ...styles.badge,
                  backgroundColor: handlerBadgeColor(),
                }}
              >
                <Text style={styles.badgeText}>Pedido {item.orderNumber}</Text>
              </View>
              <View
                style={{
                  ...styles.badge,
                  backgroundColor: handlerBadgeColor(item.status),
                }}
              >
                <Text style={styles.badgeText}>
                  {labelsTranslated[item.status]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const handlerBadgeColor = (status: DeliveryStatusEnum | null = null) => {
  switch (status) {
    case DeliveryStatusEnum.DELIVERED:
      return "#DAF7DE";
    case DeliveryStatusEnum.ORDER_CANCELED:
      return "#FFC7CD";
    default:
      return "#EFF0EF";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  partnerName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textName: {
    fontFamily: "Sora-SemiBold",
    fontWeight: "600",
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    height: 75,
    marginStart: 20,
  },
  badge: {
    marginVertical: 2,
    marginEnd: 2,
    justifyContent: "center",
    paddingHorizontal: 8,
    height: 22,
  },
  badgeText: {
    fontSize: 12,
  },
  image: {
    borderRadius: 37.5,
    width: 75,
    height: 75,
    borderWidth: 2,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
  },
  separator: {
    borderColor: "#EFF0EF",
    borderTopWidth: 1,
  },
});

export default OrderHistory;
