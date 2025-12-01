import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login, register } from '../utils/authService';

export default function AuthScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await register(username, password);
            setMessage(res.message);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            setMessage('登录成功！Token 已保存');
            console.log('JWT Token:', token);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
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
            <Button title="注册" onPress={handleRegister} />
            <View style={{ height: 10 }} />
            <Button title="登录" onPress={handleLogin} />
            <Text style={{ marginTop: 20 }}>{message}</Text>
        </View>
    );
}
