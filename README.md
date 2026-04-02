# AI Chat Assistant

A lightweight AI-integrated web app where users can input prompts, submit them to the OpenAI API, and receive dynamic responses. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**.

## Features

- **Prompt Input & Submit** — Auto-resizing textarea with Enter-to-send and a submit button
- **OpenAI Integration** — Server-side API route calling GPT-3.5 Turbo with conversation context
- **Dynamic Response Display** — Chat bubbles with user/assistant styling and timestamps
- **Error Handling** — Dismissible error banners for API failures, missing keys, and network issues
- **Loading States** — Animated typing indicator while waiting for AI responses
- **Chat History** — Conversations persist in localStorage across browser sessions
- **Clear Button** — One-click to reset the entire conversation

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Next.js 15 (App Router)        |
| Language   | TypeScript (strict)            |
| Styling    | Tailwind CSS v4 + Shadcn UI   |
| AI API     | OpenAI GPT-3.5 Turbo          |
| State      | React hooks + localStorage     |

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

Edit `.env.local` and replace the placeholder with your actual OpenAI API key:

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
│   ├── api/chat/route.ts      # OpenAI API route handler
│   ├── layout.tsx              # Root layout with metadata and Toaster
│   ├── page.tsx                # Main page rendering ChatContainer
│   └── globals.css             # Tailwind + Shadcn theme variables
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx  # Main chat orchestrator
│   │   ├── chat-message.tsx    # Individual message bubble
│   │   ├── loading-indicator.tsx # Typing animation
│   │   └── prompt-input.tsx    # Input textarea + send button
│   └── ui/                     # Shadcn UI components
├── hooks/
│   └── use-chat.ts             # Chat state management hook
├── lib/
│   └── utils.ts                # Utility functions (cn)
└── types/
    └── chat.ts                 # TypeScript interfaces
```

## Architecture Decisions

- **Server-side API route** — The OpenAI API key never reaches the client; all calls go through `/api/chat`
- **Custom `useChat` hook** — Encapsulates all chat logic (state, persistence, API calls) keeping components clean
- **localStorage persistence** — Chat history survives page refreshes without needing a database
- **Strict TypeScript** — No `any`, `unknown`, or loose types; every interface is explicitly defined
