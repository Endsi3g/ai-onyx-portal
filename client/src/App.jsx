import { useState } from 'react'
import FormView from './components/FormView'
import ChatView from './components/ChatView'
import { Database, MessageSquare, Layout } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 bg-neutral-900/50 border-r border-neutral-800 flex flex-col items-center py-8 gap-8 backdrop-blur-xl z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
          <Layout className="w-6 h-6 text-white" />
        </div>
        
        <button 
          onClick={() => setActiveTab('chat')}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === 'chat' ? 'bg-indigo-500/10 text-indigo-400' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => setActiveTab('form')}
          className={`p-3 rounded-xl transition-all duration-200 ${activeTab === 'form' ? 'bg-indigo-500/10 text-indigo-400' : 'text-neutral-500 hover:text-neutral-300'}`}
        >
          <Database className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <main className="pl-20 min-h-screen">
        <div className="max-w-6xl mx-auto p-8">
          {activeTab === 'chat' ? <ChatView /> : <FormView />}
        </div>
      </main>

      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  )
}

export default App
