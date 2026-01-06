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
      })
  }
  const inputRefs = useRef([])

  const handleInput = (index, text) => {
    if (!text) return

    const char = text.slice(-1)
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
