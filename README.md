# AI Portal: Knowledge & Chat System

A premium, full-stack application for collecting AI-related insights and interacting with them via local LLMs (Ollama) and semantic search (Onyx).

![AI Portal Banner](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600&h=400)

## 🚀 Features

- **Knowledge Form**: Beautifully designed form with glassmorphism to submit AI topics, research, and models to a local SQLite database.
- **AI Chat**: Interactive chat interface integrated with **Ollama** for local inference and **Onyx** for RAG capabilities.
- **Premium UI**: Modern dark-themed interface built with React, Vite, and Tailwind CSS.
- **Local First**: All data and intelligence stays on your machine.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, SQLite.
- **Intelligence**: Ollama (Local LLM), Onyx (Semantic Search/RAG).

## 📦 Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- Docker (for Onyx)
- Ollama (running locally)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/[username]/ai-onyx-portal.git
cd ai-onyx-portal

# Setup Backend
cd server
npm install
node index.js

# Setup Frontend
cd ../client
npm install
npm run dev
```

### 3. Setup Onyx
Navigate to the `onyx` directory and follow the instructions in [onyx/README.md](onyx/README.md) to start the Docker stack.

## 📄 License
MIT
