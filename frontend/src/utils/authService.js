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
        if (res.data?.code === 200) {
            const token = res.data.data.token; // 假设后端返回 { token: '...' }
            const userId = res.data.data.id;
            const avatar = res.data.data.avatarUrl;
            const userName = res.data.data.username;
            // 确保不会把字符串null存进去，如果为空就存进去空字符串，不影响以后判断
            await AsyncStorage.setItem('userName', userName ? userName + '' : '');
            await AsyncStorage.setItem('token', token ? userId + '' : ''); // 保存到本地
            await AsyncStorage.setItem('userId', userId ? userId + '' : '');
            await AsyncStorage.setItem('avatar', avatar ? avatar + '' : '');
            Toast.show({
                type: 'success',
                text1: "登录成功",
                autoHide: true,
                visibilityTime: 1000,
            })
            router.navigate('/(tabs)/profile'); //登陆成功后跳转的界面
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
