import { useChat } from '../../context/ChatContext'
import { Button } from '../../components/ui/button'

const FamilyList = ({ onAdd }) => {
  const { familyMembers, removeFamilyMember } = useChat()
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold">Family Members</h4>
        <Button variant="secondary" onClick={onAdd}>Add</Button>
      </div>
      <ul className="space-y-2">
        {familyMembers.map((m) => (
          <li key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700">
            <span className="text-slate-200">{m.name}</span>
            <Button variant="ghost" onClick={() => removeFamilyMember(m.id)}>Remove</Button>
          </li>
        ))}
        {familyMembers.length === 0 && <p className="text-slate-400 text-sm">No members yet.</p>}
      </ul>
    </div>
  )
}

export default FamilyList