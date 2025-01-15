import { processColor, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { bg, border, sButton, sContainer, sGraph, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import Skeleton from '../../components/ui/Skeleton'
import Snackbar from 'react-native-snackbar'
import useAccountDeleteMutation from '../../apis/account/useAccountDeleteMutation'
import numbro from 'numbro'

export default function DashboardScreen(props: NativeStackScreenProps<AuthStackScreens, 'Dashboard'>) {
  const { accountSelected, accountsQuery, accountQuery, setState, timespan } = useAuthState()

  const deleteMutation = useAccountDeleteMutation(accountSelected?.id || 0, {
    onMutate: () => {
      setState({ accountSelected: null })
    },
    onSuccess: () => {
      Snackbar.show({
        text: 'Account Deleted',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    }
  })

  const noAccount = !accountSelected

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

  if (accountsQuery.isLoading || accountQuery.isLoading) {
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
              {accountSelected?.description || 'No account selected'} ▼
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
                {accountSelected?.description}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Notes
              </Text>
              <Text style={sButton.pillText}>
                {accountSelected?.notes || 'No Notes'}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Month Start
              </Text>
              <Text style={sButton.pillText}>
                {accountSelected?.startDate}
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
      <View style={spacing.pb20}>
        <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
          Actions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            {
              !noAccount && (
                <>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>+ Transaction</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>+ Debt</Text>
                  </TouchableHighlight>
                </>
              )
            }
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Account</Text>
            </TouchableHighlight>
            {
              !noAccount && (
                <>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>New Currency</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={onDeleteWarning} onLongPress={deleteAccount} underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
                    <Text style={[sButton.outlineText, sText.red]}>Delete Account</Text>
                  </TouchableHighlight>
                </>
              )
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

function Balance(props: NativeStackScreenProps<AuthStackScreens, 'Dashboard'>) {
  const { accountSelected, currencySelected, balanceQuery, setState, showBalance, timespan } = useAuthState()
  const noAccount = !accountSelected

  const goToCurrency = () => {
    if (noAccount) return

    props.navigation.navigate('SelectBalance')
  }

  const toggleBalance = () => {
    setState({
      showBalance: !showBalance
    })
  }

  const balance = balanceQuery.data?.balances.find(b => b.currency === currencySelected)

  return (
    <View>
      <View style={sContainer.rowCenter}>
        <Text style={[sText.bigNumber]}>
          {
            noAccount ? 'N/A' : balance?.amount !== undefined ? numbro(balance.amount).format({ thousandSeparated: true, mantissa: 2 }) : 'N/A'
          }
        </Text>
        <TouchableOpacity onPress={goToCurrency}>
          <Text style={sText.subtitle}>
            {
              noAccount ? 'N/A' : `${currencySelected} ▼`
            }
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleBalance} style={[spacing.p10]}>
        <Text style={[sText.subtitle, sText.center]}>
          {showBalance ? 'Balance ▼' : `Total ${timespan} ▼`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}