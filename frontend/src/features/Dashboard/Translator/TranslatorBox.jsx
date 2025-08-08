import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { chatService } from '../../ChatInterface/chatService'

const TranslatorBox = () => {
  const [from, setFrom] = useState('en')
  const [to, setTo] = useState('ar')
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const translate = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await chatService.translateText(text, to)
      setResult(res?.translated || '...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <select value={from} onChange={(e)=>setFrom(e.target.value)} className="h-10 rounded-md bg-slate-800/50 border border-slate-700 text-white px-3">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
        <span className="text-slate-400">→</span>
        <select value={to} onChange={(e)=>setTo(e.target.value)} className="h-10 rounded-md bg-slate-800/50 border border-slate-700 text-white px-3">
          <option value="ar">Arabic</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <Textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text to translate..." className="bg-slate-800/50 border-slate-700 text-white" />
      <Button onClick={translate} variant="gradient" disabled={loading} className="w-full">{loading ? 'Translating...' : 'Translate'}</Button>
      {result && <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-200">{result}</div>}
    </div>
  )
}

export default TranslatorBox