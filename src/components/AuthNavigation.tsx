import { NavigationContainer } from '@react-navigation/native'
import { useRoot } from '../screens/Root'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/auth/DashboardScreen'
import AuthStateProvider from './AuthStateProvider'
import NewAccountScreen from '../screens/auth/NewAccountScreen'
import SelectAccountScreen from '../screens/auth/SelectAccountScreen'
import SelectBalanceScreen from '../screens/auth/SelectBalanceScreen'

export type AuthStackScreens = {
  Dashboard: undefined
  NewAccount: undefined
  SelectAccount: undefined
  SelectBalance: undefined
}

const AuthStack = createStackNavigator<AuthStackScreens>()

export default function AuthNavigation() {
  const { logout } = useRoot()
  return (
    <NavigationContainer>
      <AuthStateProvider>
        <AuthStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
          <AuthStack.Screen
            name='Dashboard'
            component={DashboardScreen}
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
            name='SelectBalance'
            component={SelectBalanceScreen}
          />
        </AuthStack.Navigator>
      </AuthStateProvider>
    </NavigationContainer>
  )
}