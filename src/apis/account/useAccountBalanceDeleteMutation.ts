import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Balance } from '../../utils/dbTypes'

type Ids = {
  accountId: number
  balanceId: number
}

type QueryProps = Omit<UseMutationOptions<{ balance: Balance }, Error>, 'queryKey' | 'queryFn'>

export default function useAccountBalanceDeleteMutation({ accountId, balanceId }: Ids, { onSuccess, onMutate, onError, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async () => {
      const url = baseUrl + `/api/account/${accountId}/balance/${balanceId}`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountBalanceDeleteMutation:`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    ...props,
    onError: async (...args) => {
      const context = args[2]
      queryClient.setQueryData(['account', accountId, 'balance'], context)

      onError?.(...args)
    },
    onMutate: async (...args) => {
      const dataBeforeMutation = queryClient.getQueryData(['account', accountId, 'balance'])

      queryClient.setQueryData(['account', accountId, 'balance'], (prev: { balances: Balance[] }) => ({
        balances: prev.balances.filter(b => b.id !== balanceId)
      }))
      onMutate?.(...args)

      return dataBeforeMutation
    },
    onSuccess: async (...args) => {
      queryClient.removeQueries({
        queryKey: ['account', accountId, 'balance', balanceId]
      })
      queryClient.invalidateQueries({
        queryKey: ['account', accountId]
      })
      onSuccess?.(...args)
    },
  })

  return query
}