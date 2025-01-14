import { Keyboard, KeyboardAvoidingView, ScrollView, StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native'

type Props = {
  children: React.ReactNode
  scrollViewStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export default function KeyboardView({ children, scrollViewStyle, contentContainerStyle }: Props) {
  const dismissKeyboard = () => Keyboard.dismiss()

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
        <ScrollView style={scrollViewStyle} contentContainerStyle={contentContainerStyle}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}