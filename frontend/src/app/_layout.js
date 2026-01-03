import { Stack } from 'expo-router'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.pageBackground} edges={['top', 'left', 'right']}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#E9ECEF' }, // 确保 Stack 容器也是灰底
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
      </Stack>
      <Toast></Toast>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: '#E9ECEF', // 页面背景用稍深的灰色，衬托出输入框的亮
  },
})
