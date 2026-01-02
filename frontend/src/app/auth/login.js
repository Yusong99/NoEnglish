import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { login } from '../../utils/authService'
import Toast from 'react-native-toast-message'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await login(username, password).then((token) => {
        if(token) router.replace('/(tabs)/profile')
      })
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.message,
        autoHide: true,
        visibilityTime: 2000,
        position: 'bottom',
      })
      return null
    }
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.label}>登录</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPassword} onPress={() => router.replace('/auth/register')}>
        <Text style={styles.forgotPasswordText}>忘记密码？</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // 按钮组居中
    alignItems: 'center',
    gap: 20,
  },
  label: {
    color: 'black',
    lineHeight: 40,
  },
  btn: {
    width: 120, // 给定相同宽度 → 对称
    paddingVertical: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 8,
  },
})
