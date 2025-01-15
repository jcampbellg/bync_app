import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackScreens } from '../../components/AuthNavigation'
import { border, sButton, sContainer, spacing, sText } from '../../utils/styles'
import { useAuthState } from '../../components/AuthStateProvider'
import { colors } from '../../utils/constants'
import { ScrollView } from 'react-native-gesture-handler'
import Skeleton from '../../components/ui/Skeleton'
import Snackbar from 'react-native-snackbar'
import useAccountDeleteMutation from '../../apis/account/useAccountDeleteMutation'

export default function DashboardScreen(props: NativeStackScreenProps<AuthStackScreens, 'Dashboard'>) {
  const { accountSelected, accountsQuery, accountQuery, setState } = useAuthState()

  const deleteMutation = useAccountDeleteMutation(accountSelected?.id || 0, {
    onMutate: () => {
      setState({ accountSelected: null })
    },
    onSuccess: () => {
      Snackbar.show({
        text: 'Account Deleted',
        duration: Snackbar.LENGTH_SHORT,
        marginBottom: 20
      })
    }
  })

  const noAccount = !accountSelected

  const goToNewAccount = () => {
    props.navigation.navigate('NewAccount')
  }

  const goToSelectAccount = () => {
    props.navigation.navigate('SelectAccount')
  }

  const onDeleteWarning = () => {
    Snackbar.show({
      text: 'Are you sure you want to delete this account?',
      duration: Snackbar.LENGTH_LONG,
      marginBottom: 20,
      action: {
        text: 'YES',
        textColor: colors.error,
        onPress: deleteAccount
      }
    })
  }

  const deleteAccount = () => {
    deleteMutation.mutate()
  }

  if (accountsQuery.isLoading || accountQuery.isLoading) {
    return (
      <View style={[sContainer.flexWhite]}>
        <View>
          <View style={[sContainer.rowBetween, spacing.p20, spacing.gap20]}>
            <Skeleton delay={100} style={{ height: 14, flex: 1 }} />
            <Skeleton delay={100} style={{ height: 14, flex: 1 }} />
          </View>
          <View style={[sContainer.rowBetween, spacing.p20, spacing.gap20]}>
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
            <Skeleton delay={200} style={{ height: 40, width: 100 }} />
          </View>
          <View style={sContainer.rowCenter}>
            <Skeleton delay={300} style={{ height: 48, width: 100 }} />
          </View>
        </View>
        <View style={[sContainer.flex]} />
        <View style={[spacing.ph20]}>
          <Skeleton delay={400} style={{ height: 14, width: 100 }} />
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.pv20]}>
            <Skeleton delay={500} style={{ height: 40, width: 120 }} />
            <Skeleton delay={600} style={{ height: 40, width: 100 }} />
            <Skeleton delay={700} style={{ height: 40, width: 80 }} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[sContainer.flexWhite]}>
      <View>
        <View style={[sContainer.rowBetween, spacing.p20]}>
          <TouchableOpacity onPress={goToSelectAccount}>
            <Text style={sText.subtitle}>
              {accountSelected?.description || 'No account selected'} ▼
            </Text>
          </TouchableOpacity>
          <Text style={sText.subtitle}>
            this month ▼
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20, spacing.pb20]}>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Description
              </Text>
              <Text style={sButton.pillText}>
                {accountSelected?.description}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Notes
              </Text>
              <Text style={sButton.pillText}>
                {accountSelected?.notes || 'No Notes'}
              </Text>
            </View>
            <View style={[sButton.pill]}>
              <Text style={sButton.pillLabel}>
                Month Start
              </Text>
              <Text style={sButton.pillText}>
                {accountSelected?.startDate}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={sContainer.rowCenter}>
          <Text style={[sText.bigNumber]}>
            {
              noAccount ? 'N/A' : 100
            }
          </Text>
          <Text style={sText.subtitle}>
            {
              noAccount ? 'N/A' : 'USD ▼'
            }
          </Text>
        </View>
      </View>
      <View style={[sContainer.flex]}>

      </View>
      <View style={spacing.pb20}>
        <Text style={[sText.subtitle, spacing.ph20, spacing.mb10]}>
          Actions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[sContainer.rowBetween, spacing.gap10, spacing.ph20]}>
            {
              !noAccount && (
                <>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>+ Transaction</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>+ Debt</Text>
                  </TouchableHighlight>
                </>
              )
            }
            <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
              <Text style={sButton.outlineText}>New Account</Text>
            </TouchableHighlight>
            {
              !noAccount && (
                <>
                  <TouchableHighlight onPress={goToNewAccount} underlayColor={colors.gray.medium} style={sButton.outline}>
                    <Text style={sButton.outlineText}>New Currency</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={onDeleteWarning} onLongPress={deleteAccount} underlayColor={colors.gray.medium} style={[sButton.outline, border.red]}>
                    <Text style={[sButton.outlineText, sText.red]}>Delete Account</Text>
                  </TouchableHighlight>
                </>
              )
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}