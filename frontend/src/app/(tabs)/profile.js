import {View, StyleSheet, Button, TouchableOpacity, Image, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useState, useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";
import {Avatar} from '@rneui/themed';

export default function ProfileScreen() {
    const defaultAvatar = "../../assets/icon.png";
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        async function fetchData() {
            const savedAvatar = await AsyncStorage.getItem("avatar");
            setAvatar(savedAvatar);
        }

        fetchData().then(r => null)
    }, [])
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

    const avatarMap = {
        1: require('../../assets/avatars/Multiavatar-avatar1.png'),
        2: require('../../assets/avatars/Multiavatar-avatar2.png'),
        3: require('../../assets/avatars/Multiavatar-avatar3.png'),
        4: require('../../assets/avatars/Multiavatar-avatar4.png'),
        5: require('../../assets/avatars/Multiavatar-avatar5.png'),
        6: require('../../assets/avatars/Multiavatar-avatar6.png'),
        7: require('../../assets/avatars/Multiavatar-avatar7.png'),
        8: require('../../assets/avatars/Multiavatar-avatar8.png'),
        9: require('../../assets/avatars/Multiavatar-avatar9.png'),
        10: require('../../assets/avatars/Multiavatar-avatar10.png'),
        11: require('../../assets/avatars/Multiavatar-avatar11.png'),
        12: require('../../assets/avatars/Multiavatar-avatar12.png'),
        13: require('../../assets/avatars/Multiavatar-avatar13.png'),
        14: require('../../assets/avatars/Multiavatar-avatar14.png'),
        15: require('../../assets/avatars/Multiavatar-avatar15.png'),
        16: require('../../assets/avatars/Multiavatar-avatar16.png'),
        17: require('../../assets/avatars/Multiavatar-avatar17.png'),
        18: require('../../assets/avatars/Multiavatar-avatar18.png'),
        19: require('../../assets/avatars/Multiavatar-avatar19.png'),
        20: require('../../assets/avatars/Multiavatar-avatar20.png'),
        21: require('../../assets/avatars/Multiavatar-avatar21.png'),
        22: require('../../assets/avatars/Multiavatar-avatar22.png'),
        23: require('../../assets/avatars/Multiavatar-avatar23.png'),
        24: require('../../assets/avatars/Multiavatar-avatar24.png'),
        25: require('../../assets/avatars/Multiavatar-avatar25.png'),
        26: require('../../assets/avatars/Multiavatar-avatar26.png'),
        27: require('../../assets/avatars/Multiavatar-avatar27.png'),
        28: require('../../assets/avatars/Multiavatar-avatar28.png'),
        29: require('../../assets/avatars/Multiavatar-avatar29.png'),
        30: require('../../assets/avatars/Multiavatar-avatar30.png'),
    };

    // 更新头像Id
    const selectAvatar = async (avatarKey) => {
        try {
            const res = await api.post('/user/avatarId', {
                avatarKey,
            });

            const avatarUrl = res.data.data;

            await AsyncStorage.setItem("avatarId", avatarKey);
        } catch (e) {
            console.log('设置头像失败', e);
        }
    };

    const avatarSource = avatarMap[1]
    console.log(avatarSource)
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={avatar ? {uri: avatar.replace("localhost", "192.168.124.4")} : require('../../assets/avatar.png')}
                        style={styles.avatar}/>
                </TouchableOpacity>
            </View>
            <Button title={'我要登录'} onPress={() => router.push('/auth/login')}></Button>
            <Text style={styles.name}>{AsyncStorage.getItem('userName')}</Text>
            <Avatar
                size={64}
                rounded={true}
                source={require('../../assets/avatars/Multiavatar-avatar30.png')}
                avatarStyle={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    resizeMode: 'contain',
                }}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {alignItems: "center", marginTop: 40},
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
