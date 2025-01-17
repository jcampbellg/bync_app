import { Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import { sContainer, spacing, sText } from '../../../../utils/styles'
import { ScrollView } from 'react-native-gesture-handler'
import useAccountBalanceQuery from '../../../../apis/account/useAccountBalanceQuery'
import numbro from 'numbro'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../../../utils/constants'
import useAccountBalancePatchMutation from '../../../../apis/account/useAccountBalancePatchMutation'
import { Balance } from '../../../../utils/dbTypes'

type ScreenProps = NativeStackScreenProps<AuthStackScreens, 'SelectBalance'>

export default function SelectBalanceScreen(props: ScreenProps) {
  const accountId = props.route.params.accountId

  const balanceQuery = useAccountBalanceQuery(accountId)

  const goBack = () => {
    if (!props.route.params.cantGoBack) {
      props.navigation.goBack()
    }
  }

  const goToNewBalance = () => {
    props.navigation.navigate('NewBalance', { accountId })
  }

  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            {!props.route.params.cantGoBack ? '◀ ' : ''}Select Currency
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          balanceQuery.data?.balances.map(balance => (
            <BalanceTouchableOpacity {...props} balance={balance} key={`account.${balance.id}`} />
          ))
        }
        <TouchableOpacity onPress={goToNewBalance} style={[spacing.p20]}>
          <Text style={sText.bigNumber}>
            New Currency
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

type BalanceProps = ScreenProps & {
  balance: Balance
}

function BalanceTouchableOpacity({ balance, navigation }: BalanceProps) {
  const ids = {
    accountId: balance.accountId,
    balanceId: balance.id
  }

  const patch = useAccountBalancePatchMutation(ids, {
    onMutate: () => {
      navigation.replace('Dashboard', { accountId: balance.accountId, balanceId: balance.id })
    }
  })

  const onSelectBalance = () => {
    patch.mutate({
      isSelected: true
    })
  }

  const isExpense = balance?.amount !== undefined && balance.amount < 0

  return (
    <TouchableOpacity onPress={onSelectBalance} key={`account.${balance.id}`} style={[spacing.p20]}>
      <Text style={[sText.bigNumber]}>
        {balance.currency}
      </Text>
      <View style={[sContainer.row, spacing.gap10]}>
        {
          isExpense ? <FA5Icon name='minus-circle' color={colors.expense} size={10} /> : <FA5Icon name='plus-circle' color={colors.income} size={10} />
        }
        <Text style={[sText.subtitle]}>
          {
            balance?.amount !== undefined ? numbro(Math.abs(balance.amount)).format({ thousandSeparated: true, mantissa: 2 }) : 'N/A'
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}