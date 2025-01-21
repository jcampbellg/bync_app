import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRoot } from '../../../screens/Root'
import { Transaction } from '../../../utils/dbTypes'

type QueryProps = Omit<UseQueryOptions<{ transaction: Transaction }>, 'queryKey' | 'queryFn'>

type Ids = {
  accountId: number
  transactionId: number
}

export default function useTransactionQuery({ accountId, transactionId }: Ids, props: QueryProps = {}) {
  const { key, baseUrl, isLogin } = useRoot()

  const query = useQuery({
    queryKey: ['account', accountId, 'transaction', transactionId],
    queryFn: async () => {
      const url = baseUrl + `/api/account/${accountId}/transaction/${transactionId}`

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