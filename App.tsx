
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import { Customer, AppSection } from './types';
import { storageService } from './services/storageService';
import { 
  ShieldCheck, Home, Users, PlusCircle, Bell, Search, 
  Menu, User, Smartphone, Globe, Plus
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Load data
  useEffect(() => {
    storageService.seedData();
    setCustomers(storageService.getCustomers());
  }, []);

  const refreshData = useCallback(() => {
    setCustomers(storageService.getCustomers());
  }, []);

  const handleSaveCustomer = (customer: Customer) => {
    storageService.saveCustomer(customer);
    refreshData();
    setEditingCustomer(null);
    setActiveSection('directory');
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('PROTOCOL ALERT: Permanently erase this ecosystem node from master registry?')) {
      storageService.deleteCustomer(id);
      refreshData();
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setActiveSection('add-customer');
  };

  const handleNavigate = (section: AppSection) => {
    setActiveSection(section);
    if (section !== 'add-customer') setEditingCustomer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F7F8FA] selection:bg-indigo-100">
      
      {/* Desktop Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Main Workspace */}
      <main className="flex-1 lg:ml-72 transition-all overflow-x-hidden">
        
        {/* Responsive Header */}
        <header className="glass-effect sticky top-0 w-full h-20 px-6 lg:px-12 flex items-center justify-between z-[60]">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="accent-gradient p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={24} />
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-lg leading-none">Nexus Pro</span>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                <Globe size={14} className="text-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Nexus Active</span>
             </div>
             <div className="w-px h-6 bg-slate-200 mx-2" />
             <p className="text-xs font-bold text-slate-400">Environment: <span className="text-slate-900">Production v2.4</span></p>
          </div>

          <div className="flex items-center gap-4">
             {activeSection !== 'add-customer' && (
                <button 
                  onClick={() => handleNavigate('add-customer')}
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                >
                  <Plus size={16} /> NEW ENROLLMENT
                </button>
             )}
             <div className="flex items-center gap-3 pl-4 border-l border-slate-100 lg:border-none">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-black text-slate-900 uppercase leading-none">Vikas Sharma</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Principal Strategist</p>
                </div>
                <img src="https://picsum.photos/seed/admin/100/100" className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="Admin" />
             </div>
          </div>
        </header>

        {/* View Port Content */}
        <div className="p-6 lg:p-12">
          {activeSection === 'dashboard' && (
            <Dashboard 
              customers={customers} 
              onViewDetails={(id) => {
                const cust = customers.find(c => c.id === id);
                if (cust) handleEditCustomer(cust);
              }} 
            />
          )}

          {activeSection === 'directory' && (
            <CustomerList 
              customers={customers} 
              onEdit={handleEditCustomer} 
              onDelete={handleDeleteCustomer} 
            />
          )}

          {activeSection === 'add-customer' && (
            <CustomerForm 
              editingCustomer={editingCustomer}
              onSave={handleSaveCustomer}
              onCancel={() => handleNavigate('directory')}
            />
          )}
        </div>
      </main>

      {/* Thumb-Optimized Bottom Nav (Mobile Only) */}
      <nav className="glass-effect fixed bottom-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-[100] lg:hidden border-t border-black/5 pb-[var(--safe-area-inset-bottom)]">
         <NavButton 
           active={activeSection === 'dashboard'} 
           onClick={() => handleNavigate('dashboard')} 
           icon={Home} 
           label="Home" 
         />
         <div className="relative -top-6">
            <button 
              onClick={() => handleNavigate('add-customer')}
              className="w-16 h-16 rounded-[2rem] accent-gradient text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 ios-active-scale transition-all active:scale-90"
            >
              <PlusCircle size={32} />
            </button>
         </div>
         <NavButton 
           active={activeSection === 'directory'} 
           onClick={() => handleNavigate('directory')} 
           icon={Users} 
           label="Profiles" 
         />
      </nav>

      {/* Ambient background glows */}
      <div className="fixed top-0 right-0 -mr-64 -mt-64 w-[600px] h-[600px] bg-indigo-500/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ios-active-scale ${active ? 'text-indigo-600' : 'text-slate-400'}`}
  >
    <Icon size={22} className={active ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
