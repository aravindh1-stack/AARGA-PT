
import React, { useState } from 'react';
import { ShieldCheck, Smartphone, Lock, ArrowRight, Globe, Fingerprint } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [key, setKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate biometric/protocol verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#F8FAFC]">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 right-0 -mr-[15rem] -mt-[15rem] w-[800px] h-[800px] bg-blue-500/10 blur-[180px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 -ml-[15rem] -mb-[15rem] w-[800px] h-[800px] bg-violet-500/10 blur-[180px] rounded-full -z-10" />

      <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Branding Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl mb-8 group transition-transform hover:scale-105">
            <img 
              src="https://ourgafoundation.site/images/aarga-logo.svg" 
              alt="Aarga Logo" 
              className="w-12 h-12 drop-shadow-sm" 
            />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-3 leading-none">Aarga Intelligence</h1>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Strategic Policy Registry</p>
        </div>

        {/* Login Card */}
        <div className="aarga-card p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 accent-gradient" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Identifier Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ecosystem ID</label>
                <div className="relative group input-field">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                    <Smartphone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Protocol Key Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Key</label>
                  <button type="button" className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors">Recover</button>
                </div>
                <div className="relative group input-field">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 bg-transparent pl-14 pr-6 text-sm font-bold text-slate-900 focus:outline-none placeholder:text-slate-300 tracking-[0.3em]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-2xl accent-gradient text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                <>
                  Establish Connection
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Biometric Prompt */}
          <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
             <button type="button" className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-white hover:border-blue-100 transition-all group">
                <Fingerprint size={28} className="group-hover:scale-110 transition-transform" />
             </button>
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Biometric Protocol Ready</p>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="mt-8 flex items-center justify-center gap-8">
           <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
              <Globe size={14} />
              Region: Global
           </button>
           <div className="w-1 h-1 rounded-full bg-slate-200" />
           <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
              Request Access
           </button>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="fixed bottom-8 left-0 right-0 text-center px-6">
         <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2">Secure Core Version 4.2.0-PRO</p>
         <div className="flex items-center justify-center gap-4">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">End-to-End Encryption Enabled</span>
         </div>
      </footer>
    </div>
  );
};

export default LoginPage;
