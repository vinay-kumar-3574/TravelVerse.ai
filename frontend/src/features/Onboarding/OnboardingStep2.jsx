const OnboardingStep2 = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="text-slate-300 text-sm">Preferred Travel Mode</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['flight','train','bus','any'].map((mode) => (
          <button
            type="button"
            key={mode}
            onClick={() => onChange({ target: { name: 'mode', value: mode } })}
            className={`p-4 rounded-lg border bg-slate-800/40 ${data.mode===mode ? 'border-purple-500' : 'border-slate-700'} text-white capitalize`}
          >{mode}</button>
        ))}
      </div>
    </div>
  )
}

export default OnboardingStep2