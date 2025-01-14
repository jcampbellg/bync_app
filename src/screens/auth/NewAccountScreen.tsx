import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import KeyboardView from '../../components/KeyboardView'
import { bg, sContainer, sInput, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation, dateNumberValidation, descriptionValidation, notesValidation, symbolValidation } from '../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'

const schema = z.object({
  description: descriptionValidation,
  notes: notesValidation,
  currency: symbolValidation,
  amount: amountWith0Validation,
  startDate: dateNumberValidation,
  isDefault: z.boolean()
})

export type NewAccountForm = z.infer<typeof schema>

const resolver = zodResolver(schema)


export default function NewAccountScreen(props: NativeStackScreenProps<AuthStackScreens, 'NewAccount'>) {
  const [visible, setVisible] = useState<number>(0)

  const methods = useForm<NewAccountForm>({
    resolver,
    defaultValues: {
      description: '',
      notes: '',
      currency: '',
      amount: 0,
      startDate: 1,
      isDefault: false
    }
  })

  const { control } = methods

  const goBack = () => {
    props.navigation.navigate('Dashboard')
  }

  const onBlur = () => {
    setVisible(0)
  }

  return (
    <KeyboardView scrollViewStyle={bg.white}>
      <View style={sContainer.flexWhite}>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goBack}>
            <Text style={sText.subtitle}>
              ◀ New Account
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[spacing.p20]}>
          <Text style={[sText.bigNumber]}>
            Account Description:
          </Text>
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={sInput.line}
                placeholderTextColor={colors.gray.loading}
                placeholder='Type here...'
                onFocus={() => setVisible(1)}
                onBlur={onBlur}
                enterKeyHint='next'
                submitBehavior='submit'
              />
            )}
          />
        </View>
      </View>
    </KeyboardView>
  )
}