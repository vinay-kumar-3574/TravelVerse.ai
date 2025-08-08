const ActivityCard = ({ time, title, location }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700">
      <div className="text-purple-400 font-semibold min-w-[60px]">{time}</div>
      <div>
        <div className="text-white font-medium">{title}</div>
        {location && <div className="text-slate-400 text-sm">{location}</div>}
      </div>
    </div>
  )
}

export default ActivityCard