import { create } from 'zustand'

// 创建store
export const useStore = create((set, get) => {
  return {
    // ====== 状态 ======
    wordsList: [], // 20 个单词
    currentIndex: 0, // 当前是第几个
    userInput: [], // 当前单词的输入进度 ['あ', 'の']
    // ====== actions ======

    // 设置从后端拿到的单词
    setWords: (wordsList) =>
      set({
        wordsList,
        currentIndex: 0,
        userInput: [],
      }),

    initCurrentWord: () => {
      const { wordsList, currentIndex } = get()
      const length = [...wordsList[currentIndex].kana].length
      set({ userInput: Array(length).fill('') })
    },

    // 输入一个字符
    inputAtIndex: (index, char) => {
      const { wordsList, currentIndex, userInput } = get()
      const answerChars = [...wordsList[currentIndex].kana]

      // 错误
      if (answerChars[index] !== char) {
        set({ userInput: Array(answerChars.length).fill('') })
        return false
      }

      // 正确
      const newInput = [...userInput]
      newInput[index] = char
      set({ userInput: newInput })

      // 是否完成
      const finished = newInput.every((c) => c !== '')
      if (finished) {
        set({
          currentIndex: currentIndex + 1,
          userInput: [],
        })
      }

      return true
    },
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      }))
    },
    // 更新单词的数据
    freshWordsList: (list) => {
      set(() => ({
        wordsList: list,
      }))
    },
  }
})
