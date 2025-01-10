import useAccountQuery from '../apis/account/useAccountQuery'
import NewAccountCard from './cards/NewAccountCard'
import AccountCard from './cards/AccountCard'
import { Text, View } from 'react-native'
import styles from '../utils/styles'
import { colors } from '../utils/constants'
import { useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import NewAccountScreen from '../screens/NewAccountScreen'
import AccountScreen from '../screens/AccountScreen'
import KeyboardView from './KeyboardView'

export default function AuthNavigation() {
  const { data } = useAccountQuery()
  const [accountIndex, setAIndex] = useState(0)
  const [currencyIndex, setCIndex] = useState(0)

  const balances = accountIndex === 0 ? [] : data?.accounts[accountIndex - 1].balances || []

  return (
    <View style={styles.containerWhite}>
      <View style={[styles.headerAccounts, { marginBottom: accountIndex === 0 ? 40 : 0 }]}>
        <SwiperFlatList showPagination paginationStyleItem={styles.paginationStyleCardItem} paginationActiveColor={colors.white} paginationDefaultColor={colors.gray.loading} index={accountIndex} onChangeIndex={({ index }) => { setAIndex(index); setCIndex(0) }}>
          <NewAccountCard />
          {
            data?.accounts.map((account) => (
              <AccountCard key={account.id} {...account} />
            ))
          }
        </SwiperFlatList>
      </View>
      {
        accountIndex !== 0 && (
          <>
            <Text style={[styles.subtitle, { textAlign: 'center', fontWeight: 'bold', marginVertical: 10 }]}>Balance</Text>
            <View style={[styles.headerAccounts]}>
              <SwiperFlatList showPagination paginationStyle={{ position: 'relative' }} paginationStyleItem={styles.paginationStyleCurrencyItem} paginationActiveColor={colors.black} paginationDefaultColor={colors.gray.medium} index={currencyIndex} onChangeIndex={({ index }) => setCIndex(index)}>
                {
                  balances.map((balance) => (
                    <View key={`balance.${balance.id}`} style={styles.balance}>
                      <Text style={styles.bigNumber}>{balance.amount}</Text>
                      <Text style={styles.subtitle}>{balance.currency}</Text>
                    </View>
                  ))
                }
              </SwiperFlatList>
            </View>
          </>
        )
      }
      <View style={styles.bodyAccounts}>
        <KeyboardView>
          {
            accountIndex === 0 ? <NewAccountScreen /> : <AccountScreen />
          }
        </KeyboardView>
      </View>
    </View>
  )
}