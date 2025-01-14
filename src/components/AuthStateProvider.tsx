import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Account } from '../utils/dbTypes'
import useAccountQuery from '../apis/account/useAccountQuery'

const initialValue = {
  accountSelected: null as Account | null
}

type AuthState = typeof initialValue

type AuthStateContext = AuthState & {
  setState: Dispatch<Partial<AuthState>>
  accountQuery: ReturnType<typeof useAccountQuery>
}

const Context = createContext<undefined | AuthStateContext>(undefined)

const reducer = (prev: AuthState, next: Partial<AuthState>) => {
  return { ...prev, ...next }
}

export default function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useReducer(reducer, initialValue)

  const accountQuery = useAccountQuery()

  const value: AuthStateContext = {
    ...state,
    setState,
    accountQuery
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
    throw new Error('useApp must be used within AuthStateProvider')
  }
  return context
}