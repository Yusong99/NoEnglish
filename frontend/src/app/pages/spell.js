// 背单词页面
import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useStore } from '../../store/spellStore'
import api from '../../utils/api'
import { splitKanaAdvanced, isCompleteKana } from '../../utils/kana'

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
  } = useStore()

  const inputRefs = useRef([])

  // 获取单词
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

  const kanaUnits = splitKanaAdvanced(currentWord.kana)

  // ===== 输入处理（核心）=====
  const handleChange = (text, index) => {
    // 基于“即将写入”的状态计算
    const nextInput = [...userInput]
    nextInput[index] = text

    updateTempInput(index, text)

    // ① 只有“完整音拍”才允许跳格
    if (isCompleteKana(text)) {
      if (index < kanaUnits.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    // ② finished 判断：每一格都是完整音拍
    const finished = nextInput.every((v) => isCompleteKana(v))

    console.log('finished :', finished)
    console.log('userInput', nextInput.join(','))

    if (finished) {
      checkCurrentAnswer()
    }
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
        data={kanaUnits}
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
    width: 64,
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
