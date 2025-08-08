const BudgetChart = ({ categories = {} }) => {
  const total = Object.values(categories).reduce((a,b)=>a+b,0) || 1
  return (
    <div className="space-y-3">
      {Object.entries(categories).map(([label, amount]) => (
        <div key={label} className="space-y-1">
          <div className="flex items-center justify-between text-slate-300 text-sm">
            <span className="capitalize">{label}</span>
            <span>{amount.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full bg-slate-700 rounded">
            <div className="h-2 bg-purple-500 rounded" style={{ width: `${(amount/total)*100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BudgetChart