import { Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { sContainer, spacing, sText } from '../../utils/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuthState } from '../../components/AuthStateProvider'
import useAccountBalanceQuery from '../../apis/account/useAccountBalanceQuery'
import numbro from 'numbro'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../utils/constants'

export default function SelectBalanceScreen(props: NativeStackScreenProps<AuthStackScreens, 'SelectBalance'>) {
  const { setState } = useAuthState()
  const accountId = props.route.params.accountId

  const balanceQuery = useAccountBalanceQuery(accountId)

  const goBack = () => {
    props.navigation.goBack()
  }

  const onSelectCurrency = (cur: string) => {
    setState({ currencySelected: cur })
    props.navigation.navigate('Dashboard', { accountId })
  }

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            ◀ Select Currency
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          balanceQuery.data?.balances.map(balance => {
            const isExpense = balance?.amount !== undefined && balance.amount < 0

            return (
              <TouchableOpacity onPress={() => onSelectCurrency(balance.currency)} key={`account.${balance.id}`} style={[spacing.p20]}>
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
          })
        }
        <TouchableOpacity onPress={goToNewAccount} style={[spacing.p20]}>
          <Text style={sText.bigNumber}>
            New Currency
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}