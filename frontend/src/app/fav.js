import {View, Text, ScrollView, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

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

