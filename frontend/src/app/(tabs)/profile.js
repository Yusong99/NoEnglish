import {View, StyleSheet, Button, TouchableOpacity, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useState} from "react";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
    const defaultAvatar = "../../assets/icon.png";
    const [avatar, setAvatar] = useState(defaultAvatar);
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // 允许裁剪
            aspect: [1, 1], // 固定正方形
            quality: 0.8,
        });

        if (!result.canceled) {
            await uploadAvatar(result.assets[0].uri);
        }
    };
    const uploadAvatar = async (uri) => {
        let formData = new FormData();

        // 关键：React Native 上传图片必须带 type 和 namer
        formData.append("file", {
            uri,
            type: "image/jpeg",
            name: "avatar.jpg",
        });

        formData.append("userId", userId);

        const res = await fetch("http://@localhost/user/avatar", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        const data = await res.json();
        setAvatar(data.data); // 更新头像
    };

    return (
        <SafeAreaView>
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    </TouchableOpacity>
                </View>
                <Button title={'我要登录'} onPress={() => router.push('/auth/login')}></Button>
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
})
