import React, { useState } from 'react';
import {View, TextInput, Button, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { login, register } from '../utils/authService';
import {useRouter} from "expo-router";
import Toast from "react-native-toast-message";

export default function AuthScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
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
            setMessage('登录成功！');
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
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.label}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.label}>注册</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 20 }}>忘记密码？</Text>
            <Text style={{ marginTop: 20 }}>{message}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",  // 按钮组居中
        alignItems: "center",
        gap: 20,
    },
    label: {
        color: 'black',
        lineHeight: 40
    },
    btn: {
        width: 120,                 // 给定相同宽度 → 对称
        paddingVertical: 10,
        backgroundColor: "#ddd",
        alignItems: "center",
        borderRadius: 8,
    },
})