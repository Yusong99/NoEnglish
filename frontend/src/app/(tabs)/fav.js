import {Text, ScrollView, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";

export default function FavScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar></StatusBar>
                <Text style={styles.text}>这是收藏页</Text>
                <Text style={styles.text}>这是收藏页</Text>
                <Text style={styles.text}>这是收藏页</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 200,
    }
})

