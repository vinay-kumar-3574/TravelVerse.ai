import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, LogOut, User, MessageSquareText } from 'lucide-react'
import { Button } from './ui/button'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="w-full bg-slate-800/40 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="TravelVerse" className="h-7 w-7" />
            <span className="text-white font-bold">TravelVerse</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 ml-8 text-slate-300">
            <Link to="/chat" className="hover:text-white transition">Chat</Link>
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link to="/guide" className="hover:text-white transition">Guide</Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          {isAuthenticated ? (
            <>
              <Link to="/chat">
                <Button variant="ghost" className="text-slate-300 hover:text-white"><MessageSquareText className="w-4 h-4 mr-2" /> Chat</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-slate-300 hover:text-white"><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" className="text-slate-300 hover:text-white"><User className="w-4 h-4 mr-2" /> Login</Button></Link>
              <Link to="/signup"><Button variant="gradient">Sign up</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar