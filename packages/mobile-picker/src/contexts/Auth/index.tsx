import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponse } from "apisauce";
import React, {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useState
} from "react";
import { Collaborator, UserRegistration } from "../../common/interfaces";
import { authenticationUser } from "../../service/authentication.api";
import { clientApi } from "../../service/client.api";
import { geolocationApi } from "../../service/geolocation.api";
import { setToken } from "../../service/helpers";

const STORAGE_KEY_ACCESS_TOKEN = '@PickerAuth:accessToken'
const STORAGE_KEY_ID_TOKEN = '@PickerAuth:idToken'
const STORAGE_KEY_USER = '@PickerAuth:user'

interface AuthProviderProps {
  children: ReactChild;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  userData: {
    accessToken: string;
    idToken: string;
    deliveryMan: Collaborator;
  } | null;
  signIn(
    user: UserRegistration
  ): Promise<ApiResponse<AuthContextData["userData"]>>;
  signOut(): Promise<void>;
  setUserData(data: AuthContextData["userData"]): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<AuthContextData["userData"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedAccessToken = await AsyncStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
      const storagedIdToken = await AsyncStorage.getItem(STORAGE_KEY_ID_TOKEN);
      const storagedUser = await AsyncStorage.getItem(STORAGE_KEY_USER);

      if (storagedAccessToken && storagedIdToken) {
        setUserData({
          accessToken: storagedAccessToken,
          idToken: storagedIdToken,
          deliveryMan: storagedUser ? JSON.parse(storagedUser) : null,
        });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  useEffect(() => {
    if (userData?.accessToken && userData.idToken) {
      setToken(clientApi, userData.accessToken, userData.idToken);
      setToken(geolocationApi, userData.accessToken, userData.idToken);
    }
  }, [userData]);

  function handleSetUserData(data: AuthContextData["userData"]) {
    if (data) {
      setUserData((past) => ({ ...past, ...data }));
    } else {
      setUserData(null);
    }
  }

  async function signIn(user: UserRegistration) {
    const response = await authenticationUser(user);
    let userData: AuthContextData['userData'] = null
    if (response.ok) {
      let { accessToken, idToken, deliveryMan } = response.data
      accessToken = accessToken.jwtToken
      idToken = idToken.jwtToken
      userData = { accessToken, idToken, deliveryMan }
      await AsyncStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(STORAGE_KEY_ID_TOKEN, idToken);
      await AsyncStorage.setItem(STORAGE_KEY_USER, deliveryMan || '');
    }
    setUserData(userData)
    return response;
  }

  async function signOut() {
    setUserData(null);
    await AsyncStorage.multiRemove([
      STORAGE_KEY_ACCESS_TOKEN,
      STORAGE_KEY_ID_TOKEN,
      STORAGE_KEY_USER,
    ]);
  }


  return (
    <AuthContext.Provider
      value={{
        signed: userData && userData.accessToken ? true : false,
        userData,
        signIn,
        signOut,
        loading,
        setUserData: handleSetUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
