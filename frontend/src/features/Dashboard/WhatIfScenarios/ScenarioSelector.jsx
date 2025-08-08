const ScenarioSelector = ({ onSelect }) => {
  const scenarios = [
    'Flight gets delayed',
    'Hotel overbooked',
    'Bad weather day',
    'Budget exceeded'
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {scenarios.map((s)=> (
        <button key={s} onClick={()=>onSelect?.(s)} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 text-left text-slate-200 hover:bg-slate-800/60">{s}</button>
      ))}
    </div>
  )
}

export default ScenarioSelector