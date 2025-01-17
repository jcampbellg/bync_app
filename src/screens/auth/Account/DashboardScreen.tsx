import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../components/AuthNavigation'
import { border, sButton, sContainer, sGraph, spacing, sText } from '../../../utils/styles'
import { colors } from '../../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import Skeleton from '../../../components/ui/Skeleton'
import Snackbar from 'react-native-snackbar'
import useAccountDeleteMutation from '../../../apis/account/useAccountDeleteMutation'
import numbro from 'numbro'
import useAccountQuery from '../../../apis/account/useAccountQuery'
import useAccountBalanceQuery from '../../../apis/account/useAccountBalanceQuery'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import useAccountBalanceDeleteMutation from '../../../apis/account/useAccountBalanceDeleteMutation'

type Props = NativeStackScreenProps<AuthStackScreens, 'Dashboard'>

export default function DashboardScreen(props: Props) {
  const {
    account, accountQuery
  } = useData(props)

  const onTimespanChange = () => {
  }

  const goToSelectAccount = () => {
    props.navigation.navigate('SelectAccount')
  }

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
              Date ▼
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
          </View>
        </ScrollView>
        <Balance {...props} />
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
      <Actions {...props} />
    </View>
  )
}

function Balance(props: Props) {
  const {
    accountId, balance, account
  } = useData(props)


  const goToCurrency = () => {
    props.navigation.navigate('SelectBalance', { accountId })
  }

  const toggleBalance = () => {
  }

  if (!account || !balance) return null

  const isExpense = balance?.amount !== undefined && balance.amount < 0

  return (
    <View>
      <View style={sContainer.rowCenter}>
        {
          isExpense ? <FA5Icon name='minus-circle' color={colors.expense} size={16} /> : <FA5Icon name='plus-circle' color={colors.income} size={16} />
        }
        <Text style={[sText.bigNumber]}>
          {
            balance.amount !== undefined ? numbro(Math.abs(balance.amount)).format({ thousandSeparated: true, mantissa: 2 }) : 'N/A'
          }
        </Text>
        <TouchableOpacity onPress={goToCurrency}>
          <Text style={sText.subtitle}>
            {balance.currency} ▼
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleBalance} style={[spacing.p10]}>
        <Text style={[sText.subtitle, sText.center]}>
          Balance ▼
        </Text>
      </TouchableOpacity>
    </View>
  )
}

function Actions(props: Props) {
  const {
    accountId, balance, deleteAccountMutation, deleteBalanceMutation
  } = useData(props)

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  const goToNewBalance = () => {
    props.navigation.navigate('NewBalance', { accountId })
  }

  const goToNewTransaction = () => {
  }

  const goToNewDebt = () => {
  }

  const goToEditBalance = () => {
    if (!balance) return
    props.navigation.navigate('EditBalance', { accountId, balanceId: balance?.id })
  }

  const onDeleteAccountWarning = () => {
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

  const deleteAccount = () => {
    deleteAccountMutation.mutate()
  }

  const onDeleteBalanceWarning = () => {
    Snackbar.show({
      text: 'Are you sure you want to delete this currency for this account?',
      duration: Snackbar.LENGTH_LONG,
      marginBottom: 20,
      action: {
        text: 'YES',
        textColor: colors.error,
        onPress: deleteBalance
      }
    })
  }

  const deleteBalance = () => {
    if (!balance) return
    deleteBalanceMutation.mutate()
  }

  return (
    <View style={spacing.pb20}>
      <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
        Actions:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
          <TouchableHighlight onPress={goToNewTransaction} underlayColor={colors.gray.medium} style={sButton.outline}>
            <Text style={sButton.outlineText}>+ Transaction</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={goToNewDebt} underlayColor={colors.gray.medium} style={sButton.outline}>
            <Text style={sButton.outlineText}>+ Debt</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={goToEditBalance} underlayColor={colors.gray.medium} style={sButton.outline}>
            <Text style={sButton.outlineText}>Edit Balance</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
            <Text style={sButton.outlineText}>New Account</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={goToNewBalance} underlayColor={colors.gray.medium} style={sButton.outline}>
            <Text style={sButton.outlineText}>New Balance</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={onDeleteBalanceWarning} underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
            <Text style={[sButton.outlineText, sText.red]}>Delete Balance</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={onDeleteAccountWarning} underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
            <Text style={[sButton.outlineText, sText.red]}>Delete Account</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  )
}

function useData(props: Props) {
  const accountId = props.route.params.accountId
  const balanceId = props.route.params.balanceId

  const balanceQuery = useAccountBalanceQuery(accountId)
  const balance = (balanceId ? balanceQuery.data?.balances.find(b => balanceId === b.id) : balanceQuery.data?.balances.find(b => b.isSelected)) || balanceQuery.data?.balances[0]

  const accountQuery = useAccountQuery(accountId)

  const account = accountQuery.data?.account

  const deleteAccountMutation = useAccountDeleteMutation(accountId, {
    onMutate: () => {
      props.navigation.replace('SelectAccount', { cantGoBack: true })
    },
    onSuccess: () => {
      Snackbar.show({
        text: 'Account Deleted',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    },
    onError: (err) => {
      Snackbar.show({
        text: err?.message || 'Error deleting account',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    }
  })

  const deleteBalanceMutation = useAccountBalanceDeleteMutation({ accountId: accountId, balanceId: balance?.id || 0 }, {
    onMutate: () => {
      props.navigation.replace('SelectBalance', { accountId, cantGoBack: true })
    },
    onSuccess: () => {
      Snackbar.show({
        text: 'Balance Deleted',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    },
    onError: (err) => {
      Snackbar.show({
        text: err?.message || 'Error deleting balance',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    }
  })

  return {
    accountId,
    accountQuery,
    balanceQuery,
    balance,
    account,
    deleteAccountMutation,
    deleteBalanceMutation
  }
}