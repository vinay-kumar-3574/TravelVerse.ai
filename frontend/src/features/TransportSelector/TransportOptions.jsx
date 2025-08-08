import { useState } from 'react'
import TransportCard from './TransportCard'
import { Plane, Train, Bus, Car } from 'lucide-react'

const TransportOptions = ({ onSelect }) => {
  const [selected, setSelected] = useState('flight')
  const options = [
    { id: 'flight', title: 'Flight', details: 'Fastest option for long distances', icon: <Plane className="w-5 h-5" /> },
    { id: 'train', title: 'Train', details: 'Comfortable and scenic', icon: <Train className="w-5 h-5" /> },
    { id: 'bus', title: 'Bus', details: 'Budget-friendly for short trips', icon: <Bus className="w-5 h-5" /> },
    { id: 'car', title: 'Car', details: 'Flexible and convenient', icon: <Car className="w-5 h-5" /> },
  ]

  const choose = (id) => {
    setSelected(id)
    onSelect?.(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((opt) => (
        <TransportCard key={opt.id} {...opt} selected={selected===opt.id} onSelect={() => choose(opt.id)} />
      ))}
    </div>
  )
}

export default TransportOptions