
import React, { useState, useMemo } from 'react';
import { 
  User, Hash, ShieldCheck, Smartphone, ChevronRight, 
  Shield, Calendar, Mail, MapPin, FileText, IndianRupee, Plus, Trash2
} from 'lucide-react';
import { Customer, Policy, InsuranceType } from '../types';
import CalendarPicker from './CalendarPicker';

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
  const [activeDatePicker, setActiveDatePicker] = useState<string | null>(null);
  
  const [personalData, setPersonalData] = useState({
    id: editingCustomer?.id || '',
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
      { id: 'p_' + Math.random().toString(36).substr(2, 9), type: 'Car', policyId: '', companyName: '', startDate: '', endDate: '', amount: '' }
    ]
  );

  const totalAmount = useMemo(() => {
    return policies.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  }, [policies]);

  const updatePolicy = (idx: number, updates: Partial<Policy>) => {
    const newPolicies = [...policies];
    newPolicies[idx] = { ...newPolicies[idx], ...updates };
    setPolicies(newPolicies);
  };

  const addPolicy = () => {
    setPolicies([
      ...policies,
      { id: 'p_' + Math.random().toString(36).substr(2, 9), type: 'Other', policyId: '', companyName: '', startDate: '', endDate: '', amount: '' }
    ]);
  };

  const removePolicy = (idx: number) => {
    if (policies.length <= 1) return;
    const newPolicies = policies.filter((_, i) => i !== idx);
    setPolicies(newPolicies);
  };

  const handleIdChange = (val: string) => {
    setPersonalData({ ...personalData, id: val, mobile: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && !personalData.id) {
      alert("Please enter a Mobile Number to proceed.");
      return;
    }
    if (step < 3) {
      setStep(prev => (prev + 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onSave({ ...personalData, policies });
  };

  const DateInput = ({ label, value, onChange, pickerId }: { label: string, value: string, onChange: (val: string) => void, pickerId: string }) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setActiveDatePicker(pickerId)}
        className="w-full h-14 input-field flex items-center gap-4 px-5 text-sm font-bold text-slate-900 hover:border-blue-400 transition-all text-left"
      >
        <Calendar size={18} className="text-slate-300" />
        <span className={value ? 'text-slate-900' : 'text-slate-400'}>
          {value || 'Select Date'}
        </span>
      </button>
      {activeDatePicker === pickerId && (
        <CalendarPicker 
          label={label}
          value={value}
          onChange={onChange}
          onClose={() => setActiveDatePicker(null)}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto py-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Enrollment</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Registry Integration</p>
      </div>

      {/* Step Tracker - Rectangular */}
      <div className="flex justify-center mb-12">
        <div className="bg-white px-4 py-3 rounded-2xl flex items-center gap-2 border border-slate-100 shadow-sm">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                  step === s 
                  ? 'bg-slate-900 text-white' 
                  : step > s 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-50 text-slate-300'
                }`}
              >
                {step > s ? <ShieldCheck size={16} /> : s}
              </div>
              {s < 3 && <div className={`w-6 h-0.5 rounded-full ${step > s ? 'bg-blue-600' : 'bg-slate-100'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400">
            <div className="aarga-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-blue-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Identity Anchor</h3>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Identifier</label>
                <div className="relative group input-field">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500">
                    <Hash size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={personalData.id}
                    onChange={(e) => handleIdChange(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="aarga-card p-8 space-y-8">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-blue-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Initial Asset Type</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INSURANCE_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updatePolicy(0, { type })}
                    className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      policies[0].type === type 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400">
            <div className="aarga-card p-8 space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                <User size={18} className="text-blue-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Strategic Identity</h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={personalData.name}
                    onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                    className="w-full h-14 input-field px-5 text-sm font-bold focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <DateInput 
                    pickerId="dob-picker"
                    label="Registry DOB" 
                    value={personalData.dob} 
                    onChange={(val) => setPersonalData({...personalData, dob: val})}
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Anchor</label>
                    <div className="relative input-field">
                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"><Smartphone size={18}/></div>
                       <input
                        type="tel"
                        readOnly
                        value={personalData.id}
                        className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold text-slate-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Inbox</label>
                  <div className="relative group input-field">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"><Mail size={18}/></div>
                    <input
                      type="email"
                      value={personalData.email}
                      onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                      className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold focus:outline-none"
                      placeholder="nexus@protocol.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address Deployment</label>
                  <div className="relative group input-field">
                    <div className="absolute left-5 top-5 text-slate-300 group-focus-within:text-blue-500 transition-colors"><MapPin size={18}/></div>
                    <textarea
                      value={personalData.address}
                      onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                      className="w-full bg-transparent pl-14 pr-6 pt-5 text-sm font-bold focus:outline-none min-h-[100px]"
                      placeholder="Physical residency details"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400">
            {policies.map((p, i) => (
              <div key={p.id} className="aarga-card p-8 space-y-8 relative">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-blue-600" />
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{p.type} Provisioning</h4>
                  </div>
                  {policies.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removePolicy(i)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Category</label>
                    <div className="grid grid-cols-4 gap-2">
                      {INSURANCE_TYPES.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updatePolicy(i, { type })}
                          className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${
                            p.type === type 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-400 border-slate-100'
                          }`}
                        >
                          {type.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Issuing Company</label>
                    <input
                      type="text"
                      required
                      value={p.companyName}
                      onChange={(e) => updatePolicy(i, { companyName: e.target.value })}
                      className="w-full h-14 input-field px-5 text-sm font-bold focus:outline-none"
                      placeholder="e.g. Nexus Global"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy ID</label>
                    <div className="relative group input-field">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500"><Hash size={18}/></div>
                      <input
                        type="text"
                        required
                        value={p.policyId}
                        onChange={(e) => updatePolicy(i, { policyId: e.target.value })}
                        className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold focus:outline-none"
                        placeholder="POL-000000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <DateInput 
                      pickerId={`policy-start-${i}`}
                      label="Activation Date" 
                      value={p.startDate} 
                      onChange={(val) => updatePolicy(i, { startDate: val })}
                    />
                    <DateInput 
                      pickerId={`policy-end-${i}`}
                      label="Maturity Date" 
                      value={p.endDate} 
                      onChange={(val) => updatePolicy(i, { endDate: val })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Premium Amount</label>
                    <div className="relative group input-field">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500"><IndianRupee size={16}/></div>
                      <input
                        type="number"
                        required
                        value={p.amount}
                        onChange={(e) => updatePolicy(i, { amount: e.target.value })}
                        className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold focus:outline-none"
                        placeholder="Enter premium amount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={addPolicy}
              className="w-full h-14 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 flex items-center justify-center gap-3 hover:border-blue-200 hover:text-blue-600 transition-all text-xs font-black uppercase tracking-widest"
            >
              <Plus size={18} />
              Add Another Policy
            </button>

            {/* Final Amount Summary */}
            <div className="aarga-card p-6 bg-blue-50 border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Total Integration Value</p>
                <p className="text-xs font-bold text-slate-500 mt-1">Sum of all premium modules</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-5 py-3 rounded-xl shadow-sm border border-blue-100">
                <IndianRupee size={14} className="text-blue-600" />
                <span className="text-xl font-black text-slate-900">{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tactical Actions */}
        <div className="pt-6 flex flex-col gap-4">
          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {step === 3 ? (
              <>
                <ShieldCheck size={18} />
                Complete Integration
              </>
            ) : (
              <>
                Continue Process
                <ChevronRight size={18} />
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => step === 1 ? onCancel() : setStep(prev => (prev - 1) as 1 | 2 | 3)}
            className="w-full py-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
          >
            {step === 1 ? 'Discard Profile' : 'Backtrack Registry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
