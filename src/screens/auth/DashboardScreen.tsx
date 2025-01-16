import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { border, sButton, sContainer, sGraph, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import Skeleton from '../../components/ui/Skeleton'
import Snackbar from 'react-native-snackbar'
import useAccountDeleteMutation from '../../apis/account/useAccountDeleteMutation'
import numbro from 'numbro'
import useAccountQuery from '../../apis/account/useAccountQuery'
import useAccountBalanceQuery from '../../apis/account/useAccountBalanceQuery'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import dayts from '../../utils/dayts'

type Props = NativeStackScreenProps<AuthStackScreens, 'Dashboard'>

export default function DashboardScreen(props: Props) {
  const { setState, timespan } = useAuthState()

  const accountId = props.route.params.accountId

  const deleteMutation = useAccountDeleteMutation(accountId, {
    onSuccess: () => {
      Snackbar.show({
        text: 'Account Deleted',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
      props.navigation.navigate('DashboardNoAccount')
    }
  })

  const accountQuery = useAccountQuery(accountId)

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  const goToSelectAccount = () => {
    props.navigation.navigate('SelectAccount')
  }

  const onDeleteWarning = () => {
    Snackbar.show({
      text: 'Are you sure you want to delete this account?',
      duration: Snackbar.LENGTH_LONG,
      marginBottom: 20,
      action: {
        text: 'YES',
        textColor: colors.error,
        onPress: deleteAccount
      }
    })
  }

  const onTimespanChange = () => {
    setState({
      timespan: timespan === 'this month' ? 'last two months' : timespan === 'last two months' ? 'this year' : 'this month'
    })
  }

  const deleteAccount = () => {
    deleteMutation.mutate()
  }

  const account = accountQuery.data?.account


  if (accountQuery.isLoading || !account) {
    return (
      <View style={[sContainer.flexWhite]}>
        <View>
          <View style={[sContainer.rowBetween, spacing.p20, spacing.gap20]}>
            <Skeleton delay={100} style={{ height: 14, flex: 1 }} />
            <Skeleton delay={100} style={{ height: 14, flex: 1 }} />
          </View>
          <View style={[sContainer.rowBetween, spacing.p20, spacing.gap20]}>
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
          </View>
          <View style={sContainer.rowCenter}>
            <Skeleton delay={300} style={{ height: 48, width: 100 }} />
          </View>
        </View>
        <View style={[sContainer.rowEnd, sContainer.flex, spacing.p20, spacing.gap10]}>
          <Skeleton delay={400} style={{ height: '100%', flex: 1 }} />
          <Skeleton delay={400} style={{ height: '90%', flex: 1 }} />
          <Skeleton delay={400} style={{ height: '50%', flex: 1 }} />
        </View>
        <View style={[spacing.ph20]}>
          <Skeleton delay={400} style={{ height: 14, width: 100 }} />
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.pv20]}>
            <Skeleton delay={500} style={{ height: 40, width: 120 }} />
            <Skeleton delay={600} style={{ height: 40, width: 100 }} />
            <Skeleton delay={700} style={{ height: 40, width: 80 }} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[sContainer.flexWhite]}>
      <View>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goToSelectAccount}>
            <Text style={sText.subtitle}>
              {account.description} ▼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onTimespanChange}>
            <Text style={sText.subtitle}>
              {timespan} ▼
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
                {account.description}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Notes
              </Text>
              <Text style={sButton.pillText}>
                {account.notes || 'No Notes'}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Month Start
              </Text>
              <Text style={sButton.pillText}>
                {account.startDate}
              </Text>
            </View>
          </View>
        </ScrollView>
        <Balance {...props} accountQuery={accountQuery} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[sContainer.flex]}>
        <View style={[sContainer.rowEnd, spacing.p20, spacing.gap10]}>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '100%' }]}>
          </View>
        </View>
      </ScrollView>
      <View style={spacing.pb20}>
        <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
          Actions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>+ Transaction</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>+ Debt</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Account</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Currency</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={onDeleteWarning} onLongPress={deleteAccount} underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
              <Text style={[sButton.outlineText, sText.red]}>Delete Account</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

type BalanceProps = Props & {
  accountQuery: ReturnType<typeof useAccountQuery>
}

function Balance(props: BalanceProps) {
  const { currencySelected, setState, showBalance, timespan } = useAuthState()

  const accountId = props.route.params.accountId

  const goToCurrency = () => {
    props.navigation.navigate('SelectBalance', { accountId })
  }

  const toggleBalance = () => {
    setState({
      showBalance: !showBalance
    })
  }

  const balanceQuery = useAccountBalanceQuery(accountId)
  const balance = balanceQuery.data?.balances.find(b => b.currency === currencySelected) || balanceQuery.data?.balances[0]

  const isExpense = balance?.amount !== undefined && balance.amount < 0

  const monthStart = props.accountQuery.data?.account.startDate

  if (!monthStart) return null

  const todayD = parseInt(dayts().format('D'))

  const timespanThisMonth = `from ${todayD > monthStart - 1 ? dayts().format('MMM') : dayts().subtract(1, 'month').format('MMM')} ${monthStart} to date`

  return (
    <View>
      <View style={sContainer.rowCenter}>
        {
          isExpense ? <FA5Icon name='minus-circle' color={colors.expense} size={16} /> : <FA5Icon name='plus-circle' color={colors.income} size={16} />
        }
        <Text style={[sText.bigNumber]}>
          {
            balance?.amount !== undefined ? numbro(Math.abs(balance.amount)).format({ thousandSeparated: true, mantissa: 2 }) : 'N/A'
          }
        </Text>
        <TouchableOpacity onPress={goToCurrency}>
          <Text style={sText.subtitle}>
            {balance?.currency} ▼
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleBalance} style={[spacing.p10]}>
        <Text style={[sText.subtitle, sText.center]}>
          {showBalance ? 'Balance ▼' : `Total ${timespan === 'this month' ? timespanThisMonth : timespan} ▼`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}