const BookingSummary = ({ items = [], total = 0, currency = 'INR' }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-white font-semibold">Booking Summary</h4>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center justify-between text-slate-300">
            <span>{it.label}</span>
            <span>{it.value}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-slate-700 pt-3 text-slate-200">
        <span>Total</span>
        <span>{currency} {total.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default BookingSummary