import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useRoot } from '../../../screens/Root'
import { Transaction } from '../../../utils/dbTypes'

type Params = Omit<Transaction, 'createdAt' | 'updatedAt' | 'groupId' | 'categoryId' | 'id'>

type QueryProps = Omit<UseMutationOptions<{ transaction: Transaction }, Error, Params>, 'queryKey' | 'queryFn'>

export default function useTransactionMutation(id: number, { onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useRoot()

  const query = useMutation({
    mutationFn: async (params: Params) => {
      const url = baseUrl + `/api/account/${id}/transaction`

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
        console.error(`error in useTransactionMutation:`, error)
        return Promise.reject(error)
      }
      const data = await response.json()
      return data
    },
    ...props,
    onSuccess: async (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['account', id]
      })
      onSuccess?.(...args)
    },
  })

  return query
}