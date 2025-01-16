import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Balance } from '../../utils/dbTypes'
import { NewBalanceForm } from '../../screens/auth/Account/New/NewBalanceScreen'

type QueryProps = Omit<UseMutationOptions<{ balance: Balance }, Error, NewBalanceForm>, 'queryKey' | 'queryFn'>

export default function useAccountBalanceMutation(id: number, { onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async (params: NewBalanceForm) => {
      const url = baseUrl + `/api/account/balance/${id}`

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
        queryKey: ['account']
      })
      onSuccess?.(...args)
    },
  })

  return query
}