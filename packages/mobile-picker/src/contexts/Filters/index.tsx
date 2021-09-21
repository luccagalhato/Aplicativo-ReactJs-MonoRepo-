import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import { OrderBy } from "../../common/enums";

interface FiltersProviderProps {
  children: ReactChild;
}

interface FiltersContextData {
  filters: {
    orderBy: OrderBy;
    categories: {
      name: string;
      value: string;
      selected: boolean;
    }[];
    time_of_delivery: {
      min: number;
      max: number;
    };
    textSearch?: string;
  };
  cleanFilters(): Promise<void>;
  openFiltersBox: boolean;
  toggleFiltersBox(state?: boolean): void;
  setFilters(data: Record<string, unknown>): void;
}

const DEFAULT_FILTERS = {
  orderBy: OrderBy.RECOMMENDED,
  categories: [
    {
      name: "Brasileira",
      value: "brasilian",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan",
      selected: false,
    },
    {
      name: "Brasileira",
      value: "brasilian2",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan2",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca2",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana2",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan2",
      selected: false,
    },
    {
      name: "Brasileira",
      value: "brasilian3",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan3",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca3",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana3",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan3",
      selected: false,
    },
    {
      name: "Brasileira",
      value: "brasilian4",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan4",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca4",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana4",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan4",
      selected: false,
    },
    {
      name: "Brasileira",
      value: "brasilian5",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan5",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca5",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana5",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan5",
      selected: false,
    },
    {
      name: "Brasileira",
      value: "brasilian6",
      selected: false,
    },
    {
      name: "Vegana",
      value: "vegan6",
      selected: false,
    },
    {
      name: "Carioca",
      value: "carioca6",
      selected: false,
    },
    {
      name: "Baiana",
      value: "baiana6",
      selected: false,
    },
    {
      name: "Japonesa",
      value: "japan6",
      selected: false,
    },
  ].sort((a, b) => a.value.localeCompare(b.value)),
  time_of_delivery: {
    min: 35,
    max: 60,
  },
};

const FiltersContext = createContext<FiltersContextData>(
  {} as FiltersContextData
);

const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filtersData, setFiltersData] =
    useState<FiltersContextData["filters"]>(DEFAULT_FILTERS);
  const [openFiltersBox, setOpenFiltersBox] = useState<boolean>(false);

  function setFilters(data: FiltersContextData["filters"]) {
    setFiltersData((past) => ({ ...past, ...data }));
  }

  async function cleanFilters() {
    await AsyncStorage.removeItem("@ClientFilters:filters");
    setFiltersData(DEFAULT_FILTERS);
  }

  function toggleFiltersBox(state = true) {
    setOpenFiltersBox(state);
    Keyboard.dismiss();
  }

  useEffect(() => {
    async function loadStorageData() {
      const storagedFilters = await AsyncStorage.getItem(
        "@ClientFilters:filters"
      );

      if (storagedFilters) {
        setFiltersData(JSON.parse(storagedFilters));
      }
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@ClientFilters:filters", JSON.stringify(filtersData));
  }, [filtersData]);

  return (
    <FiltersContext.Provider
      value={{
        filters: filtersData,
        cleanFilters,
        openFiltersBox,
        toggleFiltersBox,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

function useFilters() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters must be used within an FiltersProvider.");
  }

  return context;
}

export { FiltersProvider, useFilters };
