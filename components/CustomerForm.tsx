
import React, { useState } from 'react';
import { 
  Save, X, User, Mail, Hash, Calendar, ShieldCheck, 
  Plus, Trash2, Smartphone, MapPin, CreditCard, Info, Briefcase,
  ChevronRight, ChevronLeft, Shield, FileSpreadsheet, PlusCircle
} from 'lucide-react';
import { Customer, Policy, InsuranceType } from '../types';

interface CustomerFormProps {
  editingCustomer?: Customer | null;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const INSURANCE_TYPES: InsuranceType[] = [
  'Bike', 'Car', 'Term', 'Health', 'LIC', 'Personal Accident', 'Heavy Vehicle', 'Other'
];

const CustomerForm: React.FC<CustomerFormProps> = ({ editingCustomer, onSave, onCancel }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [personalData, setPersonalData] = useState({
    id: editingCustomer?.id || `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
    name: editingCustomer?.name || '',
    dob: editingCustomer?.dob || '',
    mobile: editingCustomer?.mobile || '',
    email: editingCustomer?.email || '',
    address: editingCustomer?.address || '',
    pan: editingCustomer?.pan || '',
    smk: editingCustomer?.smk || '',
  });

  const [policies, setPolicies] = useState<Policy[]>(
    editingCustomer?.policies || [
      { id: 'p_initial', type: 'Car', policyId: '', companyName: '', startDate: '', endDate: '' }
    ]
  );

  const addPolicy = () => {
    setPolicies([...policies, { id: `p_${Date.now()}`, type: 'Car', policyId: '', companyName: '', startDate: '', endDate: '' }]);
  };

  const updatePolicy = (idx: number, updates: Partial<Policy>) => {
    const newPolicies = [...policies];
    newPolicies[idx] = { ...newPolicies[idx], ...updates };
    setPolicies(newPolicies);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => (prev + 1) as 1 | 2 | 3);
      window.scrollTo(0, 0);
      return;
    }
    onSave({ ...personalData, policies });
  };

  const InputField = ({ label, icon: Icon, type, value, onChange, placeholder, isTextArea = false }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors">
          <Icon size={18} />
        </div>
        {isTextArea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all min-h-[100px] shadow-sm"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all shadow-sm"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen pb-32 lg:pb-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-500 px-4">
      {/* Step Progress & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Profile Enrollment</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secure Master Registry Sync</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'accent-gradient text-white' : 'bg-slate-100 text-slate-400'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-8 h-1 rounded-full ${step > s ? 'bg-indigo-600' : 'bg-slate-100'}`} />}
            </div>
          ))}
          <div className="hidden lg:block lg:flex gap-2 ml-4">
             <button type="button" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-widest">
               <FileSpreadsheet size={14} /> BULK IMPORT
             </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-right duration-500">
            <div className="space-y-8">
               <div className="aarga-card p-8 rounded-[2rem] space-y-6">
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                   <Hash size={16} className="text-indigo-600" /> Identity Anchor
                 </h3>
                 <InputField label="Profile Identifier" icon={Hash} type="text" value={personalData.id} onChange={(v: string) => setPersonalData({...personalData, id: v})} />
               </div>
            </div>

            <div className="aarga-card p-8 rounded-[2rem] space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Shield size={16} className="text-indigo-600" /> Classification
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INSURANCE_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updatePolicy(0, { type })}
                    className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border text-center ${policies[0].type === type ? 'accent-gradient text-white border-transparent shadow-lg shadow-indigo-500/30' : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-100'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Policy Node Stack</h3>
              <button 
                onClick={addPolicy} 
                type="button" 
                className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-[11px] tracking-widest hover:bg-indigo-100 transition-all"
              >
                <Plus size={16} /> ADD ANOTHER POLICY
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {policies.map((p, i) => (
                <div key={p.id} className="aarga-card p-8 rounded-[2.5rem] space-y-6 relative group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Briefcase size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Node #{i + 1}</span>
                    </div>
                    {policies.length > 1 && (
                      <button onClick={() => setPolicies(policies.filter(item => item.id !== p.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <InputField label="Underwriter" icon={Briefcase} type="text" value={p.companyName} onChange={(v: string) => updatePolicy(i, { companyName: v })} placeholder="e.g. Tata AIG" />
                    <InputField label="Policy Identification #" icon={Hash} type="text" value={p.policyId} onChange={(v: string) => updatePolicy(i, { policyId: v })} placeholder="POL-XXX" />
                    <div className="grid grid-cols-2 gap-4">
                       <InputField label="Commencement" icon={Calendar} type="date" value={p.startDate} onChange={(v: string) => updatePolicy(i, { startDate: v })} />
                       <InputField label="Maturity" icon={Calendar} type="date" value={p.endDate} onChange={(v: string) => updatePolicy(i, { endDate: v })} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="aarga-card p-10 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 animate-in slide-in-from-right duration-500">
             <div className="lg:col-span-2">
                <InputField label="Legal Subject Name" icon={User} type="text" value={personalData.name} onChange={(v: string) => setPersonalData({...personalData, name: v})} placeholder="Full Name as per PAN" />
             </div>
             <InputField label="Chronology (DOB)" icon={Calendar} type="date" value={personalData.dob} onChange={(v: string) => setPersonalData({...personalData, dob: v})} />
             <InputField label="Regulatory PAN" icon={CreditCard} type="text" value={personalData.pan} onChange={(v: string) => setPersonalData({...personalData, pan: v})} placeholder="ABCDE1234F" />
             <InputField label="Primary Mobile Frequency" icon={Smartphone} type="tel" value={personalData.mobile} onChange={(v: string) => setPersonalData({...personalData, mobile: v})} placeholder="Contact Node" />
             <InputField label="Digital Inbox Address" icon={Mail} type="email" value={personalData.email} onChange={(v: string) => setPersonalData({...personalData, email: v})} placeholder="name@domain.com" />
             <InputField label="Internal Logistics (SMK)" icon={Info} type="text" value={personalData.smk} onChange={(v: string) => setPersonalData({...personalData, smk: v})} placeholder="Internal Reference" />
             <InputField label="Geographic Deployment" icon={MapPin} type="text" isTextArea value={personalData.address} onChange={(v: string) => setPersonalData({...personalData, address: v})} placeholder="Residential Address" />
          </div>
        )}

        {/* Dynamic Nav Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 lg:justify-end pt-12">
          <button
            type="button"
            onClick={() => step === 1 ? onCancel() : setStep(prev => (prev - 1) as 1 | 2 | 3)}
            className="px-10 py-4 rounded-2xl bg-slate-100 text-slate-500 font-black text-[11px] tracking-widest hover:bg-slate-200 transition-all ios-active-scale uppercase"
          >
            {step === 1 ? 'Discard Profile' : 'Previous Module'}
          </button>
          <button
            type="submit"
            className="px-12 py-4 rounded-2xl accent-gradient text-white font-black text-[11px] tracking-[0.2em] shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase"
          >
            {step === 3 ? <Save size={18} /> : null}
            {step === 3 ? 'Finalize Master Sync' : 'Continue Integration'}
            {step < 3 ? <ChevronRight size={18} /> : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
