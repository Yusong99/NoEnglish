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
  }
})
