
import React from 'react';
import { 
  ShieldAlert, Clock, AlertCircle, CheckCircle2, 
  ChevronRight, Zap, TrendingUp, Users, DollarSign,
  BarChart3, MessageCircle, Phone, ArrowUpRight
} from 'lucide-react';
import { Customer, Policy } from '../types';
import { getDaysRemaining, getStatusColor } from '../utils/dateUtils';

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

  const endingThisWeek = allPolicyContexts.filter(ctx => ctx.days >= 0 && ctx.days <= 7).length;
  const urgentCount = allPolicyContexts.filter(ctx => ctx.days >= 0 && ctx.days <= 10).length;
  const warningCount = allPolicyContexts.filter(ctx => ctx.days > 10 && ctx.days <= 20).length;
  const standardCount = allPolicyContexts.filter(ctx => ctx.days > 20 && ctx.days <= 30).length;

  // Mock data for analytics
  const totalPremiumValue = (customers.length * 1250).toLocaleString();

  const handleWhatsApp = (customer: Customer, policy: Policy) => {
    const days = getDaysRemaining(policy.endDate);
    const message = `Hi ${customer.name}, your ${policy.type} insurance policy is ending on ${policy.endDate}. Click here to renew and stay protected.`;
    window.open(`https://wa.me/${customer.mobile.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const BentoMetric = ({ title, value, icon: Icon, colorClass, desc }: any) => (
    <div className="aarga-card p-6 rounded-[2rem] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}>
          <Icon size={24} />
        </div>
        <ArrowUpRight size={18} className="text-slate-300" />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-32 lg:pb-12">
      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BentoMetric 
          title="Ending This Week" 
          value={endingThisWeek} 
          icon={AlertCircle} 
          colorClass="bg-red-50 text-red-500"
          desc="Action Required"
        />
        <BentoMetric 
          title="Total Portfolio" 
          value={customers.length} 
          icon={Users} 
          colorClass="bg-indigo-50 text-indigo-600"
          desc="Registered Profiles"
        />
        <BentoMetric 
          title="Premium Value" 
          value={`$${totalPremiumValue}`} 
          icon={DollarSign} 
          colorClass="bg-green-50 text-green-600"
          desc="Est. Revenue Node"
        />
        <BentoMetric 
          title="Active Nodes" 
          value={allPolicyContexts.length} 
          icon={Zap} 
          colorClass="bg-blue-50 text-blue-600"
          desc="Total Policies"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Policy Intelligence Feed (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Intelligence Hub</h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-100">{urgentCount} Urgent</span>
               <span className="px-3 py-1 bg-orange-50 text-orange-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-orange-100">{warningCount} Soon</span>
            </div>
          </div>

          <div className="space-y-4">
            {allPolicyContexts.slice(0, 10).map((ctx) => {
              const isCritical = ctx.days <= 10;
              return (
                <div 
                  key={`${ctx.customer.id}-${ctx.policy.id}`}
                  className={`aarga-card p-5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${isCritical ? 'border-red-100 ring-2 ring-red-500/5' : ''}`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-indigo-600">
                      {ctx.customer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm leading-none">{ctx.customer.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${isCritical ? 'bg-red-50 text-red-500 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                          {ctx.policy.type}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">ID: {ctx.policy.policyId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6">
                    <div className="text-right">
                      <p className={`text-lg font-black leading-none ${getStatusColor(ctx.days)}`}>{ctx.days}d</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Maturity</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleWhatsApp(ctx.customer, ctx.policy)}
                        className="p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-100 transition-colors ios-active-scale"
                      >
                        <MessageCircle size={18} />
                      </button>
                      <a 
                        href={`tel:${ctx.customer.mobile}`}
                        className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-colors ios-active-scale"
                      >
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Analytics Widget (1/3 width on desktop) */}
        <div className="space-y-6">
          <div className="aarga-card p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-400" />
              SMK Analytics
            </h3>
            
            <div className="space-y-6">
              {[
                { type: 'Health', count: 42, color: 'bg-indigo-500' },
                { type: 'Car', count: 28, color: 'bg-blue-500' },
                { type: 'Term', count: 18, color: 'bg-purple-500' },
                { type: 'Other', count: 12, color: 'bg-slate-700' },
              ].map(item => (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{item.type}</span>
                    <span>{item.count}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.count}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Internal System Stats</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                   <p className="text-xs font-bold text-slate-300">New Leads</p>
                   <p className="text-xl font-black text-white">+14</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                   <p className="text-xs font-bold text-slate-300">Renewals</p>
                   <p className="text-xl font-black text-white">82%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
