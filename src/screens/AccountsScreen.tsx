import useAccountQuery from '../apis/account/useAccountQuery'
import { Text, View } from 'react-native'
import styles from '../utils/styles'
import { colors } from '../utils/constants'
import { useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import NewAccountScreen from '../screens/NewAccountScreen'
import AccountScreen from '../screens/AccountScreen'
import NewAccountCard from '../components/cards/NewAccountCard'
import AccountCard from '../components/cards/AccountCard'
import KeyboardView from '../components/KeyboardView'

export default function AccountsScreen() {
  const { data } = useAccountQuery()

  const [accountIndex, setAIndex] = useState(0)
  const [currencyIndex, setCIndex] = useState(0)

  const balances = accountIndex === 0 ? [] : data?.accounts[accountIndex - 1].balances || []

  const dataScroll = [{}, ...data?.accounts || []]

  return (
    <View style={styles.containerWhite}>
      <View style={[styles.headerAccounts, { marginBottom: accountIndex === 0 ? 40 : 0 }]}>
        <SwiperFlatList showPagination={!!data?.accounts.length} paginationStyleItem={styles.paginationStyleCardItem} paginationActiveColor={colors.white} paginationDefaultColor={colors.gray.loading} index={accountIndex} onChangeIndex={({ index }) => { setAIndex(index); setCIndex(0) }}
          data={dataScroll}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return <NewAccountCard />
            }

            return <AccountCard {...item} />
          }}
        >
        </SwiperFlatList>
      </View>
      {
        accountIndex !== 0 && (
          <>
            <Text style={[styles.subtitle, { textAlign: 'center', fontWeight: 'bold', marginVertical: 10 }]}>Balance</Text>
            <View style={[styles.headerAccounts]}>
              <SwiperFlatList showPagination paginationStyle={{ position: 'relative' }} paginationStyleItem={styles.paginationStyleCurrencyItem} paginationActiveColor={colors.black} paginationDefaultColor={colors.gray.medium} index={currencyIndex} onChangeIndex={({ index }) => setCIndex(index)}
                data={balances}
                renderItem={({ item, index }) => {
                  if (index === 0) {
                    return (
                      <View style={styles.balance}>
                        <Text style={styles.subtitle}>
                          Add Currency
                        </Text>
                      </View>
                    )
                  }
                  return (
                    <View style={styles.balance}>
                      <Text style={styles.bigNumber}>{item.amount}</Text>
                      <Text style={styles.subtitle}>{item.currency}</Text>
                    </View>
                  )
                }}
              />
            </View>
          </>
        )
      }
      <View style={styles.bodyAccounts}>
        <KeyboardView>
          {
            accountIndex === 0 ? <NewAccountScreen key='asdas' /> : <AccountScreen />
          }
        </KeyboardView>
      </View>
    </View>
  )
}