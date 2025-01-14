import LoginScreen from '../screens/LoginScreen'
import { useRoot } from '../screens/Root'
import AuthNavigation from './AuthNavigation'

export default function AppNavigation() {
  const { isLogin } = useRoot()

  if (!isLogin) {
    return <LoginScreen />
  }

  return <AuthNavigation />
}