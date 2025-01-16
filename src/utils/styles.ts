import { StyleSheet } from 'react-native'
import { colors } from './constants'

export const sContainer = StyleSheet.create({
  grow: {
    flexGrow: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  flex: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  centerWhite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  flexWhite: {
    flex: 1,
    backgroundColor: colors.white
  },
  rowWhite: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  centerGray: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray.medium
  },
  flexGray: {
    flex: 1,
    backgroundColor: colors.gray.medium
  },
  rowGray: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.gray.medium
  },
  centerBlack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black
  },
  flexBlack: {
    flex: 1,
    backgroundColor: colors.black
  },
  rowBlack: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.black
  },
  loginForm: {
    flex: 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    padding: 20,
    alignItems: 'center',
  }
})

export const sButton = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    backgroundColor: colors.gray.hard,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 4,
  },
  pillLabel: {
    fontSize: 10,
    color: colors.white,
    opacity: 0.8,
    fontFamily: 'Roboto',
    marginBottom: 1
  },
  pillText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Roboto',
  },
  filltext: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  outlineText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  outline: {
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
  },
  outlineFull: {
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
    width: '100%',
  },
  fill: {
    padding: 12,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  fillFull: {
    padding: 12,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
  },
  filltextLarge: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
})

export const sText = StyleSheet.create({
  center: {
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 20,
    fontFamily: 'Roboto'
  },
  subtitle: {
    fontSize: 14,
    color: colors.black,
    opacity: 0.7,
    fontFamily: 'Roboto',
  },
  titleWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 20,
    fontFamily: 'Roboto'
  },
  subtitleWhite: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    fontFamily: 'Roboto'
  },
  label: {
    width: '100%',
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.black
  },
  error: {
    fontSize: 14,
    color: colors.error,
    opacity: 0.7,
    fontFamily: 'Roboto',
  },
  red: {
    color: colors.error
  }
})

export const sInput = StyleSheet.create({
  border: {
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
  line: {
    fontFamily: 'Roboto',
    width: '100%',
    fontSize: 24,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 0,
    paddingHorizontal: 5,
    borderColor: colors.black,
    borderBottomWidth: 4
  },
  toggleSwitch: {
    flexDirection: 'row',
    width: 70,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 35,
    padding: 5,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    }
  },
  toggleSwitchCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.gray.medium
  }
})

export const spacing = StyleSheet.create({
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mb10: {
    marginBottom: 10
  },
  p20: {
    padding: 20
  },
  p10: {
    padding: 10
  },
  ph20: {
    paddingHorizontal: 20
  },
  pv20: {
    paddingVertical: 20
  },
  pb20: {
    paddingBottom: 20
  },
  gap10: {
    gap: 10
  },
  gap20: {
    gap: 20
  }
})

export const bg = StyleSheet.create({
  black: {
    backgroundColor: colors.black
  },
  white: {
    backgroundColor: colors.white
  },
  gray: {
    backgroundColor: colors.gray.medium
  }
})

export const border = StyleSheet.create({
  b1: {
    borderBottomWidth: 1,
    borderColor: colors.black
  },
  red: {
    borderColor: colors.error
  }
})

export const sGraph = StyleSheet.create({
  bar: {
    width: 50,
    backgroundColor: colors.gray.medium,
    borderRadius: 5,
    marginHorizontal: 5
  }
})