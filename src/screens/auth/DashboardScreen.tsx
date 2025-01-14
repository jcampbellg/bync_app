import { Text, TouchableHighlight, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import KeyboardView from '../../components/KeyboardView'
import { bg, sButton, sContainer, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'

export default function DashboardScreen(props: NativeStackScreenProps<AuthStackScreens, 'Dashboard'>) {
  const { accountSelected } = useAuthState()

  const noAccount = !accountSelected

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }
  return (
    <KeyboardView contentContainerStyle={[sContainer.flexWhite]}>
      <View>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <Text style={sText.subtitle}>
            {accountSelected?.description || 'No account selected'} ▼
          </Text>
          <Text style={sText.subtitle}>
            this month ▼
          </Text>
        </View>
        <View style={sContainer.rowCenter}>
          <Text style={[sText.bigNumber]}>
            {
              noAccount ? 'N/A' : 100
            }
          </Text>
          <Text style={sText.subtitle}>
            {
              noAccount ? 'N/A' : 'USD'
            }
          </Text>
        </View>
      </View>
      <View style={[sContainer.flex]}>

      </View>
      <View style={spacing.pb20}>
        <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
          Actions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.loading} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Account</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.loading} style={sButton.outline}>
              <Text style={sButton.outlineText}>+ Transaction</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.loading} style={sButton.outline}>
              <Text style={sButton.outlineText}>+ Debt</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </KeyboardView>
  )
}