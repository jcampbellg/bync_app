import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useApp } from '../../screens/Root'
import { AccountWithBalances } from '../../utils/dbTypes'

export type AccountsGetData = {
  accounts: AccountWithBalances[]
}

type QueryProps = Omit<UseQueryOptions<AccountsGetData>, 'queryKey' | 'queryFn'>

export default function useAccountQuery(props: QueryProps = {}) {
  const { key, baseUrl, isLogin, setState } = useApp()

  const query = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const url = baseUrl + '/api/account'

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(error)
        return Promise.resolve([])
      }
      const data = await response.json()
      return data
    },
    enabled: !!isLogin,
    ...props
  })

  return query
}