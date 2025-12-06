import {View, Text, ScrollView} from "react-native";
import AuthScreen from "../components/login_register";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView>
            <StatusBar></StatusBar>
            <AuthScreen></AuthScreen>
            <Text>这是我的页面</Text>
        </SafeAreaView>
    );
}
