import { useState, useEffect } from 'react';
import { DeliveryStatusEnum } from 'app/common/enums';

const useFetchOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  // const { userData } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      // const resp = await getOrders(userData?.client.id);
      setOrders(DATA);
    };
    fetchOrders();
  }, []);

  return orders;
};

const DATA = [
  {
    id: "1254464",
    imageUri:
      "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",
    orderNumber: "120235",
    status: DeliveryStatusEnum.ORDER_CANCELED,
    partners: {
      id: "123456",
      name: "China in Box",
    },
  },
  {
    id: "1254465",
    imageUri:
      "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",
    orderNumber: "120236",
    status: DeliveryStatusEnum.DELIVERED,
    partners: {
      id: "123456",
      name: "China in Box",
    },
  },
];

export default useFetchOrders;
