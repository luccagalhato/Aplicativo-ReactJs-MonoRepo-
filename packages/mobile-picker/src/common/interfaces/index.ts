import { IconNames } from "@ant-design/react-native/lib/icon";

export * from "./user.interfaces";

export interface GoogleMapsAddress {
  primary_address: string;
  secundary_address: string;
  place_id: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface ProfileItemLink {
  title: string;
  onPress: () => void;
  iconName: IconNames;
}
export interface OrderItems {
  name: string;
  id: string;
  value: number;
  garnishes: { name: string; quantity: number }[];
}

export interface OrderData {
  status: string;
  orderId: string;
  address: string;
  deliveryFee: number;
  total: number;
  subtotal: number;
  paymentInfo: { method: string; info: string };
  deliveryman: { name: string; id: string };
  orderItems: OrderItems[];
}

export interface Collaborator {
  id?: string;
  geoKey?: number;
  rangeKey?: string;
  geoJson: string;
  geoHash: number;
  first_name: string;
  last_name: string;
  latitude?: number;
  longitude?: number;
  is_available: boolean;
  is_online: boolean;
  radius: number;
  contact: {
    email: string;
    phone: string;
  };
}
