import { Button } from '../../../components/ui/button'
import { Download } from 'lucide-react'

const DownloadSummaryButton = ({ data }) => {
  const download = () => {
    const blob = new Blob([JSON.stringify(data || {}, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trip-summary.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <Button onClick={download} variant="secondary"><Download className="w-4 h-4 mr-2" /> Download Summary</Button>
  )
}

export default DownloadSummaryButton