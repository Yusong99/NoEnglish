import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import api from '../../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ReciteScreen() {
  const [dicList, setDiclist] = useState([])
  useEffect(() => {
    async function fecth() {
      const res = await api.get('/api/dictionaries', {
        params: {
          lang: 'ja',
        },
      })
      const res2 = await api.get('/api/vocab/random', {
        params: {
          level: 'N2',
        },
      })
      if (res2.data.code === 200) {
        await AsyncStorage.setItem('wordsList', JSON.stringify(res2.data.data))
      }
      setDiclist(res.data)
      console.log(JSON.stringify(res.data, null, 2))
    }
    fecth().then()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: '/dictionary/detail',
          params: { id: item.id },
        })
      }}
    >
      <Image
        source={{ uri: item.coverUrl.replace('localhost', '192.168.124.4') }}
        style={styles.cover}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>选择一本辞书</Text>
      <FlatList
        data={dicList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
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
})
