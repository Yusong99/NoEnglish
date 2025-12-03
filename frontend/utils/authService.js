// authService.js
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (username, password) => {
    try {
        const res = await api.post('/auth/register', { username, password });
        return res.data; // 可以返回 { message: '注册成功' }
    } catch (error) {
        throw error.response?.data || { message: '注册失败' };
    }
};

export const login = async (username, password) => {
    try {
        const res = await api.post('/auth/login', { username, password });
        console.log(res);
        // const token = res.data.token; // 假设后端返回 { token: '...' }
        // await AsyncStorage.setItem('token', token); // 保存到本地
        // return token;
    } catch (error) {
        throw error.response?.data || { message: '登录失败' };
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
};
