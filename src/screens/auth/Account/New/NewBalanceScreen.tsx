import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing, ActivityIndicator, TouchableHighlight } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import KeyboardView from '../../../../components/KeyboardView'
import { bg, sButton, sContainer, sInput, spacing, sText } from '../../../../utils/styles'
import { colors } from '../../../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation, symbolValidation } from '../../../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAccountBalanceMutation from '../../../../apis/account/useAccountBalanceMutation'
import useAccountQuery from '../../../../apis/account/useAccountQuery'

const schema = z.object({
  currency: symbolValidation,
  amount: amountWith0Validation
})

type NewBalanceForm = z.infer<typeof schema>

const resolver = zodResolver(schema)

export default function NewBalanceScreen(props: NativeStackScreenProps<AuthStackScreens, 'NewBalance'>) {
  const accountId = props.route.params.accountId

  const accountQuery = useAccountQuery(accountId)

  if (accountQuery.isLoading || !accountQuery.data) {
    return null
  }

  const anim = {
    opacity: {
      currency: useAnimatedValue(1),
      amount: useAnimatedValue(0),
    },
    position: {
      amount: useAnimatedValue(220),
    }
  }

  const refs = {
    currency: useRef<TextInput>(null),
    amount: useRef<TextInput>(null),
  }

  const methods = useForm<NewBalanceForm>({
    resolver,
    mode: 'onChange'
  })

  const { control, formState: { errors }, handleSubmit } = methods

  const goToAmount = () => {
    if (!!errors.currency) return

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

  const { mutate, isPending } = useAccountBalanceMutation(accountId, {
    onSuccess: () => {
      props.navigation.replace('Dashboard', { accountId })
    }
  })

  const onSubmit = handleSubmit((data: NewBalanceForm) => {
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
              ◀ New Balance
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20, spacing.pb20]}>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Description
              </Text>
              <Text style={sButton.pillText}>
                {accountQuery.data.account.description}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Notes
              </Text>
              <Text style={sButton.pillText}>
                {accountQuery.data.account.notes || 'No Notes'}
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* Currency */}
        <Animated.View style={[spacing.p20, {
          width: '100%',
          opacity: anim.opacity.currency,
          position: 'absolute',
          top: 80
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
                Create Currency
              </Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    </KeyboardView>
  )
}