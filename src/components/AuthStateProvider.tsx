import { createContext, Dispatch, useContext, useReducer } from 'react'
import useAccountsQuery from '../apis/account/useAccountsQuery'

const initialValue = {
  currencySelected: null as string | null,
  showBalance: true,
  timespan: 'this month' as 'this month' | 'last two months' | 'this year',
}

type AuthState = typeof initialValue

type AuthStateContext = AuthState & {
  setState: Dispatch<Partial<AuthState>>
  accountsQuery: ReturnType<typeof useAccountsQuery>
}

const Context = createContext<undefined | AuthStateContext>(undefined)

const reducer = (prev: AuthState, next: Partial<AuthState>) => {
  return { ...prev, ...next }
}

export default function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useReducer(reducer, initialValue)

  const accountsQuery = useAccountsQuery()

  const value: AuthStateContext = {
    ...state,
    setState,
    accountsQuery
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export function useAuthState() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useAuthState must be used within AuthStateProvider')
  }
  return context
}