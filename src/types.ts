export interface Item {
  id: number
  name: string
  price: number
  images: string[]
}

export interface HistoryEntry {
  id: number
  total: number
  currency: string
  timestamp: number
}
