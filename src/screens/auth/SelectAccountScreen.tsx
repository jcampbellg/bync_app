import { Text, TouchableOpacity, View, TextInput, Animated, useAnimatedValue, Easing, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import KeyboardView from '../../components/KeyboardView'
import { bg, border, sButton, sContainer, sInput, spacing, sText } from '../../utils/styles'
import { colors } from '../../utils/constants'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { amountWith0Validation, dateNumberValidation, descriptionValidation, notesValidation, symbolValidation } from '../../utils/validation'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useAccountMutation from '../../apis/account/useAccountMutation'
import { useAuthState } from '../../components/AuthStateProvider'
import { Account } from '../../utils/dbTypes'

export default function SelectAccountScreen(props: NativeStackScreenProps<AuthStackScreens, 'SelectAccount'>) {
  const { accountsQuery, setState } = useAuthState()
  const goBack = () => {
    props.navigation.navigate('Dashboard')
  }

  const onSelectAccount = (acc: Account) => {
    setState({ accountSelected: acc })
    props.navigation.navigate('Dashboard')
  }
  return (
    <View style={sContainer.flexWhite}>
      <View style={[sContainer.rowBetween, spacing.p20]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={sText.subtitle}>
            ◀ Select Account
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {
          accountsQuery.data?.accounts.map(account => (
            <TouchableOpacity onPress={() => onSelectAccount(account)} key={`account.${account.id}`} style={[spacing.p20]}>
              <Text style={sText.bigNumber}>
                {account.description}
              </Text>
              <Text style={[sText.subtitle]}>
                {account.notes || 'No notes'}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )
}