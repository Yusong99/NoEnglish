import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useStore } from '../store/spellStore'
import api from '../utils/api'

export default function SpellScreen() {
  const { level } = useLocalSearchParams()
  const {
    wordsList,
    currentIndex,
    userInput,
    setWords,
    initCurrentWord,
    updateTempInput,
    checkCurrentAnswer,
    isSingleKana,
  } = useStore()

  const inputRefs = useRef([])

  // 拉取单词
  useEffect(() => {
    async function fetchWords() {
      const res = await api.get('/api/vocab/random', {
        params: { level },
      })
      if (res.data.code === 200) {
        setWords(res.data.data)
        initCurrentWord()
      }
    }
    fetchWords()
  }, [level])

  const currentWord = wordsList[currentIndex]
  if (!currentWord) {
    return <Text>加载中...</Text>
  }

  const kanaChars = [...currentWord.kana]

  // ===== 输入处理（核心）=====
  const handleChange = (text, index) => {
    // 1️⃣ 已经转换成一个假名（罗马字 or 假名键盘）
    if (isSingleKana(text)) {
      updateTempInput(index, text)

      // 自动跳到下一个
      if (index < kanaChars.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // 是否全部完成
      const finished =
        userInput.filter(Boolean).length + 1 === kanaChars.length

      if (finished) {
        checkCurrentAnswer()
      }

      return
    }

    // 2️⃣ 罗马字组合中（j / jy / jyo）
    updateTempInput(index, text)
  }

  const renderInput = ({ index }) => (
    <TextInput
      ref={(ref) => (inputRefs.current[index] = ref)}
      style={styles.input}
      value={userInput[index] || ''}
      onChangeText={(text) => handleChange(text, index)}
      autoCapitalize="none"
      autoCorrect={false}
      textAlign="center"
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{currentWord.word}</Text>
      <Text style={styles.meaning}>{currentWord.meaning}</Text>

      <FlatList
        data={kanaChars}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderInput}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'center' }}
      />

      <Text style={styles.progress}>
        进度: {currentIndex + 1} / {wordsList.length}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E9ECEF',
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  meaning: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    borderRadius: 8,
    fontSize: 20,
    marginHorizontal: 6,
    backgroundColor: '#F5F5F5',
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
  },
})
