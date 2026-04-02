# AI Chat Assistant

A production-grade AI chat application with real-time streaming responses, multi-conversation management, and a polished UI. Built with **Next.js 15**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS v4**, and **Shadcn UI**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)

## Features

### Core
- **Real-time Streaming** — Token-by-token response rendering via Server-Sent Events (SSE), just like ChatGPT
- **Multi-Conversation** — Create, switch between, and delete multiple conversations with auto-generated titles
- **Markdown Rendering** — Full markdown support including tables, lists, bold, links, and blockquotes
- **Code Syntax Highlighting** — Syntax-highlighted code blocks with language labels and one-click copy
- **Light & Dark Theme** — System-aware theme with manual toggle and smooth transitions

### UX Polish
- **Collapsible Sidebar** — Conversation history with timestamps, message counts, and relative dates
- **Streaming Cursor** — Blinking caret animation while the AI is typing
- **"Thinking" Indicator** — Animated state before the stream begins
- **Stop Generation** — Abort an in-progress response with a single click
- **Copy Messages** — Copy any assistant message to clipboard
- **Auto-resize Input** — Textarea grows with content, up to 6 rows
- **Keyboard Shortcuts** — `Cmd+Shift+N` new chat, `Cmd+Shift+O` toggle sidebar
- **Persistent History** — All conversations survive browser refresh via Redux Persist
- **Error Handling** — Graceful error banners for API failures with dismiss

## Tech Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| Framework        | Next.js 15 (App Router)                 |
| Language         | TypeScript (strict, no `any`)           |
| State Management | Redux Toolkit + Redux Persist           |
| Styling          | Tailwind CSS v4 + Shadcn UI            |
| AI API           | OpenAI GPT-4o Mini (streaming)          |
| Markdown         | react-markdown + remark-gfm + rehype-highlight |
| Theming          | next-themes                             |

## Getting Started

### Prerequisites

- Node.js 20+ and Yarn installed
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/AbubakrShahid/Frontend-Engineer-Technical-Assessment.git
cd Frontend-Engineer-Technical-Assessment

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
yarn start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Streaming SSE endpoint for OpenAI
│   │   └── title/route.ts         # Auto-generate conversation titles
│   ├── layout.tsx                  # Root layout with Providers
│   ├── page.tsx                    # Main page
│   └── globals.css                 # Theme, scrollbar, streaming cursor
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx      # Main orchestrator with sidebar + chat
│   │   ├── chat-message.tsx        # Message bubble with copy and markdown
│   │   ├── empty-state.tsx         # Welcome screen with feature cards
│   │   ├── loading-indicator.tsx   # "Thinking..." animation
│   │   ├── markdown-renderer.tsx   # Markdown + code syntax highlighting
│   │   ├── prompt-input.tsx        # Input with autosize, send/stop buttons
│   │   └── sidebar.tsx             # Conversation list with CRUD
│   ├── ui/                         # Shadcn UI primitives
│   ├── providers.tsx               # Redux + Theme + Tooltip providers
│   └── theme-toggle.tsx            # Light/Dark mode toggle
├── hooks/
│   └── use-stream-chat.ts          # SSE streaming hook with abort control
├── store/
│   ├── index.ts                    # Redux store with persist config
│   ├── chat-slice.ts               # Multi-conversation state management
│   └── hooks.ts                    # Typed useAppDispatch & useAppSelector
├── types/
│   └── chat.ts                     # TypeScript interfaces
└── lib/
    └── utils.ts                    # Utility functions
```

## Architecture Decisions

- **Server-Sent Events (SSE)** — Responses stream token-by-token for a real-time typing effect, using the Web Streams API in the Next.js route handler
- **Redux Toolkit** — Centralized state management for multi-conversation support, with `createSlice` for clean reducer logic and `createAsyncThunk` patterns
- **Redux Persist** — All conversation data persists to `localStorage` automatically, surviving page refreshes without a backend database
- **Server-side API routes** — OpenAI API key never reaches the client; all calls proxy through `/api/chat` and `/api/title`
- **Component composition** — Each chat component is single-responsibility; the `ChatContainer` orchestrates layout while individual components handle their own concerns
- **Strict TypeScript** — Zero `any`, `unknown`, or loose types throughout the entire codebase

## Keyboard Shortcuts

| Shortcut              | Action          |
| --------------------- | --------------- |
| `Enter`               | Send message    |
| `Shift + Enter`       | New line        |
| `Cmd/Ctrl + Shift + N`| New conversation|
| `Cmd/Ctrl + Shift + O`| Toggle sidebar  |
