import { Text, TouchableOpacity, View } from 'react-native'
import { sContainer, spacing, sText } from '../../../../utils/styles'
import { AuthStackScreens } from '../../../../components/AuthNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type ScreenProps = NativeStackScreenProps<AuthStackScreens, 'TransactionDetails'>

export default function TransactionDetailsScreen(props: ScreenProps) {
  const goBack = () => {
    props.navigation.goBack()
  }

  return (
    <View style={[sContainer.flexWhite]}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            ◀ Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}