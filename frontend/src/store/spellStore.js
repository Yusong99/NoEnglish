import { create } from 'zustand'
import { splitKanaAdvanced } from '../utils/kana'
import Toast from 'react-native-toast-message'

export const useStore = create((set, get) => ({
  // ===== 状态 =====
  wordsList: [],
  currentIndex: 0,
  userInput: [], // 音拍数组，如 ['ちゅ', 'う']

  // ===== 初始化 =====
  setWords: (wordsList) =>
    set({
      wordsList,
      currentIndex: 0,
      userInput: [],
    }),

  initCurrentWord: () => {
    const { wordsList, currentIndex } = get()
    if (!wordsList[currentIndex]) return
    console.log('currtnt'+wordsList[currentIndex].kana);
    
    const kanaList = splitKanaAdvanced(wordsList[currentIndex].kana)
    set({ userInput: Array(kanaList.length).fill('') })
  },

  // ===== 输入中（允许罗马字组合）=====
  updateTempInput: (index, text) => {
    const { userInput } = get()
    const next = [...userInput]
    next[index] = text
    set({ userInput: next })
  },

  // ===== 全部完成后统一校验 =====
  checkCurrentAnswer: () => {
    const { wordsList, currentIndex, userInput } = get()
    const answer = splitKanaAdvanced(wordsList[currentIndex].kana)

    const isCorrect = answer.every(
      (kana, index) => kana === userInput[index]
    )

    if (isCorrect) {
      set({
        currentIndex: currentIndex + 1,
        userInput: [],
      })
      Toast.show({
        type: 'success',
        text1: '回答正确！',
      })
    } else {
      set({
        userInput: Array(answer.length).fill(''),
      })
      Toast.show({
        type: 'error',
        text1: '回答错误，请再试一次！',
      })
    }

    return isCorrect
  },
}))
