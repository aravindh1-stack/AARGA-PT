
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetailsModal from './components/CustomerDetailsModal';
import Calculator from './components/Calculator';
import { Customer, AppSection } from './types';
import { storageService } from './services/storageService';
import { 
  ShieldCheck, Home, Users, PlusCircle, Bell, Search, 
  Menu, Smartphone, Globe, Plus, Zap, User, Mic, Calculator as CalcIcon
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

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
    if (window.confirm('IRREVERSIBLE PROTOCOL: Permanently delete this ecosystem node?')) {
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      
      {/* Strategic Minimalist Rail (Desktop) */}
      <Sidebar activeSection={activeSection} setActiveSection={handleNavigate} />

      {/* Main Professional Workspace */}
      <main className="flex-1 lg:ml-72 transition-all duration-700 overflow-x-hidden">
        
        {/* Simplified Header - Logo + Name focus */}
        <header className="aarga-glass sticky top-0 w-full h-24 px-8 lg:px-16 flex items-center justify-between z-[60]">
          <div className="flex items-center gap-4 lg:hidden">
            <img 
              src="https://ourgafoundation.site/images/aarga-logo.svg" 
              alt="Aarga Logo" 
              className="w-12 h-12 drop-shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-xl tracking-tighter leading-none">Policy Tracker</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
             <div className="flex items-center gap-4">
                <img 
                  src="https://ourgafoundation.site/images/aarga-logo.svg" 
                  alt="Aarga Logo" 
                  className="w-14 h-14" 
                />
                <span className="font-black text-slate-900 text-2xl tracking-tighter leading-none">Policy Tracker</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
             {activeSection !== 'add-customer' && (
                <button 
                  onClick={() => handleNavigate('add-customer')}
                  className="hidden lg:flex items-center gap-3 pill-btn accent-gradient px-10 py-4 text-white text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-blue-500/30 hover:scale-[1.03] active:scale-95"
                >
                  <Plus size={18} /> New Node
                </button>
             )}
             <div className="flex items-center gap-4">
                <button className="relative w-12 h-12 rounded-[1rem] bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all hover:bg-slate-50 group">
                  <Bell size={22} />
                  <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white group-hover:scale-110 transition-transform"></span>
                </button>
             </div>
          </div>
        </header>

        {/* Unified View Workspace */}
        <div className="p-6 lg:p-16 pb-36 lg:pb-16 min-h-[calc(100vh-6rem)]">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Context Title (Simplified) */}
            <div className="space-y-3 animate-in fade-in duration-500">
               <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
                    {activeSection === 'dashboard' ? 'System Overview' : 
                     activeSection === 'directory' ? 'Registry Access' : 'Node Integration'}
                  </span>
               </div>
               <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div>
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                      {activeSection === 'dashboard' ? 'PT Dashboard' : 
                       activeSection === 'directory' ? 'Registry' : 'New Enrollment'}
                    </h1>
                  </div>
                  
                  {/* Strategic Period Selector - Desktop Only */}
                  <div className="hidden lg:flex bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm gap-2">
                     <button className="px-8 py-3 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Current Protocol</button>
                     <button className="px-8 py-3 rounded-full text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-widest transition-colors">Historical Log</button>
                  </div>
               </div>
            </div>

            {/* Dynamic Section Injection */}
            <div className="transition-all duration-500">
              {activeSection === 'dashboard' && (
                <Dashboard 
                  customers={customers} 
                  onViewDetails={(id) => {
                    const cust = customers.find(c => c.id === id);
                    if (cust) setViewingCustomer(cust);
                  }} 
                />
              )}

              {activeSection === 'directory' && (
                <CustomerList 
                  customers={customers} 
                  onEdit={handleEditCustomer} 
                  onDelete={handleDeleteCustomer} 
                  onView={setViewingCustomer}
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
          </div>
        </div>
      </main>

      {/* Persistent Floating Calculator Button (All Pages) */}
      <button 
        onClick={() => setIsCalculatorOpen(true)}
        className="fixed bottom-28 right-6 lg:bottom-10 lg:right-10 z-[100] w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-2xl flex items-center justify-center text-slate-900 hover:text-blue-600 hover:bg-slate-50 transition-all hover:scale-110 active:scale-90 animate-in fade-in slide-in-from-right-10 duration-1000"
        title="Open Calculator"
      >
        <CalcIcon size={24} />
      </button>

      {/* Overlays */}
      {isCalculatorOpen && (
        <Calculator onClose={() => setIsCalculatorOpen(false)} />
      )}

      {viewingCustomer && (
        <CustomerDetailsModal 
          customer={viewingCustomer}
          onClose={() => setViewingCustomer(null)}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      )}

      {/* Modern High-End Floating Nav (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] animate-in slide-in-from-bottom-10 duration-700">
        <div className="relative h-24 bg-white border-t border-slate-100 flex items-center justify-between px-12 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
           
           {/* Left Section: HOME */}
           <MobileNavButton 
             active={activeSection === 'dashboard'} 
             onClick={() => handleNavigate('dashboard')} 
             icon={Home} 
             label="HOME" 
           />
           
           {/* Center Section: ADD (Raised Floating Button) */}
           <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <button 
                onClick={() => handleNavigate('add-customer')}
                className="w-16 h-16 rounded-full accent-gradient text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.6)] active:scale-90 transition-all duration-300 border-[5px] border-white"
                aria-label="Add New Profile"
              >
                <Plus size={32} className="stroke-[3px]" />
              </button>
           </div>

           {/* Right Section: PROFILES */}
           <MobileNavButton 
             active={activeSection === 'directory'} 
             onClick={() => handleNavigate('directory')} 
             icon={Users} 
             label="PROFILES" 
           />
        </div>
      </div>

      {/* Background Ambience Glows */}
      <div className="fixed top-0 right-0 -mr-[20rem] -mt-[20rem] w-[1000px] h-[1000px] bg-blue-500/10 blur-[250px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 -ml-[20rem] -mb-[20rem] w-[1000px] h-[1000px] bg-violet-500/10 blur-[250px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

const MobileNavButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 transition-all duration-300 group ${active ? 'scale-105' : 'opacity-70 active:scale-95'}`}
  >
    <div className={`transition-colors duration-300 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
      <Icon size={26} className={active ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
    </div>
    <span className={`text-[10px] font-black tracking-[0.12em] transition-colors duration-300 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
      {label}
    </span>
    {active && (
      <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
    )}
  </button>
);

export default App;
