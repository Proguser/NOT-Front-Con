import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: {
    user?: { id: number; username?: string }
  }
  colorScheme?: 'light' | 'dark'
  expand?: () => void
  ready?: () => void
}

export function useTelegram() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return
    tg.ready?.()
    tg.expand?.()
    setWebApp(tg)
  }, [])

  return webApp
}
