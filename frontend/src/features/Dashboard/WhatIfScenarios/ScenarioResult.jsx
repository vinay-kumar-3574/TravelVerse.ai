const ScenarioResult = ({ title, actions = [] }) => {
  if (!title) return null
  return (
    <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
      <div className="text-white font-semibold mb-2">{title}</div>
      <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
        {actions.map((a, idx)=> <li key={idx}>{a}</li>)}
        {actions.length===0 && <li>No actions suggested.</li>}
      </ul>
    </div>
  )
}

export default ScenarioResult