import LoginScreen from '../screens/LoginScreen'
import { useApp } from '../screens/Root'
import AuthNavigation from './AuthNavigation'

export default function AppNavigation() {
  const { isLogin } = useApp()

  if (!isLogin) {
    return <LoginScreen />
  }

  return <AuthNavigation />
}