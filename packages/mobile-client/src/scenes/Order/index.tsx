import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import OrderTracking from './OrderTracking';
import OrderRating from './OrderRating';
import OrderCanceled from './OrderCanceled';

import { OrderStatus } from 'app/common/enums';
import { usePayment } from 'app/contexts/Payment';
import { useCart } from 'app/contexts/Cart';
import { Order as IOrder } from 'app/common/interfaces/order.interface';
import { FindOneOrder } from 'app/service/orders.api';

const mockOrder = {
  status: "DELIVERED",
  orderId: "w5sw1w6s15",
  address: "Rua São Paulo, 300",
  deliveryFee: 10.0,
  total: 67.8,
  subtotal: 57.8,
  paymentInfo: { method: "credit_card", info: "8100" },
  deliveryman: { name: "Nome do Entregador", id: "5w54we" },
  orderItems: [
    {
      name: "Salada de abacate",
      id: "wd5d54wd",
      value: 28.9,
      garnishes: [
        { name: "pequeno", quantity: 1 },
        { name: "mostarde e mel", quantity: 1 },
        { name: "tomate", quantity: 1 },
      ],
    },
    {
      name: "Suco de laranja",
      id: "ef4ef5",
      value: 28.9,
      garnishes: [
        { name: "médio", quantity: 1 },
        { name: "gelo", quantity: 1 },
      ],
    },
  ],
};

const Order = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const { createOrder } = usePayment();
  const { cart } = useCart();
  useEffect(() => {
    const createMyOrder = async () => {
      const response = await createOrder({ items: cart });
      setOrder(response.data);
    };
    createMyOrder();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (order !== null) {
        const updateOrder = async () => {
          const response = await FindOneOrder({id: order.id!});
          setOrder(response.data);
        };
        updateOrder();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const statusFromBack = order?.status as keyof typeof OrderStatus;
  const orderStatus = OrderStatus[statusFromBack];
  const orderData = mockOrder;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {orderStatus <= OrderStatus.DELIVERED && (
        <OrderTracking orderStatus={orderStatus} orderData={orderData} />
      )}
      {orderStatus === OrderStatus.CONFIRMED && (
        <OrderRating orderStatus={orderStatus} orderId={orderData.orderId} />
      )}
      {orderStatus === OrderStatus.CANCELED && <OrderCanceled />}
    </View>
  );
};

export default Order;
