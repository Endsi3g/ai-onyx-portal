import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Send, User, Bot, Sparkles, AlertCircle } from 'lucide-react'

export default function ChatView() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Knowledge Assistant. I can help you query the database or discuss AI topics. How can I help today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState('ollama')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await axios.post('/api/chat', { message: input, provider })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to connect to the AI service.'
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage, isError: true }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[85vh] animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            AI Chat Portal
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </h1>
          <p className="text-neutral-500 mt-2">Interact with local LLMs and indexed data.</p>
        </div>

        <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          <button 
            onClick={() => setProvider('ollama')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${provider === 'ollama' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Ollama (Local)
          </button>
          <button 
            onClick={() => setProvider('onyx')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${provider === 'onyx' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Onyx (RAG)
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass rounded-3xl border border-neutral-800 flex flex-col overflow-hidden relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xl ${msg.role === 'user' ? 'bg-neutral-800 border border-neutral-700' : 'bg-indigo-600 border border-indigo-400'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-neutral-300" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`max-w-[80%] p-5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-neutral-800/50 text-neutral-200 border border-neutral-700/50 rounded-tl-none'} ${msg.isError ? 'bg-rose-500/10 border-rose-500/50 text-rose-300' : ''}`}>
                {msg.isError && <AlertCircle className="w-4 h-4 inline mr-2 mb-1" />}
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-in fade-in duration-300">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-neutral-800/50 p-5 rounded-2xl rounded-tl-none border border-neutral-700/50">
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-6 bg-neutral-900/50 border-t border-neutral-800">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ask anything about AI..." 
              className="w-full pl-6 pr-14 py-4 pr-16"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:bg-neutral-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-neutral-600 mt-3 text-center uppercase tracking-widest font-bold">
            Powered by {provider === 'ollama' ? 'Local Ollama Instance' : 'Onyx Semantic Search'}
          </p>
        </form>
      </div>
    </div>
  )
}
