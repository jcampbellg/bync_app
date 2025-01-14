import { Keyboard, KeyboardAvoidingView, ScrollView, StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import { colors } from '../utils/constants'

type Props = {
  children: React.ReactNode
  scrollViewStyle?: StyleProp<ViewStyle>
}

export default function KeyboardView({ children, scrollViewStyle }: Props) {
  const dismissKeyboard = () => Keyboard.dismiss()

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
        <ScrollView style={scrollViewStyle}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}