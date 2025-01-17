import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Balance } from '../../utils/dbTypes'

type Params = Pick<Balance, 'currency' | 'amount'>

type QueryProps = Omit<UseMutationOptions<{ balance: Balance }, Error, Params>, 'queryKey' | 'queryFn'>

export default function useAccountBalanceMutation(id: number, { onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async (params: Params) => {
      const url = baseUrl + `/api/account/${id}/balance`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify(params)
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountBalanceMutation:`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    ...props,
    onSuccess: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['account', id, 'balance']
      })
      onSuccess?.(...args)
    },
  })

  return query
}