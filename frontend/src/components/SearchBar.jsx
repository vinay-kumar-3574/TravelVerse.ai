import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const SearchBar = ({ placeholder = 'Search...', onSearch }) => {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-slate-800/50 border-slate-700 text-white"
      />
      <Button type="submit" variant="secondary"><Search className="w-4 h-4 mr-2" />Search</Button>
    </form>
  )
}

export default SearchBar