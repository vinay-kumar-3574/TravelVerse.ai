import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await login(form)
    setLoading(false)
    if (res.success) onSuccess?.()
    else setError(res.error || 'Login failed')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div>
        <label className="text-slate-300 text-sm">Email</label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Password</label>
        <Input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
    </form>
  )
}

export default LoginForm