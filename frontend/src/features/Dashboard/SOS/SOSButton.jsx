import { AlertTriangle } from 'lucide-react'

const SOSButton = ({ onClick }) => (
  <button onClick={onClick} className="w-full p-4 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2">
    <AlertTriangle className="w-5 h-5" /> SOS
  </button>
)

export default SOSButton