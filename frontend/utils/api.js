// api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 用于存储 JWT

const api = axios.create({
    baseURL: 'http://localhost:8080', // 换成你后端 IP + 端口
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器：自动附带 token
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器：可统一处理错误
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('后端返回错误:', error.response.data);
        } else {
            console.error('请求出错:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
