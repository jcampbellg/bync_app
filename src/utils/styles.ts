import { Dimensions, StyleSheet } from 'react-native'
import { colors } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  paginationStyleCurrencyItem: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
  paginationStyleCardItem: {
    width: 9,
    height: 6,
    borderRadius: 2,
  },
  bigNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    fontVariant: ['tabular-nums'],
  },
  cardContainer: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width
  },
  balance: {
    width,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
    color: colors.white,
    marginTop: 10,
    width: 300,
    height: 170
  },
  containerWhite: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    color: colors.white
  },
  headerAccounts: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    color: colors.white
  },
  bodyAccounts: {
    width,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  form: {
    flex: 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    width: '100%',
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  titleWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.white,
    fontFamily: 'Roboto'
  },
  subtitleWhite: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    fontFamily: 'Roboto'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    fontFamily: 'Roboto'
  },
  subtitle: {
    fontSize: 14,
    color: colors.black,
    opacity: 0.8,
    fontFamily: 'Roboto'
  },
  input: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 50,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: colors.black,
    borderColor: colors.gray.medium,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    }
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
})

export default styles