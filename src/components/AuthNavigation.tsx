import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/auth/Account/DashboardScreen'
import NewAccountScreen from '../screens/auth/Account/New/NewAccountScreen'
import SelectAccountScreen from '../screens/auth/Account/Select/SelectAccountScreen'
import SelectBalanceScreen from '../screens/auth/Account/Select/SelectBalanceScreen'
import DashboardNoAccountScreen from '../screens/auth/Account/DashboardNoAccountScreen'
import { sButton, sContainer, spacing, sText } from '../utils/styles'
import { ActivityIndicator, Text, TouchableHighlight, View } from 'react-native'
import { colors } from '../utils/constants'
import NewBalanceScreen from '../screens/auth/Account/New/NewBalanceScreen'
import { useRoot } from '../screens/Root'
import useAccountsQuery from '../apis/account/useAccountsQuery'
import EditBalanceScreen from '../screens/auth/Account/Edit/EditBalanceScreen'

export type AuthStackScreens = {
  Dashboard: {
    accountId: number
    balanceId?: number
  }
  DashboardNoAccount: undefined
  NewAccount: undefined
  SelectAccount: { cantGoBack?: boolean } | undefined
  SelectBalance: {
    accountId: number
    cantGoBack?: boolean
  }
  NewBalance: { accountId: number }
  EditBalance: { accountId: number, balanceId: number }
}

const AuthStack = createStackNavigator<AuthStackScreens>()

export default function AuthNavigation() {
  const { logout } = useRoot()
  const accountsQuery = useAccountsQuery()

  if (accountsQuery.isError) {
    return (
      <View style={sContainer.centerWhite}>
        <Text style={sText.error}>Something wen't wrong</Text>
        <View style={[spacing.mt20]}>
          <TouchableHighlight onPress={logout} underlayColor={colors.gray.hard} style={sButton.fillFull}>
            <Text style={sButton.filltext}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  if (accountsQuery.isLoading) {
    return (
      <View style={sContainer.centerWhite}>
        <ActivityIndicator size='large' color={colors.black} />
        <View style={[spacing.mt20]}>
          <TouchableHighlight onPress={logout} underlayColor={colors.gray.hard} style={sButton.fillFull}>
            <Text style={sButton.filltext}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  const defaultAccountId = accountsQuery.data?.accounts.find(a => a.isSelected)?.id || accountsQuery.data?.accounts[0]?.id

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }} initialRouteName={defaultAccountId ? 'Dashboard' : 'DashboardNoAccount'}>
        <AuthStack.Screen
          name='DashboardNoAccount'
          component={DashboardNoAccountScreen}
        />
        <AuthStack.Screen
          name={`Dashboard`}
          component={DashboardScreen}
          initialParams={{ accountId: defaultAccountId }}
        />
        <AuthStack.Screen
          name='NewAccount'
          component={NewAccountScreen}
        />
        <AuthStack.Screen
          name='SelectAccount'
          component={SelectAccountScreen}
        />
        <AuthStack.Screen
          name='NewBalance'
          component={NewBalanceScreen}
        />
        <AuthStack.Screen
          name='SelectBalance'
          component={SelectBalanceScreen}
        />
        <AuthStack.Screen
          name='EditBalance'
          component={EditBalanceScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}