import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Animated, Easing } from 'react-native'
import { useShallowEffect } from '@mantine/hooks'
import { useRef } from 'react'

const FontAwesomeAnim = Animated.createAnimatedComponent(FontAwesome)

type SpinIconProps = React.ComponentProps<typeof FontAwesomeAnim>

export default function SpinIcon(props: SpinIconProps) {
  const rotationDegree = useRef(new Animated.Value(0)).current

  const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): void => {
    Animated.loop(Animated.timing(
      rotationDegree,
      {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )).start()
  }

  useShallowEffect(() => {
    startRotationAnimation(1000, rotationDegree)
  }, [{ a: 1 }])

  return (
    <FontAwesomeAnim
      {...props}
      style={{
        transform: [{
          rotateZ: rotationDegree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          })
        }]
      }}>
    </FontAwesomeAnim>
  )
}