const TripOverview = ({ daysLeft = 0, returnDate, location, travelers = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
        <div className="text-slate-400 text-sm">Days Left</div>
        <div className="text-white text-3xl font-bold">{daysLeft}</div>
        {returnDate && <div className="text-slate-400 text-sm">Return on {returnDate}</div>}
      </div>
      <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
        <div className="text-slate-400 text-sm">Current Location</div>
        <div className="text-white text-lg font-semibold">{location || 'Unknown'}</div>
      </div>
      <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
        <div className="text-slate-400 text-sm">Travelers</div>
        <div className="text-white text-3xl font-bold">{travelers}</div>
      </div>
    </div>
  )
}

export default TripOverview