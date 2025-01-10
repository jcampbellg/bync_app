import { ActivityIndicator, Text, TextInput, TouchableHighlight } from 'react-native'
import styles from '../utils/styles'
import { z } from 'zod'
import { amountWith0Validation, descriptionValidation, notesValidation, symbolValidation } from '../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { colors } from '../utils/constants'
import useAccountMutation from '../apis/account/useAccountMutation'
import { useRef } from 'react'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  currency: symbolValidation,
  amount: amountWith0Validation
})

export type NewAccountForm = z.infer<typeof schema>

const resolver = zodResolver(schema)

export default function NewAccountScreen() {
  const { mutate, isPending } = useAccountMutation({
    onSuccess: () => {
      reset()
    }
  })
  const methods = useForm<NewAccountForm>({
    resolver
  })

  const { handleSubmit, formState: { errors }, reset, control } = methods

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  const refs = {
    notes: useRef<TextInput>(null),
    currency: useRef<TextInput>(null),
    amount: useRef<TextInput>(null)
  }

  return (
    <>
      <Text style={styles.label}>Description *</Text>
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.description && { borderColor: colors.error }]}
            placeholder='Description'
            placeholderTextColor='#888'
            keyboardType='default'
            onChangeText={onChange}
            onSubmitEditing={() => refs.notes.current?.focus()}
            blurOnSubmit={false}
            value={value}
            enterKeyHint='next'
          />
        )}
      />
      <Text style={styles.label}>Notes</Text>
      <Controller
        control={control}
        name='notes'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={refs.notes}
            style={[styles.input, errors.notes && { borderColor: colors.error }]}
            placeholder='Notes'
            placeholderTextColor='#888'
            keyboardType='default'
            onChangeText={onChange}
            onSubmitEditing={() => refs.currency.current?.focus()}
            blurOnSubmit={false}
            value={value}
            enterKeyHint='next'
          />
        )}
      />
      <Text style={styles.label}>Currency *</Text>
      <Controller
        control={control}
        name='currency'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={refs.currency}
            style={[styles.input, errors.currency && { borderColor: colors.error }]}
            placeholder='Ex: USD'
            maxLength={3}
            placeholderTextColor='#888'
            autoCapitalize='characters'
            keyboardType='default'
            onChangeText={onChange}
            onSubmitEditing={() => refs.amount.current?.focus()}
            blurOnSubmit={false}
            value={value}
            enterKeyHint='next'
          />
        )}
      />
      <Text style={styles.label}>Initial Amount *</Text>
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={refs.amount}
            style={[styles.input, errors.amount && { borderColor: colors.error }]}
            placeholder='Initial Amount'
            placeholderTextColor='#888'
            keyboardType='number-pad'
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            value={value?.toString()}
            enterKeyHint='done'
          />
        )}
      />
      <TouchableHighlight disabled={isPending} onPress={onSubmit} underlayColor={colors.gray.loading} style={styles.button}>
        {
          isPending ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={styles.buttonText}>Submit</Text>
        }
      </TouchableHighlight>
    </>
  )
}