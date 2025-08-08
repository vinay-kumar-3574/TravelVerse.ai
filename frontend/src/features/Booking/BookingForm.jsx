import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const BookingForm = ({ onConfirm }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); onConfirm?.(form) }
  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-slate-300 text-sm">Full Name</label>
        <Input name="name" value={form.name} onChange={handle} className="mt-1 bg-slate-800/40 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Email</label>
        <Input name="email" type="email" value={form.email} onChange={handle} className="mt-1 bg-slate-800/40 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Phone</label>
        <Input name="phone" value={form.phone} onChange={handle} className="mt-1 bg-slate-800/40 border-slate-700 text-white" />
      </div>
      <Button type="submit" variant="gradient" className="w-full">Confirm Booking</Button>
    </form>
  )
}

export default BookingForm