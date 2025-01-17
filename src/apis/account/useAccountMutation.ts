import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account, Balance } from '../../utils/dbTypes'

type Params = Pick<Account, 'description' | 'notes'> & Pick<Balance, 'currency' | 'amount'>

type QueryProps = Omit<UseMutationOptions<{ account: Account }, Error, Params>, 'queryKey' | 'queryFn'>

export default function useAccountMutation({ onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async (params: Params) => {
      const url = baseUrl + '/api/account'

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
        console.error(`error in useAccountMutation:`, error)
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