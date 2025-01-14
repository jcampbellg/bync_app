import { NavigationContainer } from '@react-navigation/native'
import { useRoot } from '../screens/Root'
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from '../screens/auth/DashboardScreen'
import AuthStateProvider from './AuthStateProvider'
import NewAccountScreen from '../screens/auth/NewAccountScreen'


export type AuthStackScreens = {
  Dashboard: undefined
  NewAccount: undefined
}

const AuthStack = createStackNavigator<AuthStackScreens>()

export default function AuthNavigation() {
  const { logout } = useRoot()
  return (
    <NavigationContainer>
      <AuthStateProvider>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen
            name='Dashboard'
            component={DashboardScreen}
          />
          <AuthStack.Screen
            name='NewAccount'
            component={NewAccountScreen}
          />
        </AuthStack.Navigator>
      </AuthStateProvider>
    </NavigationContainer>
  )
}