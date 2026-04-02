# AI Chat Assistant

An AI chat application with real-time streaming responses, multi-conversation management, and light/dark themes. Built with Next.js, TypeScript, Redux Toolkit, Tailwind CSS, and Shadcn UI.

## Setup

### Prerequisites

- Node.js 20+ and Yarn
- An OpenAI API key

### Installation

```bash
git clone https://github.com/AbubakrShahid/Frontend-Engineer-Technical-Assessment.git
cd Frontend-Engineer-Technical-Assessment
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
│   │   ├── chat/route.ts
│   │   └── title/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx
│   │   ├── chat-message.tsx
│   │   ├── empty-state.tsx
│   │   ├── loading-indicator.tsx
│   │   ├── markdown-renderer.tsx
│   │   ├── prompt-input.tsx
│   │   └── sidebar.tsx
│   ├── ui/
│   ├── providers.tsx
│   └── theme-toggle.tsx
├── hooks/
│   ├── use-media-query.ts
│   └── use-stream-chat.ts
├── store/
│   ├── index.ts
│   ├── chat-slice.ts
│   ├── storage.ts
│   └── hooks.ts
├── types/
│   └── chat.ts
└── lib/
    └── utils.ts
```
