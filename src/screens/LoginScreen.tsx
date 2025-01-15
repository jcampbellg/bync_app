import { sButton, sContainer, sInput, sText } from '../utils/styles'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors } from '../utils/constants'
import { useRoot } from './Root'
import { useQueryClient } from '@tanstack/react-query'

export default function LoginScreen() {
  const queryClient = useQueryClient()
  const { login } = useRoot()
  const [baseUrl, setBaseUrl] = useState('')
  const [key, setKey] = useState('')

  const onLogin = () => {
    queryClient.clear()
    setTimeout(() => {
      login(baseUrl, key)
    }, 100)
  }
  return (
    <View style={sContainer.flexBlack}>
      <View style={sContainer.centerBlack}>
        <EntypoIcon name='wallet' size={100} color={colors.white} />
        <Text style={sText.titleWhite}>BYNC App</Text>
      </View>
      <View style={sContainer.loginForm}>
        <Text style={sText.title}>Login</Text>
        <Text style={sText.label}>Base URL</Text>
        <TextInput
          value={baseUrl}
          onChangeText={setBaseUrl}
          autoCapitalize='none'
          style={sInput.border}
          placeholder="Base URL"
          placeholderTextColor="#888"
          keyboardType="url"
        />
        <Text style={sText.label}>Key</Text>
        <TextInput
          value={key}
          onChangeText={setKey}
          style={sInput.border}
          placeholder="Key"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TouchableHighlight onPress={onLogin} underlayColor={colors.gray.hard} style={sButton.fillFull}>
          <Text style={sButton.filltext}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}