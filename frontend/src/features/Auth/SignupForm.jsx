import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const SignupForm = ({ onSuccess }) => {
  const { signup } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return setError('Passwords do not match')
    setLoading(true)
    setError('')
    const res = await signup({ name: form.fullName, email: form.email, password: form.password })
    setLoading(false)
    if (res.success) onSuccess?.()
    else setError(res.error || 'Signup failed')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div>
        <label className="text-slate-300 text-sm">Full Name</label>
        <Input name="fullName" value={form.fullName} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Email</label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Password</label>
        <Input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Confirm Password</label>
        <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="mt-1 bg-slate-800/40 border-slate-700 text-white" required />
      </div>
      <Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
    </form>
  )
}

export default SignupForm