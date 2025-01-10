import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'

export default function KeyboardView({ children }: { children: React.ReactNode }) {
  const dismissKeyboard = () => Keyboard.dismiss()

  return (
    <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
        <ScrollView style={{ flex: 1 }}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}