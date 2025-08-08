const UpcomingEventsWidget = ({ events = [] }) => {
  return (
    <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700">
      <div className="text-white font-semibold mb-2">Upcoming Events</div>
      <ul className="space-y-2 text-slate-300 text-sm">
        {events.map((e, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <span>{e.title}</span>
            <span className="text-slate-400">{e.time}</span>
          </li>
        ))}
        {events.length === 0 && <li className="text-slate-400">No events</li>}
      </ul>
    </div>
  )
}

export default UpcomingEventsWidget