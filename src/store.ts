import { create } from 'zustand'

import type { Item, HistoryEntry } from './types'
import { getCatalogue, getHistory, getEmptyHistory } from './api'

interface StoreState {
  items: Item[]
  history: HistoryEntry[]
  loading: boolean
  error?: string
  fetchItems: () => Promise<void>
  fetchHistory: (empty?: boolean) => Promise<void>
}

export const useStore = create<StoreState>((set) => ({
  items: [],
  history: [],
  loading: false,
  error: undefined,

  async fetchItems() {
    set({ loading: true, error: undefined })
    try {
      const items = await getCatalogue()
      set({ items, loading: false })
    } catch (e: unknown) {
      if (e instanceof Error) {
        set({ error: e.message, loading: false })
      } else {
        set({ error: 'Unknown error', loading: false })
      }
    }
  },

  async fetchHistory(empty = false) {
    try {
      const data = empty ? await getEmptyHistory() : await getHistory()
      set({ history: data })
    } catch {
      // silent fail, keep empty history
    }
  },
}))
