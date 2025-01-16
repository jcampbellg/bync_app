import { Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { sContainer, spacing, sText } from '../../utils/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuthState } from '../../components/AuthStateProvider'
import { Account } from '../../utils/dbTypes'

export default function SelectAccountScreen(props: NativeStackScreenProps<AuthStackScreens, 'SelectAccount'>) {
  const { accountsQuery, setState } = useAuthState()
  const goBack = () => {
    props.navigation.goBack()
  }

  const onSelectAccount = (acc: Account) => {
    props.navigation.navigate('Dashboard', { accountId: acc.id })
  }

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            ◀ Select Account
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          accountsQuery.data?.accounts.map(account => (
            <TouchableOpacity onPress={() => onSelectAccount(account)} key={`account.${account.id}`} style={[spacing.p20]}>
              <Text style={sText.bigNumber}>
                {account.description}
              </Text>
              <Text style={[sText.subtitle]}>
                {account.notes || 'No notes'}
              </Text>
            </TouchableOpacity>
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