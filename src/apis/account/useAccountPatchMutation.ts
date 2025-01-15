import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account } from '../../utils/dbTypes'

type QueryProps = Omit<UseMutationOptions<{ account: Account }, Error>, 'queryKey' | 'queryFn'>

export default function useAccountPatchMutation(id: number, { onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async () => {
      const url = baseUrl + `/api/account/${id}`

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountPatchMutation:`, error)
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