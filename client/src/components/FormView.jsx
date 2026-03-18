import { useState, useEffect } from 'react'
import axios from 'axios'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function FormView() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'AI Research'
  })
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const res = await axios.get('/api/entries')
      setEntries(res.data)
    } catch (err) {
      console.error('Failed to fetch entries', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/entries', formData)
      setStatus('success')
      setFormData({ title: '', description: '', content: '', category: 'AI Research' })
      fetchEntries()
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-700">
      {/* Form Section */}
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Submit AI Insight
          </h1>
          <p className="text-neutral-500 mt-2">Add new knowledge to the AI Portal database.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-neutral-800/50 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Title</label>
            <input 
              type="text" 
              placeholder="e.g. Transformers in Vision" 
              className="w-full"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Category</label>
            <select 
              className="w-full"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>AI Research</option>
              <option>LLM Models</option>
              <option>Neural Networks</option>
              <option>AI Ethics</option>
              <option>Computer Vision</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Short Description</label>
            <input 
              type="text" 
              placeholder="Brief summary..." 
              className="w-full"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Full Content</label>
            <textarea 
              rows="5" 
              placeholder="Detailed explanation..." 
              className="w-full"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="btn-primary w-full disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {status === 'loading' ? 'Saving...' : 'Submit to Database'}
          </button>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-emerald-400 justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-5 h-5" />
              <span>Successfully saved!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-rose-400 justify-center animate-in zoom-in duration-300">
              <AlertCircle className="w-5 h-5" />
              <span>Failed to save. Try again.</span>
            </div>
          )}
        </form>
      </div>

      {/* Entries Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          Latest Submissions
          <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
            {entries.length}
          </span>
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          {entries.length === 0 ? (
            <div className="glass p-12 rounded-3xl border border-dashed border-neutral-800 flex flex-col items-center text-neutral-600">
              <Database className="w-12 h-12 mb-4 opacity-20" />
              <p>No entries found in the database.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="glass p-6 rounded-2xl border border-neutral-800 hover:border-indigo-500/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">
                    {entry.category}
                  </span>
                  <span className="text-xs text-neutral-600">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold group-hover:text-indigo-300 transition-colors uppercase">{entry.title}</h3>
                <p className="text-neutral-400 text-sm mt-1 mb-3">{entry.description}</p>
                <div className="text-neutral-500 text-xs line-clamp-3 leading-relaxed">
                  {entry.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
