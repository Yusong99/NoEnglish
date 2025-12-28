import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../../utils/api'

export default function App() {
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        search(true)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [keyword])

  const onSearch = () => {
    setList([])
    setPage(0)
    setHasMore(true)
    search(true)
  }

  const search = async (reset = false) => {
    if (loading) return

    const nextPage = reset ? 0 : page

    setLoading(true)
    try {
      const res = await api.get('http://192.168.124.4:8080/api/words/search', {
        params: {
          q: keyword,
          page: nextPage,
          size: 10,
        },
      })

      const data = await res.data
      console.log(data)

      setList((prev) => (reset ? data.list : [...prev, ...data.list]))
      setPage(nextPage + 1)
      setHasMore(data.hasMore)
    } finally {
      setLoading(false)
    }
  }

  async function logStorage() {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)
    console.log('AsyncStorage 数据：', items)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.word}</Text>

        {item.reading && <Text style={{ color: '#666' }}>{item.reading}</Text>}

        <Text style={{ marginTop: 4 }}>{item.meaning}</Text>
      </View>
    )
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
          <TouchableOpacity onPress={onSearch} style={styles.button}>
            <Text style={styles.buttonText}>搜索</Text>
          </TouchableOpacity>
        </View>

        {/* 结果列表 */}
        {loading && <Text>加载中...</Text>}

        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasMore && !loading) {
              search()
            }
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading ? <Text style={{ textAlign: 'center' }}>加载中...</Text> : null
          }
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>欢迎来到首页！</Text>
        <Button title="查看缓存" onPress={logStorage} />
        <Button
          title="清空本地登录状态"
          onPress={async () => {
            await AsyncStorage.clear()
            console.log('token 已清空')
          }}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 8,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reading: {
    color: '#666',
  },
  meaning: {
    marginTop: 4,
  },
  pos: {
    marginTop: 2,
    color: '#999',
    fontSize: 12,
  },
})
