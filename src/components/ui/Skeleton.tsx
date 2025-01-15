import { Animated, Easing, useAnimatedValue, View } from 'react-native'
import { useShallowEffect } from '@mantine/hooks'
import { colors } from '../../utils/constants'

type Props = React.ComponentProps<typeof View> & {
  delay: number
}

export default function Skeleton(props: Props) {
  const anim = useAnimatedValue(0)

  const startAnimation = () => {
    Animated.loop(Animated.timing(
      anim,
      {
        delay: props.delay,
        toValue: 2,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )).start()
  }

  useShallowEffect(() => {
    startAnimation()
  }, [{ a: 1 }])

  return (
    <Animated.View
      {...props}
      style={[
        props.style,
        {
          backgroundColor: colors.gray.medium,
          opacity: anim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0.2, 1, 0.2]
          })
        }
      ]}>
    </Animated.View>
  )
}