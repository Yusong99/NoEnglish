import { create } from 'zustand'

// ===== 工具函数 =====
function isSingleKana(text) {
  // 平假名 or 片假名（完整字符）
  return (
    /^[\u3040-\u309F]$/.test(text) ||
    /^[\u30A0-\u30FF]$/.test(text)
  )
}

// ===== Store =====
export const useStore = create((set, get) => ({
  // ===== 状态 =====
  wordsList: [],
  currentIndex: 0,
  userInput: [],

  // ===== actions =====
  setWords: (wordsList) =>
    set({
      wordsList,
      currentIndex: 0,
      userInput: [],
    }),

  initCurrentWord: () => {
    const { wordsList, currentIndex } = get()
    if (!wordsList[currentIndex]) return
    console.log(wordsList[currentIndex]);
    const kanaList = [...wordsList[currentIndex].kana]
    set({ userInput: Array(kanaList.length).fill('') })
  },

  // 输入中（不校验，允许罗马字输入法的日语出现）
  updateTempInput: (index, text) => {
    const { userInput } = get()
    const next = [...userInput]
    next[index] = text
    set({ userInput: next })
  },

  // 全部完成后统一校验
  checkCurrentAnswer: () => {
    const { wordsList, currentIndex, userInput } = get()
    const answer = [...wordsList[currentIndex].kana]

    const isCorrect = answer.every(
      (kana, index) => kana === userInput[index]
    )

    if (isCorrect) {
      set({
        currentIndex: currentIndex + 1,
        userInput: [],
      })
    } else {
      set({
        userInput: Array(answer.length).fill(''),
      })
    }

    return isCorrect
  },

  isSingleKana,
}))
