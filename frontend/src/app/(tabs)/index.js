import {Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView} from "react-native-safe-area-context";

export default function App() {
    const [keyword, setKeyword] = useState('');
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);


    const search = async () => {
        if (!keyword.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(
                `http://192.168.124.4:8080/api/words/search?q=${encodeURIComponent(keyword)}`
            );
            const data = await res.json();
            setList(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };


    async function logStorage() {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        console.log("AsyncStorage 数据：", items);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* 搜索框 */}
                <View style={styles.searchBox}>
                    <TextInput
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholder="输入日语单词"
                        style={styles.input}
                        onSubmitEditing={search}
                    />
                    <TouchableOpacity onPress={search} style={styles.button}>
                        <Text style={styles.buttonText}>搜索</Text>
                    </TouchableOpacity>
                </View>

                {/* 结果列表 */}
                {loading && <Text>加载中...</Text>}

                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.word}>{item.word}</Text>
                            <Text style={styles.reading}>{item.reading}</Text>
                            <Text style={styles.meaning}>{item.meaning}</Text>
                            <Text style={styles.pos}>{item.pos}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                <Text>欢迎来到首页！</Text>
                <Button title="查看缓存" onPress={logStorage} />
            </View>
        </SafeAreaView>
    )
        ;
}
const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        marginBottom: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 10
    },
    button: {
        marginLeft: 8,
        backgroundColor: '#4f46e5',
        paddingHorizontal: 14,
        justifyContent: 'center',
        borderRadius: 6
    },
    buttonText: {
        color: '#fff'
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    word: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    reading: {
        color: '#666'
    },
    meaning: {
        marginTop: 4
    },
    pos: {
        marginTop: 2,
        color: '#999',
        fontSize: 12
    }
});
