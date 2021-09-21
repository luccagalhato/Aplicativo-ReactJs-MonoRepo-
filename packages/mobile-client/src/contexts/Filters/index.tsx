import AsyncStorage from '@react-native-async-storage/async-storage'
import { Category } from 'app/common/interfaces'
import { getRestaurantCategories } from 'app/service/restaurant.api'
import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState
} from 'react'
import { Keyboard } from 'react-native'
import { OrderBy } from '../../common/enums'
import { useService } from '../Service'

const STORAGE_KEY = '@ClientFilters:filters'

interface FiltersProviderProps {
  children: ReactChild
}

interface FiltersData {
  orderBy: OrderBy
  categories: Category[]
  time_of_delivery: {
    min: number
    max: number
  }
  textSearch?: string
}

interface FiltersContextData {
  filters: FiltersData
  cleanFilters(): Promise<void>
  openFiltersBox: boolean
  toggleFiltersBox(state?: boolean): void
  setFilters(filters: FiltersData): void
}

const DEFAULT_FILTERS: FiltersData = {
  orderBy: OrderBy.RECOMMENDED,
  categories: [],
  time_of_delivery: {
    min: 35,
    max: 60
  },
  textSearch: ''
}

const FiltersContext = createContext<FiltersContextData>(
  {} as FiltersContextData
)

const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filtersData, setFiltersData] = useState<FiltersData>(DEFAULT_FILTERS)
  const [openFiltersBox, setOpenFiltersBox] = useState<boolean>(false)
  const { clientApi } = useService()

  useEffect(() => {
    async function loadStorageData() {
      const storagedFilters = await AsyncStorage.getItem(STORAGE_KEY)
      if (storagedFilters) {
        setFiltersData(JSON.parse(storagedFilters))
      }
    }
    loadStorageData()
  }, [])

  useEffect(() => {
    getRestaurantCategories(clientApi).then(categories => {
      setFiltersData(filters => {
        return { ...filters, categories }
      })
    })
  }, [])

  useEffect(() => {
    if (filtersData) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtersData))
    }
  }, [filtersData])

  function setFilters(filters: FiltersData) {
    setFiltersData(past => ({ ...past, ...filters }))
  }

  async function cleanFilters() {
    await AsyncStorage.removeItem(STORAGE_KEY)
    setFiltersData(DEFAULT_FILTERS)
  }

  function toggleFiltersBox(state = true) {
    setOpenFiltersBox(state)
    Keyboard.dismiss()
  }

  return (
    <FiltersContext.Provider
      value={{
        filters: filtersData,
        cleanFilters,
        openFiltersBox,
        toggleFiltersBox,
        setFilters
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

function useFilters() {
  const context = useContext(FiltersContext)

  if (!context) {
    throw new Error('useFilters must be used within an FiltersProvider.')
  }

  return context
}

export { FiltersProvider, useFilters }
