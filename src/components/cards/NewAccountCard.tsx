import styles from '../../utils/styles'
import React from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/constants'

export default function NewAccountCard() {
  return (
    <View style={[styles.cardContainer]}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.blackHighlight, colors.fullBlack]} style={styles.card}>
        <Text style={styles.titleWhite}>Create New Account</Text>
        <Text style={styles.subtitleWhite}>Wallet, bank, credit or debit card</Text>
      </LinearGradient>
    </View>
  )
}