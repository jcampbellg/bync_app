import { NavigationContainer } from '@react-navigation/native'
import AccountsScreen from '../screens/AccountsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../utils/constants'
import { useApp } from '../screens/Root'

const Tab = createBottomTabNavigator()

export type TabStackParamList = {
  Accounts: undefined
  Groups: undefined
  Categories: undefined
  Exit: undefined
}

export default function AuthNavigation() {
  const { logout } = useApp()
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarIconStyle: { marginBottom: 0, paddingBottom: 0, paddingTop: 10, height: 46 }, tabBarActiveTintColor: colors.white, tabBarInactiveBackgroundColor: colors.black, tabBarActiveBackgroundColor: colors.black, tabBarInactiveTintColor: colors.gray.loading }}>
        <Tab.Screen
          name='Accounts'
          component={AccountsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FaIcon name='credit-card' color={color} size={focused ? size : size * 0.8} />
            )
          }}
        />
        <Tab.Screen
          name='Groups'
          component={AccountsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FaIcon name='folder-open' color={color} size={focused ? size : size * 0.8} />
            )
          }}
        />
        <Tab.Screen
          name='Categories'
          component={AccountsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FaIcon name='bookmark' color={color} size={focused ? size : size * 0.8} />
            )
          }}
        />
        <Tab.Screen
          name='Exit'
          component={AccountsScreen}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault()
              logout()
            }
          })}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FaIcon name='sign-out-alt' color={colors.error} size={focused ? size : size * 0.8} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}