# NOT Market Frontend

NOT Market is a lightweight Telegram mini application built with **React**, **TypeScript** and **Vite**. State is managed with **Zustand** and styling is provided by **Tailwind CSS**. The application consumes the contest API to display catalogue items and a user's purchase history. A small Telegram bot is included for launching the app inside Telegram.

## Features

- Fetches catalogue items from `https://not-contest-cdn.openbuilders.xyz/api/items.json`.
- Loads purchase history from `https://not-contest-cdn.openbuilders.xyz/api/history.json`.
- Shows an empty history example from `https://not-contest-cdn.openbuilders.xyz/api/no_history.json`.
- Integration with the [Telegram Web App](https://core.telegram.org/bots/webapps) so the mini app can greet a user by their Telegram username and expand to full screen.
- Simple Telegram bot in the `telegram-bot/` directory that sends a button to open the Web App.

## Getting Started

Install dependencies with:

```bash
npm install
```

### Available Scripts

- `npm run dev` – start the development server.
- `npm run build` – build the production bundle.
- `npm run preview` – preview the built app locally.
- `npm run bot` – start the Telegram bot (requires the `BOT_TOKEN` environment variable).
- `npm run lint` – run ESLint to check the codebase.

### Telegram Bot

Provide your bot token via the `BOT_TOKEN` environment variable. Optionally set `WEB_APP_URL` to point to the deployed frontend URL (defaults to `http://localhost:5173/`).

Run the bot with:

```bash
BOT_TOKEN=YOUR_TOKEN npm run bot
```

## Running Tests

This project does not yet contain automated tests. You can still lint the codebase by running:

```bash
npm run lint
```

When a test suite is added you will be able to run it with `npm test`.

## Project Overview

The mini app fetches data from the contest API and displays a simple list of catalogue items. When launched via the Telegram bot it greets the user and allows toggling between catalogue items and purchase history.

