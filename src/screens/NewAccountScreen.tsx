import { ActivityIndicator, Text, TextInput, TouchableHighlight, View } from 'react-native'
import styles from '../utils/styles'
import { z } from 'zod'
import { amountWith0Validation, dateNumberValidation, descriptionValidation, notesValidation, symbolValidation } from '../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { colors } from '../utils/constants'
import useAccountMutation from '../apis/account/useAccountMutation'
import { useRef } from 'react'
import KeyboardView from '../components/KeyboardView'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  currency: symbolValidation,
  amount: amountWith0Validation,
  startDate: dateNumberValidation,
  isDefault: z.boolean()
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
    resolver,
    defaultValues: {
      description: '',
      notes: '',
      currency: '',
      amount: 0,
      startDate: 1,
      isDefault: false
    }
  })

  const { handleSubmit, formState: { errors }, reset, control } = methods

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  const refs = {
    notes: useRef<TextInput>(null),
    currency: useRef<TextInput>(null),
    amount: useRef<TextInput>(null),
    startDate: useRef<TextInput>(null)
  }

  return (
    <KeyboardView scrollViewStyle={{ backgroundColor: colors.white }}>
      <View style={[styles.containerWhite, { padding: 20 }]}>
        <Text style={styles.label}>Description *</Text>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
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
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={refs.notes}
              style={[styles.input, errors.notes && { borderColor: colors.error }]}
              placeholder='Notes'
              placeholderTextColor='#888'
              keyboardType='default'
              onChangeText={onChange}
              onSubmitEditing={() => refs.startDate.current?.focus()}
              blurOnSubmit={false}
              value={value}
              enterKeyHint='next'
            />
          )}
        />
        <Text style={styles.label}>Start Date (1-31)*</Text>
        <Controller
          control={control}
          name='startDate'
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={refs.startDate}
              style={[styles.input, errors.startDate && { borderColor: colors.error }]}
              placeholder='Start Date'
              placeholderTextColor='#888'
              keyboardType='number-pad'
              onChangeText={onChange}
              onSubmitEditing={() => refs.currency.current?.focus()}
              value={value?.toString()}
              enterKeyHint='next'
            />
          )}
        />
        <Text style={styles.label}>Currency *</Text>
        <Controller
          control={control}
          name='currency'
          render={({ field: { onChange, value } }) => (
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
        <Text style={styles.label}>Initial Balance *</Text>
        <Controller
          control={control}
          name='amount'
          render={({ field: { onChange, value } }) => (
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
        <Text style={styles.label}>Default Account *</Text>
        <Controller
          control={control}
          name='isDefault'
          render={({ field: { onChange, value } }) => (
            <View style={[styles.containerRow, { gap: 20, marginVertical: 10 }]}>
              <TouchableHighlight underlayColor={colors.gray.loading} style={[!value ? styles.buttonOutline : styles.button, { flex: 1 }]} onPress={() => onChange(true)}>
                <Text style={!value ? styles.buttonOutlineText : styles.buttonText}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor={colors.gray.loading} style={[value ? styles.buttonOutline : styles.button, { flex: 1 }]} onPress={() => onChange(false)}>
                <Text style={value ? styles.buttonOutlineText : styles.buttonText}>No</Text>
              </TouchableHighlight>
            </View>
          )}
        />
        <TouchableHighlight disabled={isPending} onPress={onSubmit} underlayColor={colors.gray.loading} style={[styles.button, { width: '100%', marginTop: 20 }]}>
          {
            isPending ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={styles.buttonText}>Submit</Text>
          }
        </TouchableHighlight>
      </View>
    </KeyboardView>
  )
}