import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../../components/AuthNavigation'
import { sButton, sContainer, sGraph, spacing, sText } from '../../../utils/styles'
import { colors } from '../../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'

type Props = NativeStackScreenProps<AuthStackScreens, 'DashboardNoAccount'>

export default function DashboardNoAccountScreen(props: Props) {
  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  const goToSelectAccount = () => {
    props.navigation.navigate('SelectAccount')
  }

  return (
    <View style={[sContainer.flexWhite]}>
      <View>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goToSelectAccount}>
            <Text style={sText.subtitle}>
              No account selected ▼
            </Text>
          </TouchableOpacity>
        </View>
        <Balance />
      </View>
      <View style={[sContainer.center]}>
        <Text style={sText.subtitle}>
          No data to display
        </Text>
      </View>
      <View style={spacing.pb20}>
        <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
          Actions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Account</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

function Balance() {
  return (
    <View>
      <View style={sContainer.rowCenter}>
        <Text style={[sText.bigNumber]}>
          N/A
        </Text>
        <Text style={sText.subtitle}>
          N/A
        </Text>
      </View>
      <Text style={[sText.subtitle, sText.center]}>
        Balance
      </Text>
    </View>
  )
}