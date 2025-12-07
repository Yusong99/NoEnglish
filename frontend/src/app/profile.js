import {View, Text, ScrollView, StyleSheet, Button} from "react-native";
import LoginRegister from "./pages/LoginRegister";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from "expo-router";

export default function ProfileScreen() {
    const clickToLogin = () => {
        console.log("clickToLogin");
        router.replace('/pages/LoginRegister')
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Ionicons name="checkmark-circle" size={32} color="green" />
                <Button title={'test'} onPress={clickToLogin}></Button>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})
