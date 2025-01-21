import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { bg, border, sButton, sContainer, spacing, sText } from '../../../../utils/styles'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useTransactionQuery from '../../../../apis/account/transaction/useTransactionQuery'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import numbro from 'numbro'
import { colors } from '../../../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import Skeleton from '../../../../components/ui/Skeleton'
import useAccountQuery from '../../../../apis/account/useAccountQuery'

type ScreenProps = NativeStackScreenProps<AuthStackScreens, 'TransactionDetails'>

export default function TransactionDetailsScreen(props: ScreenProps) {
  const accountId = props.route.params.accountId
  const transactionId = props.route.params.transactionId

  const query = useTransactionQuery({ accountId, transactionId })

  const goBack = () => {
    props.navigation.goBack()
  }

  return (
    <View style={[sContainer.flexWhite]}>
      <ScrollView style={[sContainer.flexWhite, sContainer.grow]}>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goBack}>
            <Text style={sText.subtitle}>
              ◀ Transaction Details
            </Text>
          </TouchableOpacity>
        </View>
        <Amount {...props} query={query} />
        <Details {...props} query={query} />
      </ScrollView>
      <Actions {...props} query={query} />
    </View>
  )
}

type ComponentProps = ScreenProps & {
  query: ReturnType<typeof useTransactionQuery>
}

function Actions({ route }: ComponentProps) {
  const transactionId = route.params.transactionId
  const accountId = route.params.accountId

  return (
    <View style={[spacing.p20]}>
      <TouchableHighlight underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
        <Text style={[sButton.outlineText, sText.red]}>Delete Transaction</Text>
      </TouchableHighlight>
    </View>
  )
}

function Amount({ query }: ComponentProps) {
  if (query.data === undefined) {
    return (
      <View>
        <View style={sContainer.rowCenter}>
          <Skeleton delay={300} style={{ height: 50, width: 100, margin: 7 }} />
        </View>
        <Text style={[sText.subtitle, sText.center]}>
          Total
        </Text>
      </View>
    )
  }

  const transaction = query.data.transaction

  const isExpense = transaction.amount < 0

  return (
    <View>
      <View style={sContainer.rowCenter}>
        {
          isExpense ? <FA5Icon name='minus-circle' solid color={colors.expense} size={16} /> : <FA5Icon name='plus-circle' solid color={colors.income} size={16} />
        }
        <Text style={[sText.bigNumber]}>
          {
            numbro(Math.abs(transaction.amount)).format({ thousandSeparated: true, mantissa: 2 })
          }
        </Text>
        <Text style={sText.subtitle}>
          {transaction.currency}
        </Text>
      </View>
      <Text style={[sText.subtitle, sText.center]}>
        Total
      </Text>
    </View>
  )
}

function Details({ query, route }: ComponentProps) {
  const accountId = route.params.accountId

  const accountQuery = useAccountQuery(accountId)

  if (query.data === undefined || accountQuery.data === undefined) {
    return (
      <>
        <View style={[spacing.p20]}>
          <Skeleton delay={0} style={{ height: 50, width: '90%', marginVertical: 7 }} />
          <Skeleton delay={300} style={{ height: 30, width: 100, marginBottom: 2 }} />
        </View>
        <TouchableOpacity style={[spacing.p20, sText.opacity]}>
          <Text style={[sText.info, sText.left, sContainer.flex]}>
            Account
          </Text>
          <Skeleton delay={100} style={{ height: 38, width: 100, marginLeft: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity style={[spacing.p20, sText.opacity]}>
          <Text style={[sText.info, sText.left, sContainer.flex]}>
            Group
          </Text>
          <Skeleton delay={600} style={{ height: 38, width: 100, marginLeft: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity style={[spacing.p20, sText.opacity]}>
          <Text style={[sText.info, sText.left, sContainer.flex]}>
            Category
          </Text>
          <Skeleton delay={800} style={{ height: 38, width: 100, marginLeft: 20 }} />
        </TouchableOpacity>
      </>
    )
  }

  const account = accountQuery.data?.account
  const transaction = query.data.transaction
  return (
    <>
      <View style={[spacing.p20]}>
        <Text style={[sText.bigNumber]}>
          {transaction.description}
        </Text>
        <Text style={[sText.title, sText.opacity]}>
          {transaction.notes || 'No notes'}
        </Text>
      </View>
      <TouchableOpacity style={[spacing.p20, sText.opacity]}>
        <Text style={[sText.info, sText.left, sContainer.flex]}>
          Account
        </Text>
        <Text style={[sText.title, spacing.ph20, sContainer.flex]}>
          {account?.description} ▼
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[spacing.p20, sText.opacity]}>
        <Text style={[sText.info, sText.left, sContainer.flex]}>
          Group
        </Text>
        <Text style={[sText.title, spacing.ph20, sContainer.flex]}>
          {transaction.groupId || 'No group'} ▼
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[spacing.p20, sText.opacity]}>
        <Text style={[sText.info, sText.left, sContainer.flex]}>
          Category
        </Text>
        <Text style={[sText.title, spacing.ph20, sContainer.flex]}>
          {transaction.categoryId || 'No category'} ▼
        </Text>
      </TouchableOpacity>
    </>
  )
}