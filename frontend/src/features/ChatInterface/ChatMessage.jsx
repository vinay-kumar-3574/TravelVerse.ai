import { Bot, User } from 'lucide-react'

const ChatMessage = ({ type = 'user', content }) => {
  const isUser = type === 'user'
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${isUser ? 'bg-purple-600 text-white' : 'bg-slate-700/50 text-slate-200'}`}>
        {content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center">
          <User className="w-4 h-4 text-slate-200" />
        </div>
      )}
    </div>
  )
}

export default ChatMessage