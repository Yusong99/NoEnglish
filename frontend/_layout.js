import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      {/* 未登录 → 显示 auth 路由 */}
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
