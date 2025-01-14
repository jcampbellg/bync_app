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
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  }
})

export const sText = StyleSheet.create({
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
  }
})

export const spacing = StyleSheet.create({
  mt20: {
    marginTop: 20
  },
  mb10: {
    marginBottom: 10
  },
  p20: {
    padding: 20
  },
  ph20: {
    paddingHorizontal: 20
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