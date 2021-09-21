import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingItem } from "../../common/interfaces/shopping.interface";

const SHOPPING_KEY = "@ClientShopping:bag";

interface ShoppingContextData {
  shoppingBag: ShoppingItem[] | [];
  total: number | 0;
  isEmptyBag: boolean;
  setShoppingItem(item: ShoppingItem): void;
  clearShoppingBag(): void;
  removeShoppingItem(id: string): void;
}

interface Props {
  children: ReactChild;
}

const ShoppingContext = createContext<ShoppingContextData>(
  {} as ShoppingContextData
);

const ShoppingProvider = ({ children }: Props) => {
  const [shoppingBag, setShoppingBag] = useState<ShoppingItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isEmptyBag, setIsEmptyBag] = useState<boolean>(true);

  useEffect(() => {
    const updateAsyncStorage = async () => {
      await AsyncStorage.setItem(SHOPPING_KEY, JSON.stringify(shoppingBag));
    };

    const calcTotal = (): number =>
      shoppingBag.map((item) => item.value).reduce((acc, cur) => cur + acc, 0);

    setTotal(calcTotal());

    setIsEmptyBag(!shoppingBag.length);

    updateAsyncStorage();
  }, [shoppingBag]);

  async function setShoppingItem(item: ShoppingItem): Promise<void> {
    setShoppingBag((oldBag) => [...oldBag, item]);
  }

  async function removeShoppingItem(id: string): Promise<void> {
    const newBag: ShoppingItem[] = shoppingBag.filter(
      (item: ShoppingItem) => item.id !== id
    );
    setShoppingBag(newBag);
  }

  async function clearShoppingBag(): Promise<void> {
    await AsyncStorage.removeItem(SHOPPING_KEY);
    return setShoppingBag([]);
  }

  return (
    <ShoppingContext.Provider
      value={{
        shoppingBag,
        isEmptyBag,
        total,
        setShoppingItem,
        removeShoppingItem,
        clearShoppingBag,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

function useShoppingBag() {
  const context = useContext(ShoppingContext);
  return context;
}

export { ShoppingProvider, useShoppingBag };
