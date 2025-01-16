import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account } from '../../utils/dbTypes'

export type AccountGetData = {
  account: Account
}

type QueryProps = Omit<UseQueryOptions<AccountGetData>, 'queryKey' | 'queryFn'>

export default function useAccountQuery(id: number, props: QueryProps = {}) {
  const { key, baseUrl, isLogin } = useRoot()

  const query = useQuery({
    queryKey: ['account', id],
    queryFn: async () => {
      const url = baseUrl + `/api/account/${id}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountQuery`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    enabled: !!isLogin,
    ...props,
  })

  return query
}