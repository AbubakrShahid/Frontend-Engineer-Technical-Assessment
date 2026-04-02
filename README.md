# AI Chat Assistant

A polished AI chat application built as a Frontend Engineer Technical Assessment. Features real-time streaming responses, multi-conversation management, persistent chat history, and a responsive UI with light/dark themes.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode, no `any` or `unknown`)
- **State Management:** Redux Toolkit + Redux Persist
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **AI:** OpenAI GPT-4o Mini (streaming via SSE)
- **Fonts:** Inter + JetBrains Mono

## What We Built

### Core Features

- **AI Chat Interface** — Send prompts to OpenAI and receive responses in a clean chat UI
- **Real-time Streaming** — Token-by-token response rendering via Server-Sent Events, just like ChatGPT
- **Markdown Rendering** — Full markdown support including tables, lists, bold, links, blockquotes, and syntax-highlighted code blocks with one-click copy
- **Light & Dark Theme** — System-aware theme with manual toggle and smooth transitions
- **Responsive Design** — Fully responsive layout that works on desktop and mobile

### Extra Features

- **Multi-Conversation Support** — Create, switch between, and delete multiple conversations with auto-generated titles
- **Collapsible Sidebar** — Conversation history with timestamps, message counts, and relative dates (slide-over drawer on mobile)
- **Streaming Cursor** — Blinking caret animation while the AI is typing
- **"Thinking" Indicator** — Animated loading state before the stream begins
- **Stop Generation** — Abort an in-progress response with a single click
- **Copy Messages** — Copy any assistant message to clipboard
- **Auto-resize Input** — Textarea grows with content, up to 6 rows
- **Keyboard Shortcuts** — `Cmd+Shift+N` new chat, `Cmd+Shift+O` toggle sidebar
- **Error Handling** — Graceful error banners for API failures with dismiss
- **Server-side API Routes** — OpenAI API key never reaches the client; all calls proxy through `/api/chat` and `/api/title`

### Bonus Features

- **Persistent Chat History** — All conversations are saved and restored across browser refreshes using Redux Persist with localStorage
- **Clear Chat** — Clear the current conversation with a single click (trash icon in header)

## Setup

### Prerequisites

- Node.js 20+ and Yarn
- An OpenAI API key

### Installation

```bash
git clone https://github.com/AbubakrShahid/Ai-Chat-Assistant.git
cd Ai-Chat-Assistant
yarn install
```

Create a `.env.local` file:

```
OPENAI_API_KEY=sk-your-key-here
```

### Run

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
yarn build
yarn start
```

## Directory Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          — Streaming SSE endpoint for OpenAI
│   │   └── title/route.ts         — Auto-generate conversation titles
│   ├── layout.tsx                  — Root layout with providers
│   ├── page.tsx                    — Main page
│   └── globals.css                — Theme variables and animations
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx     — Main orchestrator with sidebar + chat
│   │   ├── chat-message.tsx       — Message bubble with copy and markdown
│   │   ├── empty-state.tsx        — Welcome screen with feature cards
│   │   ├── loading-indicator.tsx  — "Thinking..." animation
│   │   ├── markdown-renderer.tsx  — Markdown + code block rendering
│   │   ├── prompt-input.tsx       — Input with autosize and send/stop
│   │   └── sidebar.tsx            — Conversation list with CRUD
│   ├── ui/                        — Shadcn UI primitives
│   ├── providers.tsx              — Redux + Theme + Tooltip providers
│   └── theme-toggle.tsx           — Light/Dark mode toggle
├── hooks/
│   ├── use-media-query.ts         — Responsive breakpoint hook
│   └── use-stream-chat.ts         — SSE streaming hook with abort
├── store/
│   ├── index.ts                   — Redux store with persist config
│   ├── chat-slice.ts              — Multi-conversation state management
│   ├── storage.ts                 — SSR-safe localStorage wrapper
│   └── hooks.ts                   — Typed dispatch and selector hooks
├── types/
│   └── chat.ts                    — TypeScript interfaces
└── lib/
    └── utils.ts                   — Utility functions
```
