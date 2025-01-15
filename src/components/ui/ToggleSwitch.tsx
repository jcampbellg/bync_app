import { TouchableHighlight, Animated, useAnimatedValue, Easing } from 'react-native'
import { sInput } from '../../utils/styles'
import { colors } from '../../utils/constants'

type Props = {
  value: boolean
  onChange: (value: boolean) => void
}

const AnimTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight)

export default function ToggleSwitch({ value, onChange }: Props) {
  const ball = useAnimatedValue(value ? 1 : 0)

  const onOn = () => {
    Animated.timing(ball, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }

  const onOff = () => {
    Animated.timing(ball, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }

  const onToggle = () => {
    if (value) {
      onOff()
    } else {
      onOn()
    }
    onChange(!value)
  }

  return (
    <AnimTouchableHighlight onPress={onToggle} underlayColor={colors.gray.light} style={[sInput.toggleSwitch, {
      backgroundColor: ball.interpolate({ inputRange: [0, 1], outputRange: [colors.gray.medium, colors.white] })
    }]} >
      <Animated.View style={[sInput.toggleSwitchCircle, {
        transform: [{ translateX: ball.interpolate({ inputRange: [0, 1], outputRange: [0, 30] }) }],
        backgroundColor: ball.interpolate({ inputRange: [0, 1], outputRange: [colors.gray.loading, colors.black] })
      }]}>

      </Animated.View>
    </AnimTouchableHighlight>
  )
}