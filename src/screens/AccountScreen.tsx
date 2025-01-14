import useAccountQuery from '../apis/account/useAccountQuery'
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils/constants'
import { useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import NewAccountScreen from '../screens/NewAccountScreen'
import NewAccountCard from '../components/cards/NewAccountCard'
import AccountCard from '../components/cards/AccountCard'
import KeyboardView from '../components/KeyboardView'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../utils/styles'


export default function AccountScreen() {
  const { data } = useAccountQuery()

  const [expenses, setExpenses] = useState([
    { id: "1", category: "Groceries", amount: 130.26, icon: "nutrition" },
    { id: "2", category: "Dining", amount: 60.39, icon: "fast-food" },
    { id: "3", category: "Transport", amount: 16.15, icon: "car-sport" },
    { id: "4", category: "Luxury", amount: 2.0, icon: "diamond" },
    { id: "5", category: "asda", amount: 9.0, icon: "diamond" },
    { id: "6", category: "123a", amount: 12.0, icon: "diamond" },
    { id: "7", category: "jhgkjg", amount: 78.0, icon: "diamond" },
  ])

  const total = expenses.reduce((acc, item) => acc + item.amount, 0)

  const renderExpenseItem = ({ item }: { item: typeof expenses[0] }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.categoryAmount}>{item.amount.toFixed(2)} $</Text>
    </View>
  )

  return (
    <View style={styles.containerWhite}>
      <View style={styles.balanceHeader}>
        <Text style={styles.titleText}>Billetera</Text>
        <Text style={styles.subtitleText}>this month ▼</Text>
      </View>
      <View style={styles.containerRow}>
        <Text style={[styles.bigNumber, { marginTop: 20 }]}>100</Text>
        <Text style={styles.subtitleText}>USD</Text>
      </View>
      <Text style={styles.subtitleText}>balance</Text>
      <TouchableOpacity style={[styles.button, { marginVertical: 20 }]}>
        <Text style={styles.buttonText}>Change Account</Text>
      </TouchableOpacity>
      <FlatList
        numColumns={1}
        data={expenses}
        scrollEnabled
        renderItem={renderExpenseItem}
        snapToAlignment='start'
        decelerationRate='fast'
        keyExtractor={(item) => `category.${item.id}`}
        horizontal
        contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ width: '100%', padding: 20, flexDirection: 'row', gap: 20 }}>
        <TouchableHighlight underlayColor={colors.gray.light} style={[styles.buttonOutline, { flex: 1 }]} onPress={() => { }}>
          <Text style={styles.buttonOutlineText}>+ Transaction</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={colors.gray.light} style={[styles.buttonOutline, { flex: 1 }]} onPress={() => { }}>
          <Text style={styles.buttonOutlineText}>+ Debt</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}