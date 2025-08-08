import ActivityCard from './ActivityCard'

const DayPlanner = ({ items = [] }) => {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <ActivityCard key={idx} time={it.time} title={it.activity} location={it.location} />
      ))}
      {items.length === 0 && <div className="text-slate-400 text-sm">No activities planned.</div>}
    </div>
  )
}

export default DayPlanner