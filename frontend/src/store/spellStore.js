import { create } from 'zustand'

// 创建store
export const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      }))
    },
    // 单词测试数据
    wordsList: [],
    // 更新单词的数据
    freshWordsList: (list) => {
      set(() => ({
        wordsList: list,
      }))
    },
  }
})
