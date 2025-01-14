import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import KeyboardView from '../../components/KeyboardView'
import { bg, sButton, sContainer, sInput, spacing, sText } from '../../utils/styles'
import { colors } from '../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation, dateNumberValidation, descriptionValidation, notesValidation, symbolValidation } from '../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  currency: symbolValidation,
  amount: amountWith0Validation,
  startDate: dateNumberValidation,
})

export type NewAccountForm = z.infer<typeof schema>

const resolver = zodResolver(schema)


export default function NewAccountScreen(props: NativeStackScreenProps<AuthStackScreens, 'NewAccount'>) {
  const anim = {
    pill: {
      description: useAnimatedValue(0),
      notes: useAnimatedValue(0),
      currency: useAnimatedValue(0),
      amount: useAnimatedValue(0),
      startDate: useAnimatedValue(0),
      isDefault: useAnimatedValue(0)
    },
    opacity: {
      description: useAnimatedValue(1),
      notes: useAnimatedValue(0),
      currency: useAnimatedValue(0),
      amount: useAnimatedValue(0),
      startDate: useAnimatedValue(0),
      isDefault: useAnimatedValue(0)
    },
    position: {
      notes: useAnimatedValue(200),
      currency: useAnimatedValue(200),
      amount: useAnimatedValue(200),
      startDate: useAnimatedValue(200),
      isDefault: useAnimatedValue(200)
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

  const { control, formState: { errors } } = methods

  const goToNotes = () => {
    if (!!errors.description) return

    Animated.timing(anim.pill.description, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.description, {
      toValue: 0,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.notes, {
      toValue: 60,
      duration: 300,
      easing: Easing.cubic,
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
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.currency, {
      toValue: 60,
      duration: 300,
      easing: Easing.cubic,
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
    if (!!errors.currency) return

    Animated.timing(anim.pill.currency, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.currency, {
      toValue: 0,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.amount, {
      toValue: 60,
      duration: 300,
      easing: Easing.cubic,
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

  const goToStartDate = () => {
    if (!!errors.amount) return

    Animated.timing(anim.pill.amount, {
      toValue: 1,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.amount, {
      toValue: 0,
      duration: 200,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.opacity.startDate, {
      toValue: 60,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
    Animated.timing(anim.position.startDate, {
      toValue: 0,
      duration: 300,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
  }

  const onSubmit = (data: NewAccountForm) => {
    console.log(data)
  }

  const goBack = () => {
    props.navigation.navigate('Dashboard')
  }

  return (
    <KeyboardView scrollViewStyle={bg.white}>
      <View style={sContainer.flexWhite}>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goBack}>
            <Text style={sText.subtitle}>
              ◀ New Account
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.description }]}>
              <Text style={sButton.pillText}>
                {methods.watch('description')}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.notes }]}>
              <Text style={sButton.pillText}>
                {methods.watch('notes') || 'No Notes'}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.currency }]}>
              <Text style={sButton.pillText}>
                {methods.watch('currency')}
              </Text>
            </Animated.View>
            <Animated.View style={[sButton.pill, { opacity: anim.pill.amount }]}>
              <Text style={sButton.pillText}>
                {methods.watch('amount')}
              </Text>
            </Animated.View>
          </View>
        </ScrollView>
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.description
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
                placeholderTextColor={colors.gray.loading}
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
          top: 60,
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
                placeholderTextColor={colors.gray.loading}
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
          top: 60,
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
                placeholderTextColor={colors.gray.loading}
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
          top: 60,
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
                placeholderTextColor={colors.gray.loading}
                keyboardType='number-pad'
                placeholder='Type here...'
                enterKeyHint='next'
                submitBehavior='submit'
                onSubmitEditing={goToStartDate}
              />
            )}
          />
          <Text style={[sText.error, spacing.mt10]}>
            {errors.amount?.message}
          </Text>
        </Animated.View>
        {/* Start Date */}
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.startDate,
          position: 'absolute',
          top: 60,
          transform: [{ translateY: anim.position.startDate }]
        }]
        }>
          <Text style={[sText.bigNumber]}>
            Month Start
          </Text>
          <Controller
            control={control}
            name='startDate'
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={refs.startDate}
                value={value?.toString()}
                onChangeText={onChange}
                style={sInput.line}
                placeholderTextColor={colors.gray.loading}
                keyboardType='number-pad'
                placeholder='1 - 31'
                enterKeyHint='done'
                submitBehavior='submit'
                onSubmitEditing={methods.handleSubmit(onSubmit)}
              />
            )}
          />
          <Text style={[sText.subtitle]}>
            Data on the Dashboard will be displayed from this day of the month to the next
          </Text>
          <Text style={[sText.error, spacing.mt10]}>
            {errors.startDate?.message}
          </Text>
        </Animated.View>
      </View>
    </KeyboardView>
  )
}