const TransportCard = ({ icon, title, details, selected, onSelect }) => {
  return (
    <button onClick={onSelect} className={`p-4 rounded-xl border w-full text-left bg-slate-800/40 hover:bg-slate-800/60 transition ${selected ? 'border-purple-500' : 'border-slate-700'}`}>
      <div className="flex items-center gap-3">
        <div className="text-purple-400">{icon}</div>
        <div>
          <div className="text-white font-semibold">{title}</div>
          <div className="text-slate-400 text-sm">{details}</div>
        </div>
      </div>
    </button>
  )
}

export default TransportCard