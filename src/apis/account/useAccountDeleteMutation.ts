import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../screens/Root'
import { Account } from '../../utils/dbTypes'

type QueryProps = Omit<UseMutationOptions<{ account: Account }, Error>, 'queryKey' | 'queryFn'>

export default function useAccountDeleteMutation(id: number, { onSuccess, onError, onMutate, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async () => {
      const url = baseUrl + `/api/account/${id}`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
      })

      if (!response.ok) {
        const error = await response.json()
        console.error(`error in useAccountDeleteMutation:`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    ...props,
    onError: async (...args) => {
      const context = args[2]
      queryClient.setQueryData(['account'], context)

      onError?.(...args)
    },
    onMutate: async (...args) => {
      const dataBeforeMutation = queryClient.getQueryData(['account'])

      queryClient.setQueryData(['account'], (prev: { accounts: Account[] }) => ({
        accounts: prev.accounts.filter(a => a.id !== id)
      }))
      onMutate?.(...args)

      return dataBeforeMutation
    },
    onSuccess: async (...args) => {
      queryClient.removeQueries({
        queryKey: ['account', id]
      })
      queryClient.invalidateQueries({
        queryKey: ['account']
      })
      onSuccess?.(...args)
    },
  })

  return query
}