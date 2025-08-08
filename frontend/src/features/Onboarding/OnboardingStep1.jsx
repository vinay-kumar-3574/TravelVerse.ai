import { Input } from '../../components/ui/input'

const OnboardingStep1 = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-slate-300 text-sm">Full Name</label>
        <Input name="fullName" value={data.fullName || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Date of Birth</label>
        <Input name="dob" type="date" value={data.dob || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Gender</label>
        <select name="gender" value={data.gender || ''} onChange={onChange} className="mt-1 h-10 w-full rounded-md bg-slate-800/50 border border-slate-700 text-white px-3">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="text-slate-300 text-sm">Nationality</label>
        <Input name="nationality" value={data.nationality || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Language</label>
        <Input name="language" value={data.language || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Contact</label>
        <Input name="contact" value={data.contact || ''} onChange={onChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
      </div>
    </div>
  )
}

export default OnboardingStep1