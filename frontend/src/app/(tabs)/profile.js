import {View, StyleSheet, Button, TouchableOpacity, Image, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useState, useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

export default function ProfileScreen() {
    const defaultAvatar = "../../assets/icon.png";
    const [avatar, setAvatar] = useState('');
    useEffect( () => {
        async function fetchData(){
            const savedAvatar = await AsyncStorage.getItem("avatar");
            console.log('avatar' + savedAvatar)
            setAvatar(savedAvatar);
            console.log(avatar? 'true' : 'false')
        }
        fetchData().then(r => null)
    },[])
    const userId = 1; // 登录后从缓存/全局变量读取
    const pickImage = async () => {
        // 请求权限
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("需要访问相册权限！");
            return;
        }

        // 选择图片
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true, // 允许裁剪
            aspect: [1, 1], // 固定正方形
            quality: 0.8,
        });

        if (!result.canceled) {
            await uploadAvatar(result.assets[0].uri);
        }
    };
    const uploadAvatar = async (uri) => {
        try {
            let formData = new FormData();
            formData.append("file", {
                uri,
                type: "image/jpeg",
                name: "avatar.jpg",
            });
            formData.append("userId", userId);

            const res = await api.post(
                "http://192.168.124.4:8080/auth/user/avatar", // 注意不要用 localhost，换成电脑局域网 IP
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setAvatar(res.data.data); // 更新头像
            await AsyncStorage.setItem("avatar", res.data.data);
        } catch (err) {
            console.log("上传失败:", err);
        }
    };

    // 设置头像url
    const avatarSource =
        avatar && avatar !== 'null' && avatar.startsWith('http')
            ? { uri: avatar.replace('localhost', '192.168.124.4') }
            : require('../../assets/avatar.png');

    return (
        <SafeAreaView>
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={ avatarSource }
                               style={styles.avatar}/>
                    </TouchableOpacity>
                </View>
                <Button title={'我要登录'} onPress={() => router.push('/auth/login')}></Button>
                <Text style={styles.name}>{AsyncStorage.getItem('userName')}</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { alignItems: "center", marginTop: 40 },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ddd",
    },
    name: {
        fontSize: 20,
        textAlign: "center",
    }
})
