import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../utils/api'
import { Input, Button, Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

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
      <View style={styles.listItem}>
        <Text style={styles.word}>{item.word}</Text>

        {item.reading && <Text style={styles.reading}>{item.reading}</Text>}

        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: '#E9ECEF', flex: 1 }}>
      <View style={styles.container}>
        {/* 搜索框 */}
        <View style={styles.searchBox}>
          <Input
            value={keyword}
            onChangeText={setKeyword}
            placeholder="输入日语单词"
            placeholderTextColor={silverTheme.placeholderColor}
            // 1. 这里的 containerStyle 控制整个组件占用的空间
            containerStyle={styles.inputOuterContainer}
            // 2. 这里的 inputContainerStyle 才是你看到的那个“银灰色框”
            inputContainerStyle={silverTheme.inputContainer}
            inputStyle={silverTheme.inputText}
            onSubmitEditing={onSearch}
            // 3. 左侧图标
            rightIcon={
              <Icon
                name="search"
                type="feather"
                size={20}
                color={silverTheme.iconColor}
                containerStyle={{ marginRight: 8 }} // 让图标和文字有点距离
                onPress={onSearch}
              />
            }
          />
        </View>

        {/* 结果列表 */}
        {loading && <Text style={{ textAlign: 'center', padding: 10 }}>加载中...</Text>}

        <View style={styles.listContainer}>
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
              loading ? <Text style={{ textAlign: 'center', padding: 10 }}>加载中...</Text> : null
            }
          />
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button title="查看缓存" onPress={logStorage} />
        <Button
          title="清空本地登录状态"
          onPress={async () => {
            await AsyncStorage.clear()
            console.log('token 已清空')
          }}
        />
      </View>
    </View>
  )
}
const silverTheme = {
  // 容器样式：控制外边距
  container: {
    paddingHorizontal: 0,
    marginVertical: 5,
  },
  // 输入框外框：这是实现“银色质感”的核心
  inputContainer: {
    backgroundColor: '#F5F5F5', // 极浅的底色
    borderRadius: 10,
    borderBottomWidth: 0, // 去掉原生的下划线
    paddingHorizontal: 15,
    // 银灰色边框
    borderWidth: 1,
    borderColor: '#D1D9E6',
    // 阴影效果（仅 iOS 有效，Android 需用 elevation）
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  // 输入文字的样式
  inputText: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  // 占位符颜色
  placeholderColor: '#AAB1B7',
  // 图标颜色
  iconColor: '#8E9AAF',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    paddingTop: 20,
    paddingHorizontal: 15, // 给整个搜索区域留点左右间距
    alignItems: 'center', // 这会让 Button 居中
  },
  inputOuterContainer: {
    paddingHorizontal: 0, // 清除 Input 组件默认的侧边内边距
    width: '100%', // 强制输入框占满屏幕宽度
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonContainer: {
    width: 120, // 稍微宽一点更有质感
    borderRadius: 25, // 圆角大一点配合银色更高级
    marginTop: 10,
    // 按钮阴影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonInner: {
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#546e7a', // 深蓝灰色文字，比纯黑更有高级感
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    width: 80,
    justifyContent: 'center',
    borderRadius: 6,
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
    marginTop: 0,
  },
})
