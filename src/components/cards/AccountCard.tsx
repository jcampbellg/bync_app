import styles from '../../utils/styles'
import React from 'react'
import { Text, View } from 'react-native'
import { AccountWithBalances } from '../../utils/dbTypes'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/constants'

export default function AccountCard({ description, notes, balances, id }: AccountWithBalances) {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.blackHighlight, colors.fullBlack]} style={styles.card}>
        <Text style={styles.titleWhite}>{description}</Text>
        <Text style={styles.subtitleWhite}>{notes}</Text>
      </LinearGradient>
    </View>
  )
}