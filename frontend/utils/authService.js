// authService.js
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import {router} from "expo-router";

export const register = async (username, password) => {
    try {
        const res = await api.post('/auth/register', { username, password });
        if (res.data?.code === 1006) {
            Toast.show({
                type: 'error',
                text1: '用户名已存在',
                autoHide: true,
                visibilityTime: 2000
            })
            return null
        }
        Toast.show({
            type: 'success',
            text1: "注册成功",
            autoHide: true,
            visibilityTime: 1000,
        })
        return res.data; // 可以返回 { message: '注册成功' }
    } catch (error) {
        throw error.response?.data || { message: '注册失败' };
    }
};

export const login = async (username, password) => {
    try {
        const res = await api.post('/auth/login', { username, password });
        console.log(res)
        if (res.data?.code === 200) {
            const token = res.data.data.token; // 假设后端返回 { token: '...' }
            console.log(token)
            await AsyncStorage.setItem('token', token); // 保存到本地
            Toast.show({
                type: 'success',
                text1: "登录成功",
                autoHide: true,
                visibilityTime: 1000,
            })
            router.navigate('/HomeScreen'); // replace 防止返回登录页
            return token;
        }else if (res.data?.code === 1001) {
            Toast.show({
                type: 'error',
                text1: "用户名或密码错误",
                autoHide: true,
                visibilityTime: 1000,
            })
            return null
        }
    } catch (error) {
        throw error.response?.data || { message: '登录失败' };
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
};
