import { create } from 'zustand'

// 检查字符是否为平假名
function isHiragana(char) {
  const code = char.charCodeAt(0)
  return code >= 0x3041 && code <= 0x3096
}

// 检查字符是否为片假名
function isKatakana(char) {
  const code = char.charCodeAt(0)
  return code >= 0x30A1 && code <= 0x30FA
}

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
    inputAtIndex: (index, text) => {
      const { wordsList, currentIndex, userInput } = get()
      const answerChars = [...wordsList[currentIndex].kana]
      // 检查是否为单个假名字符
      if (text.length !== 1 || (!isHiragana(text) && !isKatakana(text))) {
        set({ userInput: Array(answerChars.length).fill('') })
        return false
      }
      // 错误
      if (text !== answerChars[index]) {
        set({ userInput: Array(answerChars.length).fill('') })
        return false
      }

      // 正确
      const newInput = [...userInput]
      newInput[index] = text
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
    // 临时输入（不校验）
    updateTempInput: (index, text) => {
      const { userInput } = get()
      const newInput = [...userInput]
      newInput[index] = text
      set({ userInput: newInput })
    },
    //输入法确认后再校验
    handleConfirm: (index, text) => {
      const { words, currentIndex, userInput } = get()
      const answer = [...words[currentIndex].word]

      if (text !== answer[index]) {
        // 错误：全部清空
        set({ userInput: Array(answer.length).fill('') })
        return false
      }

      // 正确 → 跳到下一个
      if (index === answer.length - 1) {
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
