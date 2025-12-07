import {View, StyleSheet, Button} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from "expo-router";

export default function ProfileScreen() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Ionicons name="checkmark-circle" size={32} color="green" />
                <Button title={'我要登录'} onPress={() => router.push('/auth/login')}></Button>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})
