
import React, { useState } from 'react';
import { 
  X, Smartphone, Mail, Hash, MessageCircle, 
  Phone, Edit2, Trash2, ShieldCheck, User, 
  Briefcase, Calendar, MapPin, CreditCard, Layers, IndianRupee
} from 'lucide-react';
import { Customer } from '../types';

interface CustomerDetailsModalProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ 
  customer, 
  onClose, 
  onEdit, 
  onDelete 
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'policies'>('policies');

  const handleWhatsApp = () => {
    const message = `Hi ${customer.name}, checking in regarding your policy protocol status.`;
    window.open(`https://wa.me/${customer.mobile.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-[420px] max-h-[85vh] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="p-8 pb-4 text-center">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-black text-slate-900">{customer.name}</h2>
              <div className="w-1.5 h-1.5 rounded-sm bg-blue-600" />
            </div>

            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-xl font-black text-blue-600 mb-6 border border-slate-100">
              {customer.name.charAt(0).toLowerCase()}
            </div>
          </div>

          {/* Tab Switcher - Rectangular */}
          <div className="bg-slate-50 p-1 rounded-xl flex gap-1 mb-2">
            <button 
              onClick={() => setActiveTab('policies')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'policies' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              }`}
            >
              <Layers size={14} />
              Policies
            </button>
            <button 
              onClick={() => setActiveTab('personal')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'personal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              }`}
            >
              <User size={14} />
              Profile
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-4 space-y-4">
          {activeTab === 'policies' ? (
            <div className="space-y-3">
              {customer.policies.map((policy) => (
                <div key={policy.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                        <Briefcase size={14} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{policy.type}</h4>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">{policy.companyName}</p>
                      </div>
                    </div>
                    <div className="bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1">
                      <IndianRupee size={10} className="text-blue-600" />
                      <span className="text-[10px] font-black text-blue-600">{policy.amount || '0'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] bg-white p-2 rounded-lg border border-slate-50">
                      <span className="font-bold text-slate-400 uppercase tracking-widest">ID</span>
                      <span className="font-black text-slate-900">{policy.policyId}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded-lg border border-slate-50">
                        <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">Start</p>
                        <p className="text-[9px] font-bold text-slate-700">{policy.startDate}</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-50">
                        <p className="text-[7px] font-black text-slate-300 uppercase mb-0.5">End</p>
                        <p className="text-[9px] font-bold text-slate-700">{policy.endDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
              {[
                { label: 'Registry ID', value: customer.id, icon: Hash },
                { label: 'Birthday', value: customer.dob, icon: Calendar },
                { label: 'Email', value: customer.email, icon: Mail },
                { label: 'PAN', value: customer.pan, icon: CreditCard },
                { label: 'Rank', value: customer.smk, icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-500 border border-slate-50">
                    <item.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">{item.label}</p>
                    <p className="text-[11px] font-bold text-slate-900">{item.value || 'N/A'}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-500 border border-slate-50 shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Address</p>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">{customer.address || 'No address'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Rectangular */}
        <div className="p-8 pt-4 border-t border-slate-50 flex gap-3">
          <button onClick={handleWhatsApp} className="flex-1 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 active:scale-95 transition-all">
            <MessageCircle size={20} />
          </button>
          <a href={`tel:${customer.mobile}`} className="flex-1 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50 active:scale-95 transition-all">
            <Phone size={18} />
          </a>
          <button onClick={() => { onEdit(customer); onClose(); }} className="flex-1 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 active:scale-95 transition-all">
            <Edit2 size={18} />
          </button>
          <button onClick={() => { onDelete(customer.id); onClose(); }} className="flex-1 h-12 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center border border-slate-100 hover:bg-red-500 hover:text-white active:scale-95 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
