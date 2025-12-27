
import React, { useState } from 'react';
import { 
  Search, Edit2, Trash2, Mail, Smartphone, 
  ChevronRight, MoreVertical, MessageCircle, Phone, 
  Mic, FileText, Filter, Download
} from 'lucide-react';
import { Customer } from '../types';
import { getDaysRemaining, getStatusColor } from '../utils/dateUtils';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.policies.some(p => p.policyId.toLowerCase().includes(search.toLowerCase()))
  );

  const handleWhatsApp = (customer: Customer, policy: any) => {
    const days = getDaysRemaining(policy.endDate);
    const message = `Hello ${customer.name}, your ${policy.type} insurance policy is expiring in ${days} days. Renew now?`;
    window.open(`https://wa.me/${customer.mobile.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-32 lg:pb-12">
      {/* Header with Search & Bulk Desktop Tools */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Data Explorer</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Profile Registry • {customers.length} Nodes</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search Ecosystem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-2xl pl-12 pr-12 py-3.5 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all shadow-sm"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-50 rounded-lg text-slate-400">
              <Mic size={16} />
            </button>
          </div>
          <div className="hidden lg:flex gap-2">
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
              <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[11px] tracking-widest shadow-xl hover:bg-slate-800 transition-all">
              <Download size={14} /> BULK EXPORT
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Layout: Table for Desktop, Cards for Mobile */}
      <div className="hidden lg:block aarga-card rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left aarga-table">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Identity</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Insurance Stack</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Policies</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(customer => (
              <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-sm font-black text-indigo-600 border border-indigo-100 shadow-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{customer.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">ID: {customer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Smartphone size={12} className="text-slate-400" /> {customer.mobile}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Mail size={12} className="text-slate-400" /> {customer.email}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                   <div className="inline-flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
                     <FileText size={10} /> {customer.policies.length} Nodes
                   </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => onEdit(customer)}
                      className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(customer.id)}
                      className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-600 transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 px-2">
        {filtered.map(customer => (
          <div key={customer.id} className="aarga-card p-6 rounded-[2rem] flex flex-col gap-6 ios-active-scale transition-all">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl font-black text-indigo-600">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">{customer.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Profile #{customer.id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => onEdit(customer)} className="p-2 bg-slate-50 rounded-xl text-slate-400"><Edit2 size={16} /></button>
                <button onClick={() => onDelete(customer.id)} className="p-2 bg-slate-50 rounded-xl text-slate-400"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="space-y-3">
              {customer.policies.map(p => {
                const days = getDaysRemaining(p.endDate);
                const isUrgent = days <= 10;
                return (
                  <div key={p.id} className={`p-4 rounded-2xl border flex items-center justify-between ${isUrgent ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white shadow-sm ${isUrgent ? 'text-red-500' : 'text-indigo-500'}`}>
                        <FileText size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{p.type}</p>
                        <p className="text-[9px] text-slate-500 font-bold">{p.companyName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-black ${isUrgent ? 'text-red-600' : 'text-indigo-600'}`}>{days}d</p>
                      <button 
                        onClick={() => handleWhatsApp(customer, p)}
                        className="text-[10px] text-green-600 font-black uppercase mt-1 underline"
                      >
                        RENEW
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
