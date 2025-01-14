import useAccountQuery from '../apis/account/useAccountQuery'
import { ActivityIndicator, View } from 'react-native'
import { colors } from '../utils/constants'
import styles from '../utils/styles'

import { createStackNavigator } from '@react-navigation/stack'
import NewAccountScreen from './NewAccountScreen'

const AccountsStack = createStackNavigator()

export default function AccountsScreen() {
  const { data, isLoading } = useAccountQuery()

  if (isLoading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size='large' color={colors.black} />
      </View>
    )
  }

  if (data?.accounts.length === 0) {
    return (
      <AccountsStack.Navigator screenOptions={{ headerShown: false }}>
        <AccountsStack.Screen name='Create Account' component={NewAccountScreen} options={{ headerShown: true }} />
      </AccountsStack.Navigator>
    )
  }

  return (
    <AccountsStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountsStack.Screen name='Create Account' component={NewAccountScreen} options={{ headerShown: true }} />
    </AccountsStack.Navigator>
  )
}