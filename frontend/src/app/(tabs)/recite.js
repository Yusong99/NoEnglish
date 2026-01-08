// 首页-背词界面
import { useEffect, useState } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import api from '../../utils/api.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ReciteScreen() {
  const [dicList, setDiclist] = useState([])
  useEffect(() => {
    async function fecth() {
      // 拉取辞书列表
      const res = await api.get('/api/dictionaries', {
        params: {
          lang: 'ja',
        },
      })
      // 缓存N2辞书单词列表到本地存储
      const res2 = await api.get('/api/vocab/random', {
        params: {
          level: 'N2',
        },
      })
      if (res2.data.code === 200) {
        await AsyncStorage.setItem('wordsList', JSON.stringify(res2.data.data))
      }
      setDiclist(res.data)
    }
    fecth().then()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // 点击后跳转到背诵页面，并传递所选辞书的级别参数
        router.push({
          pathname: '/pages/spell',
          params: { level: item.level },
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
    <>
      <Text style={styles.header}>选择一本辞书</Text>
      <FlatList
        data={dicList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E9ECEF',
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
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
