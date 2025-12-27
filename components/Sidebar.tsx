
import React from 'react';
import { LayoutDashboard, Users, UserPlus, ShieldCheck, Bell, ChevronRight, Settings, LogOut } from 'lucide-react';
import { AppSection } from '../types';

interface SidebarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'directory', label: 'Data Explorer', icon: Users },
    { id: 'add-customer', label: 'Enrollment', icon: UserPlus },
  ];

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 hidden lg:flex flex-col z-50">
      <div className="p-10 flex items-center gap-4">
        <div className="accent-gradient p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Nexus Pro</h1>
          <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.3em] mt-1.5">Intelligence</p>
        </div>
      </div>

      <nav className="mt-6 px-6 flex-1">
        <div className="mb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Menu</div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id as AppSection)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
                  <span className="text-sm font-bold">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto opacity-40" />}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 mb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">System</div>
        <ul className="space-y-2">
          <li>
            <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all group">
              <Settings size={20} className="text-slate-400 group-hover:text-slate-600" />
              <span className="text-sm font-bold">Preferences</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group">
              <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
              <span className="text-sm font-bold">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-8">
        <div className="bg-slate-50 rounded-3xl p-5 flex items-center gap-4 border border-slate-100">
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin" 
            className="w-10 h-10 rounded-2xl ring-4 ring-white shadow-sm"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-black text-slate-900 truncate">Admin Console</p>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight">Active Session</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
