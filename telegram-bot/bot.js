import { Telegraf } from 'telegraf'

const token = process.env.BOT_TOKEN
const appUrl = process.env.WEB_APP_URL || 'http://localhost:5173/'
if (!token) {
  throw new Error('BOT_TOKEN env variable required')
}

const bot = new Telegraf(token)

bot.start((ctx) => {
  ctx.reply('Welcome to NOT Market!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open App', web_app: { url: appUrl } }]
      ]
    }
  })
})

bot.command('history', async (ctx) => {
  try {
    const res = await fetch('https://not-contest-cdn.openbuilders.xyz/api/history.json')
    const data = await res.json()
    if (!data.length) {
      ctx.reply('No purchase history yet.')
      return
    }
    const lines = data.map((h) => `#${h.id} - ${h.total} ${h.currency}`)
    ctx.reply(`Your orders:\n${lines.join('\n')}`)
  } catch {
    ctx.reply('Failed to load history.')
  }
})

bot.launch().then(() => console.log('Bot started'))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
