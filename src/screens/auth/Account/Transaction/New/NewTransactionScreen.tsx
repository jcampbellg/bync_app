import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing, ActivityIndicator, TouchableHighlight } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { sButton, sContainer, sInput, spacing, sText } from '../../../../../utils/styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, UseFormReturn, UseFormWatch } from 'react-hook-form'
import { RefObject, useRef } from 'react'
import { AuthStackScreens } from '../../../../../components/AuthNavigation'
import { amountValidation, descriptionValidation, notesValidation } from '../../../../../utils/validation'
import useTransactionMutation from '../../../../../apis/account/transaction/useTransactionMutation'
import { colors } from '../../../../../utils/constants'
import { useShallowEffect } from '@mantine/hooks'
import useAccountQuery from '../../../../../apis/account/useAccountQuery'
import { ScrollView } from 'react-native-gesture-handler'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  amount: amountValidation
})

type NewTransactionForm = z.infer<typeof schema>

const resolver = zodResolver(schema)

type FieldsLabel = 'description' | 'notes' | 'amount'
type AnimKeys = 'pill' | 'opacity' | 'position'

type AnimProps = {
  [key in AnimKeys]: {
    [key in FieldsLabel]: ReturnType<typeof useAnimatedValue>
  }
}

type RefProps = {
  [key in FieldsLabel]: RefObject<TextInput>
}

type ScreenProps = NativeStackScreenProps<AuthStackScreens, 'NewTransaction'>

export default function NewTransactionScreen(props: ScreenProps) {
  const isDebt = props.route.params.isDebt
  const accountId = props.route.params.accountId

  const anim: AnimProps = {
    pill: {
      description: useAnimatedValue(0),
      notes: useAnimatedValue(0),
      amount: useAnimatedValue(0)
    },
    opacity: {
      description: useAnimatedValue(1),
      notes: useAnimatedValue(0),
      amount: useAnimatedValue(0)
    },
    position: {
      description: useAnimatedValue(0),
      notes: useAnimatedValue(220),
      amount: useAnimatedValue(220)
    }
  }

  const refs: RefProps = {
    description: useRef<TextInput>(null),
    notes: useRef<TextInput>(null),
    amount: useRef<TextInput>(null)
  }

  const methods = useForm<NewTransactionForm>({
    resolver,
    mode: 'onChange'
  })

  const { watch } = methods

  const mutation = useTransactionMutation(accountId, {
    onSuccess: ({ transaction }) => {
      props.navigation.replace('TransactionDetails', { transactionId: transaction.id })
    }
  })

  const goBack = () => {
    props.navigation.goBack()
  }

  const fieldProps = {
    anim,
    refs,
    ...methods,
    mutation
  }

  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity disabled={mutation.isPending} onPress={goBack}>
          <Text style={sText.subtitle}>
            ◀ New {isDebt ? 'Debt' : 'Transaction'}
          </Text>
        </TouchableOpacity>
      </View>
      <Pills {...fieldProps} {...props} />
      <Description {...fieldProps} {...props} />
      <Notes {...fieldProps} {...props} />
      <Amount {...fieldProps} {...props} />
    </View>
  )
}

type FieldProps = UseFormReturn<NewTransactionForm> & {
  anim: AnimProps,
  refs: RefProps,
  mutation: ReturnType<typeof useTransactionMutation>
} & ScreenProps

function Description({ anim, refs, control, formState: { errors }, watch }: FieldProps) {
  useShallowEffect(() => {
    refs.description.current?.focus()
  }, [{ a: 1 }])

  const next = () => {
    if (!!errors.description || !watch('description')) return

    Animated.timing(anim.pill.description, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.description, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.notes, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.position.notes, {
      toValue: 0,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    refs.notes.current?.focus()
  }

  return (
    <Animated.View style={[spacing.p20, {
      width: '100%',
      opacity: anim.opacity.description,
      position: 'absolute',
      top: 80
    }]}>
      <Text style={[sText.bigNumber]}>
        Description
      </Text>
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={refs.description}
            value={value}
            onChangeText={onChange}
            style={sInput.line}
            placeholderTextColor={colors.gray.hard}
            onSubmitEditing={next}
            placeholder='Type here...'
            enterKeyHint='next'
            submitBehavior='submit'
          />
        )}
      />
      <Text style={[sText.error, spacing.mt10]}>
        {errors.description?.message}
      </Text>
    </Animated.View>
  )
}

