
import React from 'react';
import { 
  ShieldAlert, ShieldCheck, Clock, AlertCircle, 
  ChevronRight, MessageCircle, Search, Mic, DollarSign
} from 'lucide-react';
import { Customer } from '../types';
import { getDaysRemaining } from '../utils/dateUtils';

interface DashboardProps {
  customers: Customer[];
  onViewDetails: (customerId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ customers, onViewDetails }) => {
  const allPolicyContexts = customers.flatMap(c => 
    c.policies.map(p => ({
      customer: c,
      policy: p,
      days: getDaysRemaining(p.endDate)
    }))
  ).sort((a, b) => a.days - b.days);

  const oneWeek = allPolicyContexts.filter(ctx => ctx.days >= 0 && ctx.days <= 7);
  const tenDays = allPolicyContexts.filter(ctx => ctx.days > 7 && ctx.days <= 10);
  const twentyDays = allPolicyContexts.filter(ctx => ctx.days > 10 && ctx.days <= 20);
  const thirtyDays = allPolicyContexts.filter(ctx => ctx.days > 20 && ctx.days <= 30);

  // Dynamic Total Premium Calculation
  const totalPremium = allPolicyContexts.reduce((sum, ctx) => sum + (parseFloat(ctx.policy.amount) || 0), 0);
  const formattedPremium = totalPremium >= 1000 ? (totalPremium / 1000).toFixed(1) : totalPremium.toString();
  const unit = totalPremium >= 1000 ? 'K' : '';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Desktop Search */}
      <div className="max-w-4xl mx-auto hidden lg:block">
        <div className="aarga-card flex items-center h-14 px-6 gap-4">
          <Search className="text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search Strategic Registry..." 
            className="flex-1 bg-transparent text-sm font-semibold focus:outline-none placeholder:text-slate-300"
          />
          <Mic className="text-slate-300" size={16} />
        </div>
      </div>

      {/* Intelligence Hub */}
      <div className="aarga-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-lg font-black text-slate-900">Intelligence Hub</h2>
            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-0.5">Asset Protocols</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CRITICAL */}
          <div className="bg-red-50/50 rounded-2xl p-5 space-y-3 border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">One Week</span>
              <div className="w-2 h-2 rounded-sm bg-red-600" />
            </div>
            {oneWeek.map(ctx => (
              <div key={ctx.policy.id} className="bg-white p-3 rounded-xl border border-red-50 flex items-center justify-between group cursor-pointer" onClick={() => onViewDetails(ctx.customer.id)}>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{ctx.customer.name}</p>
                  <p className="text-[8px] font-black text-red-500 mt-0.5">{ctx.policy.type} • {ctx.days}D</p>
                </div>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-red-500" />
              </div>
            ))}
            {oneWeek.length === 0 && <p className="text-center py-4 text-[9px] font-black text-slate-200 uppercase tracking-widest">Clear</p>}
          </div>

          {/* URGENT */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">10 Days</span>
              <div className="w-2 h-2 rounded-sm bg-slate-400" />
            </div>
            {tenDays.map(ctx => (
              <div key={ctx.policy.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => onViewDetails(ctx.customer.id)}>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{ctx.customer.name}</p>
                  <p className="text-[8px] font-black text-slate-400 mt-0.5">{ctx.policy.type} • {ctx.days}D</p>
                </div>
                <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-600" />
              </div>
            ))}
            {tenDays.length === 0 && <p className="text-center py-4 text-[9px] font-black text-slate-200 uppercase tracking-widest">Optimized</p>}
          </div>

          {/* WARNING */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">20 Days</span>
              <div className="w-2 h-2 rounded-sm bg-orange-400" />
            </div>
            {twentyDays.map(ctx => (
              <div key={ctx.policy.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => onViewDetails(ctx.customer.id)}>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{ctx.customer.name}</p>
                  <p className="text-[8px] font-black text-orange-500 mt-0.5">{ctx.policy.type} • {ctx.days}D</p>
                </div>
                <AlertCircle size={12} className="text-orange-400" />
              </div>
            ))}
          </div>

          {/* STANDARD */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">30 Days</span>
              <div className="w-2 h-2 rounded-sm bg-blue-500" />
            </div>
            {thirtyDays.map(ctx => (
              <div key={ctx.policy.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => onViewDetails(ctx.customer.id)}>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{ctx.customer.name}</p>
                  <p className="text-[8px] font-black text-blue-500 mt-0.5">{ctx.policy.type}</p>
                </div>
                <ShieldCheck size={12} className="text-blue-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="aarga-card p-6 bg-slate-900 text-white flex flex-col justify-between h-32">
          <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Total Nodes</p>
          <p className="text-3xl font-black">{customers.length}</p>
        </div>
        <div className="aarga-card p-6 bg-blue-600 text-white flex flex-col justify-between h-32">
          <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Critical Alerts</p>
          <p className="text-3xl font-black">{oneWeek.length}</p>
        </div>
        <div className="aarga-card p-6 bg-white flex flex-col justify-between h-32">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Premium</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-black text-slate-900">{formattedPremium}</p>
            <p className="text-sm font-black text-slate-400">{unit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
