import { Category, Restaurant } from 'app/common/interfaces'
import { useService } from 'app/contexts/Service'
import {
  getRestaurantCategories,
  getRestaurantList
} from 'app/service/restaurant.api'
import { useEffect, useState } from 'react'

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { clientApi } = useService()

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true)
      const data = await getRestaurantCategories(clientApi)
      setCategories(data)
      setIsLoading(false)
    }
    getCategories()
  }, [])

  return { categories, isLoading }
}

export const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { clientApi } = useService()

  useEffect(() => {
    const getRestaurants = async () => {
      setIsLoading(true)
      const data = await getRestaurantList(clientApi)
      setRestaurants(data)
      setIsLoading(false)
    }
    getRestaurants()
  }, [])

  return { restaurants, isLoading }
}
