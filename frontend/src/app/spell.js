import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useStore } from '../store/spellStore.js'
import api from '../utils/api.js'

export default function SpellScreen() {
  const { level } = useLocalSearchParams()
  const {
    wordsList,
    currentIndex,
    userInput,
    setWords,
    initCurrentWord,
    inputAtIndex,
    updateTempInput,
  } = useStore()

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

  const renderInput = ({ item, index }) => (
    <TextInput
      style={styles.input}
      value={userInput[index] || ''}
      onChangeText={(text) => updateTempInput(index, text)}
      onSubmitEditing={() => inputAtIndex(index, userInput[index])}
      maxLength={1}
      autoCapitalize="none"
      autoCorrect={false}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{currentWord.word}</Text>
      <Text style={styles.meaning}>{currentWord.meaning}</Text>
      <FlatList
        data={kanaChars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInput}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text>
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
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: '#F5F5F5',
  },
})
