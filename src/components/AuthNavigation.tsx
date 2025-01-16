import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/auth/Account/DashboardScreen'
import AuthStateProvider, { useAuthState } from './AuthStateProvider'
import NewAccountScreen from '../screens/auth/Account/New/NewAccountScreen'
import SelectAccountScreen from '../screens/auth/Account/Select/SelectAccountScreen'
import SelectBalanceScreen from '../screens/auth/Account/Select/SelectBalanceScreen'
import DashboardNoAccountScreen from '../screens/auth/Account/DashboardNoAccountScreen'
import { sContainer } from '../utils/styles'
import { ActivityIndicator, Text, View } from 'react-native'
import { colors } from '../utils/constants'
import NewBalanceScreen from '../screens/auth/Account/New/NewBalanceScreen'

export type AuthStackScreens = {
  Dashboard: { accountId: number }
  DashboardNoAccount: undefined
  NewAccount: undefined
  SelectAccount: undefined
  SelectBalance: { accountId: number }
  NewBalance: { accountId: number }
}

const AuthStack = createStackNavigator<AuthStackScreens>()

export default function AuthNavigation() {

  return (
    <AuthStateProvider>
      <Navigation />
    </AuthStateProvider>
  )
}

function Navigation() {
  const { accountsQuery } = useAuthState()

  if (accountsQuery.isLoading) {
    return (
      <View style={sContainer.centerWhite}>
        <ActivityIndicator size='large' color={colors.black} />
      </View>
    )
  }

  const defaultAccountId = accountsQuery.data?.accounts.find(a => a.isDefault)?.id || accountsQuery.data?.accounts[0]?.id

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
        {
          !!defaultAccountId && (
            <AuthStack.Screen
              name={`Dashboard`}
              component={DashboardScreen}
              initialParams={{ accountId: defaultAccountId }}
            />
          )
        }
        <AuthStack.Screen
          name='DashboardNoAccount'
          component={DashboardNoAccountScreen}
        />
        <AuthStack.Screen
          name='NewAccount'
          component={NewAccountScreen}
        />
        <AuthStack.Screen
          name='SelectAccount'
          component={SelectAccountScreen}
        />
        {
          !!defaultAccountId && (
            <AuthStack.Screen
              name='SelectBalance'
              component={SelectBalanceScreen}
              initialParams={{ accountId: defaultAccountId }}
            />
          )
        }
        {
          !!defaultAccountId && (
            <AuthStack.Screen
              name='NewBalance'
              component={NewBalanceScreen}
              initialParams={{ accountId: defaultAccountId }}
            />
          )
        }
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}