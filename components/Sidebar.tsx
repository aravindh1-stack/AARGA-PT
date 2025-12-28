
import React from 'react';
import { LayoutDashboard, Users, UserPlus, ShieldCheck, ChevronRight, Settings, LogOut } from 'lucide-react';
import { AppSection } from '../types';

interface SidebarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', label: 'Ecosystem', icon: LayoutDashboard },
    { id: 'directory', label: 'Nodes', icon: Users },
    { id: 'add-customer', label: 'Enroll', icon: UserPlus },
  ];

  return (
    <aside className="w-24 lg:w-72 h-screen fixed left-0 top-0 bg-white/80 backdrop-blur-xl border-r border-slate-100 hidden md:flex flex-col z-50 transition-all duration-500">
      <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4">
        <img 
          src="https://ourgafoundation.site/images/aarga-logo.svg" 
          alt="Aarga Logo" 
          className="w-12 h-12" 
        />
        <div className="hidden lg:block">
          <h1 className="text-xl font-black text-slate-900 leading-none">Policy</h1>
          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mt-1.5">Tracker</p>
        </div>
      </div>

      <nav className="mt-8 px-4 lg:px-6 flex-1">
        <div className="hidden lg:block mb-8 px-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Main Rail</div>
        <ul className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id as AppSection)}
                  className={`w-full flex items-center justify-center lg:justify-start gap-4 px-4 lg:px-6 py-4 rounded-[2rem] transition-all duration-300 group ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100/50'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={24} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
                  <span className="hidden lg:block text-sm font-bold">{item.label}</span>
                  {isActive && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 lg:p-8 space-y-4">
        <button className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 lg:px-6 py-4 rounded-[2rem] text-slate-400 hover:bg-slate-50 transition-all">
          <Settings size={22} />
          <span className="hidden lg:block text-sm font-bold">Preferences</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
