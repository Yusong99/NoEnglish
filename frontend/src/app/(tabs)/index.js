import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function App() {
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>欢迎来到首页！</Text>
            </View>
        </>
    )
        ;
}
StyleSheet.create({
    container: {
        marginTop: 200,
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        color: 'red',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
    },
    reload: {
        width: 50,
        marginTop: 10,
        backgroundColor: '#1f99b0',
        height: 40,
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 100
    },
    label: {
        color: '#fff',
        lineHeight: 40
    }
});
