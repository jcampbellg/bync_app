import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useApp } from '../../screens/Root'
import { Account, AccountWithBalances } from '../../utils/dbTypes'
import { NewAccountForm } from '../../screens/NewAccountScreen'

export type AccountsGetData = {
  accounts: AccountWithBalances[]
}

type QueryProps = Omit<UseMutationOptions<Account, Error, NewAccountForm>, 'queryKey' | 'queryFn'>

export default function useAccountMutation({ onSuccess, ...props }: QueryProps = {}) {
  const queryClient = useQueryClient()
  const { key, baseUrl } = useApp()

  const query = useMutation({
    mutationFn: async (params: NewAccountForm) => {
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
        console.error(`error in useAccountMutation: ${error}`)
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
      queryClient.refetchQueries({
        queryKey: ['accounts']
      })
      onSuccess?.(...args)
    },
  })

  return query
}