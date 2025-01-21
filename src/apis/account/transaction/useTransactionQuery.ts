import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRoot } from '../../../screens/Root'
import { Transaction } from '../../../utils/dbTypes'

type QueryProps = Omit<UseQueryOptions<{ transaction: Transaction }>, 'queryKey' | 'queryFn'>

export default function useTransactionQuery(id: number, props: QueryProps = {}) {
  const { key, baseUrl, isLogin } = useRoot()

  const query = useQuery({
    queryKey: ['account', id, 'balance'],
    queryFn: async () => {
      if (id === null) {
        return Promise.resolve({ account: null })
      }
      const url = baseUrl + `/api/account/${id}/transaction`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useTransactionQuery`, error)
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