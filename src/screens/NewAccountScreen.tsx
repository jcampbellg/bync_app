import { Text, TextInput, View } from 'react-native'
import styles from '../utils/styles'

export default function NewAccountScreen() {
  return (
    <View style={styles.bodyAccounts}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder='Description'
        placeholderTextColor='#888'
        keyboardType='default'
      />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        placeholder='Notes'
        placeholderTextColor='#888'
        keyboardType='default'
      />
      <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
        maxLength={3}
        placeholder='Ex: USD'
        placeholderTextColor='#888'
        keyboardType='default'
      />
      <Text style={styles.label}>Initial Amount</Text>
      <TextInput
        style={styles.input}
        placeholder='Initial Amount'
        placeholderTextColor='#888'
        keyboardType='number-pad'
      />
    </View>
  )
}