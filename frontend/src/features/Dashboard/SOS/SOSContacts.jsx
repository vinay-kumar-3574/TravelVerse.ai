const SOSContacts = ({ contacts = [] }) => {
  return (
    <div className="space-y-2">
      {contacts.map((c, idx)=> (
        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-slate-700">
          <div className="text-slate-200">{c.name}</div>
          <div className="text-slate-400 text-sm">{c.number}</div>
        </div>
      ))}
      {contacts.length===0 && <div className="text-slate-400 text-sm">No emergency contacts available.</div>}
    </div>
  )
}

export default SOSContacts