import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing, ActivityIndicator, TouchableHighlight } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import KeyboardView from '../../../../components/KeyboardView'
import { bg, sButton, sContainer, sInput, spacing, sText } from '../../../../utils/styles'
import { colors } from '../../../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation, descriptionValidation, notesValidation, symbolValidation } from '../../../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAccountMutation from '../../../../apis/account/useAccountMutation'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  currency: symbolValidation,
  amount: amountWith0Validation
})

type NewAccountForm = z.infer<typeof schema>

const resolver = zodResolver(schema)

export default function NewAccountScreen(props: NativeStackScreenProps<AuthStackScreens, 'NewAccount'>) {
  const anim = {
    pill: {
      description: useAnimatedValue(0),
      notes: useAnimatedValue(0),
      currency: useAnimatedValue(0),
      amount: useAnimatedValue(0)
    },
    opacity: {
      description: useAnimatedValue(1),
      notes: useAnimatedValue(0),
      currency: useAnimatedValue(0),
      amount: useAnimatedValue(0)
    },
    position: {
      notes: useAnimatedValue(220),
      currency: useAnimatedValue(220),
      amount: useAnimatedValue(220)
    }
  }

  const refs = {
    notes: useRef<TextInput>(null),
    currency: useRef<TextInput>(null),
    amount: useRef<TextInput>(null),
    startDate: useRef<TextInput>(null)
  }

  const methods = useForm<NewAccountForm>({
    resolver,
    mode: 'onChange'
  })

  const { control, formState: { errors }, handleSubmit, watch } = methods

  const goToNotes = () => {
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
      toValue: 80,
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

  const goToCurrency = () => {
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
    Animated.timing(anim.opacity.currency, {
      toValue: 80,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.position.currency, {
      toValue: 0,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    refs.currency.current?.focus()
  }

  const goToAmount = () => {
    if (!!errors.currency || !watch('currency')) return

    Animated.timing(anim.pill.currency, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.currency, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.amount, {
      toValue: 80,
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

  const { mutate, isPending, isError, error } = useAccountMutation({
    onSuccess: ({ account }) => {
      props.navigation.replace('Dashboard', { accountId: account.id })
    }
  })

  const onSubmit = handleSubmit((data: NewAccountForm) => {
    mutate(data)
  })

  const goBack = () => {
    props.navigation.goBack()
  }

  return (
    <KeyboardView scrollViewStyle={bg.white}>
      <View style={sContainer.flexWhite}>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity disabled={isPending} onPress={goBack}>
            <Text style={sText.subtitle}>
              ◀ New Account
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20, spacing.pb20]}>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.description }]}>
              <Text style={sButton.pillLabel}>
                Description
              </Text>
              <Text style={sButton.pillText}>
                {watch('description')}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.notes }]}>
              <Text style={sButton.pillLabel}>
                Notes
              </Text>
              <Text style={sButton.pillText}>
                {watch('notes') || 'No Notes'}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.currency }]}>
              <Text style={sButton.pillLabel}>
                Currency
              </Text>
              <Text style={sButton.pillText}>
                {watch('currency')}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.amount }]}>
              <Text style={sButton.pillLabel}>
                Balance
              </Text>
              <Text style={sButton.pillText}>
                {watch('amount')}
              </Text>
            </Animated.View>
          </View>
        </ScrollView>
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.description,
          position: 'absolute',
          top: 80
        }]}>
          <Text style={[sText.bigNumber]}>
            Account Description
          </Text>
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={sInput.line}
                placeholderTextColor={colors.gray.hard}
                onSubmitEditing={goToNotes}
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
        {/* Notes */}
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.notes,
          position: 'absolute',
          top: 80,
          transform: [{ translateY: anim.position.notes }]
        }]
        }>
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
                placeholder='(Optional) Type here...'
                enterKeyHint='next'
                submitBehavior='submit'
                onSubmitEditing={goToCurrency}
              />
            )}
          />
          <Text style={[sText.error, spacing.mt10]}>
            {errors.notes?.message}
          </Text>
        </Animated.View>
        {/* Currency */}
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.currency,
          position: 'absolute',
          top: 80,
          transform: [{ translateY: anim.position.currency }]
        }]
        }>
          <Text style={[sText.bigNumber]}>
            Currency
          </Text>
          <Controller
            control={control}
            name='currency'
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={refs.currency}
                value={value}
                onChangeText={onChange}
                style={sInput.line}
                placeholderTextColor={colors.gray.hard}
                autoCapitalize='characters'
                maxLength={3}
                placeholder='Three letter currency code'
                enterKeyHint='next'
                submitBehavior='submit'
                onSubmitEditing={goToAmount}
              />
            )}
          />
          <Text style={[sText.subtitle]}>
            You can add more currencies later
          </Text>
          <Text style={[sText.error, spacing.mt10]}>
            {errors.currency?.message}
          </Text>
        </Animated.View>
        {/* Inital Amount */}
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.amount,
          position: 'absolute',
          top: 80,
          transform: [{ translateY: anim.position.amount }]
        }]
        }>
          <Text style={[sText.bigNumber]}>
            Initial Balance
          </Text>
          <Controller
            control={control}
            name='amount'
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={refs.amount}
                value={value?.toString()}
                onChangeText={onChange}
                style={sInput.line}
                placeholderTextColor={colors.gray.hard}
                keyboardType='number-pad'
                placeholder='Type here...'
                enterKeyHint='done'
                submitBehavior='blurAndSubmit'
                onSubmitEditing={onSubmit}
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
                Create Account
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
      </View>
    </KeyboardView>
  )
}