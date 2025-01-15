import { Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { sContainer, spacing, sText } from '../../utils/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuthState } from '../../components/AuthStateProvider'

export default function SelectBalanceScreen(props: NativeStackScreenProps<AuthStackScreens, 'SelectBalance'>) {
  const { balanceQuery, setState } = useAuthState()
  const goBack = () => {
    props.navigation.goBack()
  }

  const onSelectCurrency = (cur: string) => {
    setState({ currencySelected: cur })
    props.navigation.navigate('Dashboard')
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
          balanceQuery.data?.balances.map(balance => (
            <TouchableOpacity onPress={() => onSelectCurrency(balance.currency)} key={`account.${balance.id}`} style={[spacing.p20]}>
              <Text style={[sText.bigNumber]}>
                {balance.currency}
              </Text>
            </TouchableOpacity>
          ))
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