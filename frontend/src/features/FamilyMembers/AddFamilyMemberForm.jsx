import { useState } from 'react'
import { useChat } from '../../context/ChatContext'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

const AddFamilyMemberForm = ({ onClose }) => {
  const { addFamilyMember } = useChat()
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    addFamilyMember({ id: Date.now().toString(), name })
    onClose?.()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="text-slate-300 text-sm">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-slate-800/40 border-slate-700 text-white" />
      </div>
      <Button type="submit" variant="gradient" className="w-full">Add Member</Button>
    </form>
  )
}

export default AddFamilyMemberForm