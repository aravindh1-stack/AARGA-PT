
import React, { useState } from 'react';
import { 
  Search, Edit2, Trash2, Mail, Smartphone, 
  MessageCircle, Phone, ArrowUpRight, Filter, Download, MoreVertical, ShieldCheck, Hash
} from 'lucide-react';
import { Customer } from '../types';
import { getDaysRemaining, getStatusColor } from '../utils/dateUtils';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete, onView }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleWhatsApp = (customer: Customer, policy: any) => {
    const days = getDaysRemaining(policy.endDate);
    const message = `Hi ${customer.name}, your ${policy.type} insurance policy (Node: ${policy.policyId}) is ending on ${policy.endDate}. Renew now with Nexus Pro.`;
    window.open(`https://wa.me/${customer.mobile.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
      {/* Directory Management Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 px-2">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Master Registry</h2>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em] mt-2">Active Strategic Nodes • {customers.length}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-[400px]">
            <div className="aarga-card flex items-center h-16 px-6 gap-4">
               <Search className="text-slate-300" size={20} />
               <input 
                type="text"
                placeholder="Filter Ecosystem..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm font-bold focus:outline-none placeholder:text-slate-300"
               />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-16 h-16 aarga-card flex items-center justify-center text-slate-400 hover:text-blue-600">
              <Filter size={22} />
            </button>
            <button className="w-16 h-16 aarga-card flex items-center justify-center text-white bg-slate-900 border-none shadow-xl">
              <Download size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating High-Polish Card Stack */}
      <div className="space-y-6">
        {filtered.map((customer) => (
          <div key={customer.id} className="aarga-card p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-10 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 flex items-center gap-10 w-full">
              <div 
                onClick={() => onView(customer)}
                className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl font-black text-blue-600 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
              >
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h3 
                    onClick={() => onView(customer)}
                    className="text-2xl font-black text-slate-900 tracking-tight leading-none cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {customer.name}
                  </h3>
                  <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest border border-blue-100">
                     <ShieldCheck size={10} /> Active
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-8 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500"><Smartphone size={16}/></div>
                    <span className="text-sm font-bold text-slate-600">{customer.mobile}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500"><Mail size={16}/></div>
                    <span className="text-sm font-bold text-slate-600">{customer.email}</span>
                  </div>
                  <button 
                    onClick={() => onView(customer)}
                    className="flex items-center gap-3 group/id"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/id:bg-blue-600 group-hover/id:text-white transition-all"><Hash size={16}/></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/id:text-slate-900 transition-colors">{customer.id}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto pt-8 lg:pt-0 border-t lg:border-none border-slate-50">
              <div className="hidden lg:flex flex-col items-center px-12 border-r border-slate-100">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Stack Depth</p>
                 <div className="flex -space-x-3">
                    {customer.policies.slice(0, 3).map((p, i) => (
                      <div key={p.id} className="w-10 h-10 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center text-blue-600 text-[10px] font-black shadow-sm" style={{ zIndex: 10 - i }}>{p.type[0]}</div>
                    ))}
                    {customer.policies.length > 3 && <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-50 flex items-center justify-center text-white text-[10px] font-black shadow-sm">+{customer.policies.length - 3}</div>}
                 </div>
              </div>

              <div className="flex-1 lg:flex-none flex justify-end gap-3">
                <button onClick={() => handleWhatsApp(customer, customer.policies[0])} className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center ios-active-scale border border-emerald-100/50"><MessageCircle size={22}/></button>
                <a href={`tel:${customer.mobile}`} className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center ios-active-scale border border-blue-100/50"><Phone size={22}/></a>
                <button onClick={() => onEdit(customer)} className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center ios-active-scale border border-slate-100"><Edit2 size={22}/></button>
                <button onClick={() => onDelete(customer.id)} className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center ios-active-scale border border-slate-100"><Trash2 size={22}/></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-48 text-center space-y-6">
             <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-100 mx-auto shadow-sm border border-slate-50"><Search size={48}/></div>
             <p className="text-2xl font-black text-slate-300 uppercase tracking-widest">Strategic Node Not Resolved</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
