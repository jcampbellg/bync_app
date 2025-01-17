import { Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import { sContainer, spacing, sText } from '../../../../utils/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { Account } from '../../../../utils/dbTypes'
import useAccountsQuery from '../../../../apis/account/useAccountsQuery'
import useAccountPatchMutation from '../../../../apis/account/useAccountPatchMutation'

type ScreenProps = NativeStackScreenProps<AuthStackScreens, 'SelectAccount'>

export default function SelectAccountScreen(props: ScreenProps) {
  const accountsQuery = useAccountsQuery()

  const goBack = () => {
    if (!props.route.params?.cantGoBack) {
      props.navigation.goBack()
    }
  }

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            {!props.route.params?.cantGoBack ? '◀ ' : ''}Select Account
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          accountsQuery.data?.accounts.map(account => (
            <AccountTouchableOpacity key={`account.${account.id}`} {...props} account={account} />
          ))
        }
        <TouchableOpacity onPress={goToNewAccount} style={[spacing.p20]}>
          <Text style={sText.bigNumber}>
            New Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

type AccountProps = ScreenProps & {
  account: Account
}

function AccountTouchableOpacity({ account, navigation }: AccountProps) {
  const patch = useAccountPatchMutation(account.id, {
    onMutate: () => {
      navigation.replace('Dashboard', { accountId: account.id })
    }
  })

  const onSelectAccount = () => {
    patch.mutate({
      isSelected: true
    })
  }
  return (
    <TouchableOpacity onPress={onSelectAccount} style={[spacing.p20]}>
      <Text style={sText.bigNumber}>
        {account.description}
      </Text>
      <Text style={[sText.subtitle]}>
        {account.notes || 'No notes'}
      </Text>
    </TouchableOpacity>
  )
}