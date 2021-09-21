import AsyncStorage from '@react-native-async-storage/async-storage'
import { CartItem } from 'app/common/interfaces/cart.interface'
import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState
} from 'react'
import { IDescription } from '../Payment'

const CART_KEY = '@ClientCart:cart'

interface CartContextData {
  cart: CartItem[] | []
  total: number | 0
  isCartEmpty: boolean
  description: IDescription
  setCartItem(item: CartItem): void
  setDescription(description: IDescription): void
  clearCart(): void
  removeCartItem(id: string): void
}

interface Props {
  children: ReactChild
}

const CartContext = createContext<CartContextData>({} as CartContextData)

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [description, setDescription] = useState<IDescription | undefined>()
  const [total, setTotal] = useState<number>(0)
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true)

  useEffect(() => {
    const updateAsyncStorage = async () => {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart))
    }

    const calcTotal = () => {
      return cart
        .map(item => {
          let total = item.value
          item.optionalItems.map(optional => {
            total += optional.qty * optional.price
          })
          return total * item.qty
        })
        .reduce((a, b) => a + b, 0)
    }

    setTotal(calcTotal())

    setIsCartEmpty(!cart.length)

    updateAsyncStorage()
  }, [cart])

  async function setCartItem(item: CartItem): Promise<void> {
    setCart(old => [...old, item])
  }

  async function removeCartItem(id: string): Promise<void> {
    const filteredCartItems: CartItem[] = cart.filter(
      (item: CartItem) => item.id !== id
    )
    setCart(filteredCartItems)
  }

  async function clearCart(): Promise<void> {
    await AsyncStorage.removeItem(CART_KEY)
    return setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartEmpty,
        total,
        description,
        setDescription,
        setCartItem,
        removeCartItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  return context
}

export { CartProvider, useCart }
