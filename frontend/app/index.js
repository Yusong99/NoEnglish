import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {request} from '../utils/request'
import AuthScreen from '../components/login_register';

export default function App() {
    const [userName, setUserName] = useState(1);
    const [userPwd, setUserPwd] = useState(1);
    return (
        <ScrollView>
            {/*<View style={styles.container}>*/}
            {/*    <TextInput style={styles.input} placeholder={"请输入用户名"} onChangeText={text => setUserName(text)}*/}
            {/*               defaultValue={userName}>*/}
            {/*    </TextInput>*/}
            {/*    <TextInput style={styles.input} placeholder={"请输入密码"} onChangeText={text => setUserPwd(text)}*/}
            {/*               defaultValue={userPwd}>*/}
            {/*    </TextInput>*/}
            {/*    <TouchableOpacity style={styles.reload} onPress={request()}>*/}
            {/*        <Text style={styles.label}>登录</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.reload}>*/}
            {/*        <Text style={styles.label}>注册</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <AuthScreen></AuthScreen>
        </ScrollView>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        marginTop: 200,
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
    },
    reload: {
        width: 50,
        marginTop: 10,
        backgroundColor: '#1f99b0',
        height: 40,
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 100
    },
    label: {
        color: '#fff',
        lineHeight: 40
    }
});
