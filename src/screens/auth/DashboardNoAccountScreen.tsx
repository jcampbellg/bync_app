import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { sButton, sContainer, sGraph, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'

type Props = NativeStackScreenProps<AuthStackScreens, 'DashboardNoAccount'>

export default function DashboardNoAccountScreen(props: Props) {
  const { setState, timespan } = useAuthState()

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  const goToSelectAccount = () => {
    props.navigation.navigate('SelectAccount')
  }

  const onTimespanChange = () => {
    setState({
      timespan: timespan === 'this month' ? 'last two months' : timespan === 'last two months' ? 'this year' : 'this month'
    })
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
          <TouchableOpacity onPress={onTimespanChange}>
            <Text style={sText.subtitle}>
              {timespan} ▼
            </Text>
          </TouchableOpacity>
        </View>
        <Balance {...props} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[sContainer.flex]}>
        <View style={[sContainer.rowEnd, spacing.p20, spacing.gap10]}>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '50%' }]}>
          </View>
          <View style={[sGraph.bar, { height: '100%' }]}>
          </View>
        </View>
      </ScrollView>
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

function Balance(props: NativeStackScreenProps<AuthStackScreens, 'DashboardNoAccount'>) {
  const { setState, showBalance, timespan } = useAuthState()

  const toggleBalance = () => {
    setState({
      showBalance: !showBalance
    })
  }
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
      <TouchableOpacity onPress={toggleBalance} style={[spacing.p10]}>
        <Text style={[sText.subtitle, sText.center]}>
          {showBalance ? 'Balance ▼' : `Total ${timespan} ▼`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}