import React, { useState } from 'react'
import { register } from '../../utils/authService'
import Toast from 'react-native-toast-message'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message] = useState('')
  const handleRegister = async () => {
    try {
      await register(username, password)
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.message,
        autoHide: true,
        visibilityTime: 2000,
      })
      return null
    }
  }

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TextInput
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.label}>注册</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 20 }}>{message}</Text>
    </SafeAreaView>
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
