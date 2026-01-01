import { StyleSheet, Button, View, TextInput } from 'react-native'
import { Input } from '@rneui/themed'
import { useStore } from '../../store/spellStore'
import { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useRef } from 'react'

export default function FavScreen() {
  const {
    userInput,
    inputAtIndex,
    wordsList,
    initCurrentWord,
    currentIndex,
    freshWordsList,
    handleConfirm,
    updateTempInput,
  } = useStore()
  const setWords = useStore((state) => state.setWords)
  useEffect(() => {
    if (wordsList.length > 0) {
      initCurrentWord()
    }
  }, [currentIndex, wordsList])
  const word = wordsList[currentIndex]?.kana || ''
  const chars = [...word]
  const currentWord = wordsList[currentIndex]?.kana ?? ''
  const answerChars = [...currentWord] // ['あ','の','ひ','と']
  const getWords = async () => {
    await api
      .get('/api/vocab/random', {
        params: {
          level: 'N2',
        },
      })
      .then((response) => {
        // freshWordsList(response.data.data)
        setWords(response.data.data)
        console.log(wordsList[0].kana)
        console.log(wordsList)
      })
  }
  const inputRefs = useRef([])

  const handleInput = (index, text) => {
    if (!text) return

    const char = text.slice(-1)
    console.log('duan dian 1')
    console.log('duan dian 2')
    const ok = handleConfirm(index, text)

    if (ok) {
      inputRefs.current[index + 1]?.focus()
    } else {
      inputRefs.current[0]?.focus()
    }
  }
  return (
    <>
      <Input
        placeholder=""
        containerStyle={{ width: 50 }}
        inputStyle={{ fontSize: 30, fontWeight: 'bold' }}
      ></Input>
      <Input placeholder="BASIC INPUT"></Input>
      <View style={styles.row}>
        {answerChars.map((_, index) => (
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            value={userInput[index] ?? ''}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => {
              // 只更新显示，不校验
              updateTempInput(index, text)
            }}
            onEndEditing={(e) => {
              const text = e.nativeEvent.text
              handleConfirm(index, text)
            }}
          />
        ))}
      </View>
      <Button title={'点击'} onPress={getWords}></Button>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 200,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 24,
  },
})
