// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import Toast from "react-native-toast-message";

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>欢迎来到首页！</Text>
            {/* 可选：退出登录回到登录页 */}
            <Button title="退出登录" onPress={() => navigation.replace('Login')} />
        </View>
    );
}
