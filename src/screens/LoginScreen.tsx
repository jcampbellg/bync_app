import styles from '../utils/styles'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors } from '../utils/constants'
import { useApp } from './Root'
import { useQueryClient } from '@tanstack/react-query'

export default function LoginScreen() {
  const queryClient = useQueryClient()
  const { login } = useApp()
  const [baseUrl, setBaseUrl] = useState('')
  const [key, setKey] = useState('')

  const onLogin = () => {
    queryClient.clear()
    setTimeout(() => {
      login(baseUrl, key)
    }, 100)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EntypoIcon name='wallet' size={100} color={colors.white} />
        <Text style={[styles.title, { color: colors.white }]}>BYNC App</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Base URL</Text>
        <TextInput
          value={baseUrl}
          onChangeText={setBaseUrl}
          autoCapitalize='none'
          style={styles.input}
          placeholder="Base URL"
          placeholderTextColor="#888"
          keyboardType="url"
        />
        <Text style={styles.label}>Key</Text>
        <TextInput
          value={key}
          onChangeText={setKey}
          style={styles.input}
          placeholder="Key"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TouchableHighlight onPress={onLogin} underlayColor={colors.gray.loading} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}