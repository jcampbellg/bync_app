import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account } from '../../utils/dbTypes'

type QueryProps = Omit<UseQueryOptions<{ accounts: Account[] }>, 'queryKey' | 'queryFn'>

export default function useAccountsQuery(props: QueryProps = {}) {
  const { key, baseUrl, isLogin } = useRoot()

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
        console.error(`error in useAccountsQuery`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    enabled: !!isLogin,
    ...props
  })

  return query
}