function Notes({ anim, refs, control, formState: { errors }, watch }: FieldProps) {
  const next = () => {
    if (!!errors.notes) return

    Animated.timing(anim.pill.notes, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.notes, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.amount, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.position.amount, {
      toValue: 0,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    refs.amount.current?.focus()
  }

  return (
    <Animated.View style={[spacing.p20, {
      width: '100%',
      opacity: anim.opacity.notes,
      position: 'absolute',
      top: 80,
      transform: [{ translateY: anim.position.notes }]
    }]}>
      <Text style={[sText.bigNumber]}>
        Notes
      </Text>
      <Controller
        control={control}
        name='notes'
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={refs.notes}
            value={value}
            onChangeText={onChange}
            style={sInput.line}
            placeholderTextColor={colors.gray.hard}
            onSubmitEditing={next}
            placeholder='Type here...'
            enterKeyHint='next'
            submitBehavior='submit'
          />
        )}
      />
      <Text style={[sText.error, spacing.mt10]}>
        {errors.notes?.message}
      </Text>
    </Animated.View>
  )
}

function Amount({ anim, refs, control, formState: { errors }, handleSubmit, mutation, route }: FieldProps) {
  const { mutate, isError, error, isPending } = mutation

  const onSubmit = handleSubmit((data: NewTransactionForm) => {
    mutate({
      accountId: route.params.accountId,
      amount: data.amount,
      description: data.description,
      notes: data.notes,
      currency: route.params.currency,
      paidAt: new Date().toISOString()
    })
  })

  return (
    <Animated.View style={[spacing.p20, {
      width: '100%',
      opacity: anim.opacity.notes,
      position: 'absolute',
      top: 80,
      transform: [{ translateY: anim.position.notes }]
    }]}>
      <Text style={[sText.bigNumber]}>
        Amount
      </Text>
      <Controller
        control={control}
        name='amount'
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={refs.notes}
            value={value.toString()}
            onChangeText={onChange}
            style={sInput.line}
            placeholderTextColor={colors.gray.hard}
            onSubmitEditing={onSubmit}
            placeholder='Type here...'
            enterKeyHint='done'
            submitBehavior='blurAndSubmit'
          />
        )}
      />
      <Text style={[sText.error, spacing.mt10]}>
        {errors.amount?.message}
      </Text>
      <TouchableHighlight onPress={onSubmit} underlayColor={colors.gray.hard} style={[sButton.fill, spacing.mt20]} disabled={isPending}>
        <View style={[sContainer.rowCenter, spacing.gap10]}>
          {isPending && <ActivityIndicator size={24} color={colors.white} />}
          <Text style={sButton.filltextLarge}>
            Next
          </Text>
        </View>
      </TouchableHighlight>
      {
        isError && (
          <Text style={[sText.error, spacing.mt10]}>
            {error?.message || 'An error occurred'}
          </Text>
        )
      }
    </Animated.View>
  )
}

function Pills({ watch, anim: { pill }, route }: FieldProps) {
  const accountId = route.params.accountId
  const currency = route.params.currency

  const { data } = useAccountQuery(accountId)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20, spacing.pb20]}>
        <View style={[sButton.pill]}>
          <Text style={sButton.pillLabel}>
            Account
          </Text>
          <Text style={sButton.pillText}>
            {data?.account.description || '...'}
          </Text>
        </View>
        <View style={[sButton.pill]}>
          <Text style={sButton.pillLabel}>
            Currency
          </Text>
          <Text style={sButton.pillText}>
            {currency}
          </Text>
        </View>
        <Animated.View style={[sButton.pill, { opacity: pill.description }]}>
          <Text style={sButton.pillLabel}>
            Description
          </Text>
          <Text style={sButton.pillText}>
            {watch('description')}
          </Text>
        </Animated.View>
        <Animated.View style={[sButton.pill, { opacity: pill.notes }]}>
          <Text style={sButton.pillLabel}>
            Notes
          </Text>
          <Text style={sButton.pillText}>
            {watch('notes')}
          </Text>
        </Animated.View>
      </View>
    </ScrollView>
  )
}