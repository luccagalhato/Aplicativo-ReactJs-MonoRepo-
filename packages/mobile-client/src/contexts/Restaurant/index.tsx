import {
  Catalog,
  CategorizedRestaurant,
  Product,
  Restaurant
} from 'app/common/interfaces'
import {
  getRestaurantById,
  getRestaurantCatalogs,
  getRestaurantsCategorized
} from 'app/service/restaurant.api'
import React, { createContext, ReactChild, useContext } from 'react'
import { useAuth } from '../Auth'
import { useService } from '../Service'

interface RestaurantProviderProps {
  children: ReactChild
}

interface RestaurantContextData {
  getRestaurant(id: string): Promise<void>
  setProduct(product: Product): void
  isLoading: boolean
  restaurant: Restaurant | null
  catalogs: Catalog[]
  product?: Product
  categorizedRestaurants: CategorizedRestaurant
}

const RestaurantContext = createContext<RestaurantContextData>(
  {} as RestaurantContextData
)

const RestaurantProvider = ({ children }: RestaurantProviderProps) => {
  const [categorizedRestaurants, setCategorizedRestaurants] =
    React.useState<CategorizedRestaurant>({})
  const [restaurant, setRestaurant] = React.useState<Restaurant | null>(null)
  const [catalogs, setCatalogs] = React.useState<Catalog[]>([])
  const [product, setProduct] = React.useState<Product>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { partnerApi, clientApi } = useService()
  const { signed } = useAuth()

  React.useEffect(() => {
    if (!signed) return
    getRestaurantsCategorized(clientApi).then(setCategorizedRestaurants)
  }, [signed])

  async function handleGetRestaurant(id: string) {
    setIsLoading(true)
    const restaurant = await getRestaurantById(partnerApi, id)
    if (restaurant) {
      setRestaurant(restaurant)
      if (restaurant.id) {
        const catalogs = await getRestaurantCatalogs(partnerApi, restaurant.id)
        setCatalogs(catalogs)
      }
    }
    setIsLoading(false)
  }

  return (
    <RestaurantContext.Provider
      value={{
        getRestaurant: handleGetRestaurant,
        setProduct,
        isLoading,
        categorizedRestaurants,
        restaurant,
        catalogs,
        product
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

const useRestaurant = () => {
  const context = useContext(RestaurantContext)

  if (!context) {
    throw new Error('useRestaurant must be used within an RestaurantProvider')
  }

  return context
}

export { RestaurantProvider, useRestaurant }
