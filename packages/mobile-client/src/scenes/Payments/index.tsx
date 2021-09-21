import { Icon } from '@ant-design/react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Button from 'app/common/components/Button';
import { usePayment } from 'app/contexts/Payment';
import { CreditCard } from 'app/common/interfaces/payment.interface';

const Payments = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { creditCards, handleSetCreditCardId } = usePayment();

  function handleClickCard(id: string) {
    handleSetCreditCardId(id);
    navigation.goBack();
  }

  function renderCreditCard({ item }: ListRenderItemInfo<CreditCard>) {
    return (
      <TouchableOpacity onPress={() => handleClickCard(item.creditCardId)}>
        <View style={styles.item}>
          <Icon name="credit-card" color={colors.primary} />
          <Text style={styles.text}>Cartão de crédito</Text>
          <Text style={[styles.text, styles.digits]}>**** {item.last4CardNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function handleNavigateToAddPayment() {
    return navigation.navigate("AddPaymentMethod");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={creditCards}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCreditCard}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Button onPress={handleNavigateToAddPayment}>Adicionar novo</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
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
  text: {
    fontFamily: "Sora",
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 10,
  },
  digits: {
    fontFamily: "Sora-SemiBold",
  },
  separator: {
    borderColor: "#EFF0EF",
    borderTopWidth: 1,
  },
});

export default Payments;
