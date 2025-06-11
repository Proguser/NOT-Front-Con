import type { Item, HistoryEntry } from './types'

const BASE = 'https://not-contest-cdn.openbuilders.xyz/api'

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/${path}`)
  if (!res.ok) throw new Error(res.statusText)
  const data = await res.json()
  return (data.data ?? data.items ?? []) as T
}

export function getCatalogue(): Promise<Item[]> {
  return request<Item[]>('items.json')
}

export function getHistory(): Promise<HistoryEntry[]> {
  return request<HistoryEntry[]>('history.json')
}

export function getEmptyHistory(): Promise<HistoryEntry[]> {
  return request<HistoryEntry[]>('no_history.json')
}
