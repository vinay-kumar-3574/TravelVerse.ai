import { useState } from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

const BudgetForm = ({ initial = {}, onChange }) => {
  const [form, setForm] = useState(initial)
  const handle = (e) => {
    const next = { ...form, [e.target.name]: Number(e.target.value || 0) }
    setForm(next)
    onChange?.(next)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {['transport','accommodation','food','activities','extras'].map((k)=> (
        <div key={k}>
          <label className="text-slate-300 text-sm capitalize">{k}</label>
          <Input name={k} type="number" value={form[k] || ''} onChange={handle} className="mt-1 bg-slate-800/40 border-slate-700 text-white" />
        </div>
      ))}
      <div className="md:col-span-2">
        <Button variant="gradient" className="w-full">Update Budget</Button>
      </div>
    </div>
  )
}

export default BudgetForm