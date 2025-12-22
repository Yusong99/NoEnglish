import {SafeAreaView} from "react-native-safe-area-context";
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

const DICTIONARIES = [
    {
        id: 'cet4',
        title: 'JLPT N2词汇',
        cover: require('../../assets/dicts/N2.png'),
        description: 'JLPT N2重点词汇',
    },
    {
        id: 'cet6',
        title: '大学英语六级词汇',
        cover: require('../../assets/avatars/Multiavatar-avatar1.png'),
        description: '六级考试常考词汇，进阶提升。',
    },
    {
        id: 'ielts',
        title: 'IELTS 核心词汇',
        cover: require('../../assets/avatars/Multiavatar-avatar3.png'),
        description: '听说读写四项高频词汇。',
    },
    {
        id: 'toefl',
        title: 'TOEFL 词汇精选',
        cover: require('../../assets/avatars/Multiavatar-avatar4.png'),
        description: '学术场景常用词汇。',
    },
];

export default function ReciteScreen() {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.push({
                    pathname: '/dictionary/detail',
                    params: { id: item.id },
                });
            }}
        >
            <Image source={item.cover} style={styles.cover} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>选择一本辞书</Text>
            <FlatList
                data={DICTIONARIES}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 20,
        alignItems: 'center',
    },
    cover: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});