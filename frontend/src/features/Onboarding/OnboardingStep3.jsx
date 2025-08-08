import { Input } from '../../components/ui/input'

const OnboardingStep3 = ({ data, onChange }) => {
  const mode = data.mode || 'any'
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(mode === 'flight' || mode === 'any') && (
        <>
          <div>
            <label className="text-slate-300 text-sm">Passport Number</label>
            <Input name="passport" value={data.passport || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
          </div>
          <div>
            <label className="text-slate-300 text-sm">Visa Info</label>
            <Input name="visa" value={data.visa || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
          </div>
        </>
      )}
      {(mode === 'train' || mode === 'bus' || mode === 'any') && (
        <>
          <div>
            <label className="text-slate-300 text-sm">Government ID</label>
            <Input name="govtId" value={data.govtId || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
          </div>
          {mode === 'train' && (
            <div>
              <label className="text-slate-300 text-sm">Passenger Type</label>
              <Input name="passengerType" value={data.passengerType || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OnboardingStep3