import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account, Balance } from '../../utils/dbTypes'

type Ids = {
  accountId: number
  balanceId: number
}

type Params = Partial<Balance>

type QueryProps = Omit<UseMutationOptions<{ account: Account }, Error, Params>, 'queryKey' | 'queryFn'>

export default function useAccountBalancePatchMutation({ accountId, balanceId }: Ids, { onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async (params: Params) => {
      const url = baseUrl + `/api/account/${accountId}/balance/${balanceId}`

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify(params)
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountBalancePatchMutation:`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    ...props,
    onSuccess: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['account', accountId, 'balance']
      })
      onSuccess?.(...args)
    },
  })

  return query
}