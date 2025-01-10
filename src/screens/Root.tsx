import EncryptedStorage from 'react-native-encrypted-storage'
import { useShallowEffect } from '@mantine/hooks'
import { ActivityIndicator, View } from 'react-native'
import { createContext, Dispatch, useContext, useReducer } from 'react'
import { colors } from '../utils/constants'

const initialValue = {
  baseUrl: null as string | null,
  key: null as string | null,
  isLogin: false,
  isLoading: true,
  isError: false
}

type State = typeof initialValue

type RootContext = State & {
  setState: Dispatch<Partial<State>>
  login: (baseUrl: string, key: string) => void
  logout: () => void
}

const Context = createContext<undefined | RootContext>(undefined)

const reducer = (prev: State, next: Partial<State>) => {
  return { ...prev, ...next }
}

export default function Root({ children }: { children: React.ReactNode }) {
  const [state, setState] = useReducer(reducer, initialValue)

  const loadUserOnStart = async () => {
    console.log('loadUserOnStart')
    // on App Start
    try {
      const baseUrl = await EncryptedStorage.getItem('baseUrl')
      const key = await EncryptedStorage.getItem('key')

      setState({
        baseUrl,
        key,
        isLoading: false,
        isLogin: !!baseUrl && !!key,
        isError: false
      })
    } catch (error) {
      console.log('Error saving getting data from storage', error)
      setState({
        baseUrl: null,
        key: null,
        isLoading: false,
        isLogin: false,
        isError: true
      })
    }
  }

  const login = async (baseUrl: string, key: string) => {
    try {
      await EncryptedStorage.setItem('baseUrl', baseUrl)
      await EncryptedStorage.setItem('key', key)
      setState({
        baseUrl,
        key,
        isLogin: true
      })
    } catch (error) {
      console.log('Error saving data to storage', error)
      setState({
        baseUrl: null,
        key: null,
        isLoading: false,
        isLogin: false,
        isError: true
      })
    }
  }

  const logout = async () => {
    setState({
      baseUrl: null,
      key: null,
      isLogin: false
    })
  }

  useShallowEffect(() => {
    loadUserOnStart()
  }, [{ a: 1 }])

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator size='large' color={colors.black} />
      </View>
    )
  }

  return (
    <Context.Provider value={{ ...state, setState, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export function useApp() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useApp must be used within Root')
  }
  return context
}