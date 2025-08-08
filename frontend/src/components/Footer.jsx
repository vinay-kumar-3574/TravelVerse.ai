const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-700 bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 py-6 text-slate-400 text-sm flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} TravelVerse. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer