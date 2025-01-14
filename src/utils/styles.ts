import { Dimensions, StyleSheet } from 'react-native'
import { colors } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.black
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
    backgroundColor: colors.gray.medium,
    paddingBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryAmount: {
    fontSize: 14,
    color: colors.gray.loading
  },
  titleText: {
    marginTop: 5,
    fontSize: 16,
    color: colors.black
  },
  subtitleText: {
    fontSize: 16,
    color: colors.gray.loading
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  containerWhite: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    padding: 10,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  buttonOutline: {
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
})

export default styles