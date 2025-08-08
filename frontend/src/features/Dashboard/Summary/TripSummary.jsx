const TripSummary = ({ places = [], expenses = {}, notes }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-white font-semibold mb-2">Places Visited</h4>
        <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
          {places.map((p, idx)=> <li key={idx}>{p}</li>)}
          {places.length===0 && <li>Not recorded</li>}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-2">Expenses</h4>
        <ul className="text-slate-300 text-sm space-y-1">
          {Object.entries(expenses).map(([k,v])=> (
            <li key={k} className="flex items-center justify-between"><span className="capitalize">{k}</span><span>{v.toLocaleString()}</span></li>
          ))}
          {Object.keys(expenses).length===0 && <li>No expenses</li>}
        </ul>
      </div>
      {notes && (
        <div>
          <h4 className="text-white font-semibold mb-2">Notes</h4>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 text-slate-200 text-sm">{notes}</div>
        </div>
      )}
    </div>
  )
}

export default TripSummary