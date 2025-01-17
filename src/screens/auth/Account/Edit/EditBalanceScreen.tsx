import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing, ActivityIndicator, TouchableHighlight } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import KeyboardView from '../../../../components/KeyboardView'
import { bg, sButton, sContainer, sInput, spacing, sText } from '../../../../utils/styles'
import { colors } from '../../../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation } from '../../../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAccountBalanceMutation from '../../../../apis/account/useAccountBalanceMutation'
import useAccountQuery from '../../../../apis/account/useAccountQuery'
import useAccountBalancePatchMutation from '../../../../apis/account/useAccountBalancePatchMutation'
import useAccountBalanceQuery from '../../../../apis/account/useAccountBalanceQuery'

const schema = z.object({
  amount: amountWith0Validation
})

type EditBalanceForm = z.infer<typeof schema>

const resolver = zodResolver(schema)

export default function EditBalanceScreen(props: NativeStackScreenProps<AuthStackScreens, 'EditBalance'>) {
  const accountId = props.route.params.accountId
  const balanceId = props.route.params.balanceId

  const accountQuery = useAccountQuery(accountId)
  const balanceQuery = useAccountBalanceQuery(accountId)

  const balance = balanceQuery.data?.balances.find(b => b.id === balanceId)

  if (accountQuery.isLoading || !accountQuery.data || balanceQuery.isLoading || !balanceQuery.data || !balance) {
    return null
  }

  const methods = useForm<EditBalanceForm>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      amount: balance.amount
    }
  })

  const { control, formState: { errors }, handleSubmit } = methods

  const ids = {
    accountId, balanceId
  }

  const { mutate, isPending } = useAccountBalancePatchMutation(ids, {
    onSuccess: () => {
      props.navigation.replace('Dashboard', { accountId, balanceId })
    }
  })

  const onSubmit = handleSubmit((data: EditBalanceForm) => {
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
              ◀ Edit Balance
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
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Currency
              </Text>
              <Text style={sButton.pillText}>
                {balance.currency}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={[spacing.p20, {
          width: '100%',
          position: 'absolute',
          top: 80,
        }]
        }>
          <Text style={[sText.bigNumber]}>
            Balance
          </Text>
          <Controller
            control={control}
            name='amount'
            render={({ field: { onChange, value } }) => (
              <TextInput
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
                Save
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardView>
  )
}