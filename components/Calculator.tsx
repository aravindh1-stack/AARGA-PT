import React, { useState, useMemo } from 'react';
import { X, Delete, Equal, Minus, Plus, Divide, X as Multiply, Calculator as CalcIcon, Banknote, RotateCcw } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'standard' | 'cash'>('cash');
  
  // Standard Calculator State
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // Cash Counter State - Stores the COUNT of each denomination
  const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  const [cashCounts, setCashCounts] = useState<{ [key: number]: string }>(
    denominations.reduce((acc, d) => ({ ...acc, [d]: '' }), {})
  );

  // FIX: Cast den and count to string to resolve "unknown" parameter error in parseInt (Line 24)
  const cashTotal = useMemo(() => {
    return Object.entries(cashCounts).reduce((sum, [den, count]) => {
      const val = parseInt(den as string) * (parseInt(count as string) || 0);
      return sum + val;
    }, 0);
  }, [cashCounts]);

  const handleCashCountChange = (den: number, value: string) => {
    // Only allow numbers
    if (value !== '' && !/^\d+$/.test(value)) return;
    setCashCounts(prev => ({ ...prev, [den]: value }));
  };

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEquation = equation + display;
      const result = new Function(`return ${fullEquation.replace('×', '*').replace('÷', '/')}`)();
      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clearStandard = () => {
    setDisplay('0');
    setEquation('');
  };

  const clearCash = () => {
    setCashCounts(denominations.reduce((acc, d) => ({ ...acc, [d]: '' }), {}));
  };

  const backspace = () => {
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const Button = ({ children, onClick, variant = 'default', className = '' }: any) => {
    const variants: any = {
      default: 'bg-white text-slate-900 border-slate-100 hover:bg-slate-50',
      operator: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white',
      action: 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800',
    };
    return (
      <button
        type="button"
        onClick={onClick}
        className={`h-12 rounded-xl border font-black text-sm transition-all active:scale-95 flex items-center justify-center ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-[380px] bg-white rounded-[28px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
        
        {/* Header Toggle */}
        <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-white">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setMode('cash')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'cash' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              <Banknote size={14} /> Cash Counter
            </button>
            <button 
              onClick={() => setMode('standard')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${mode === 'standard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              <CalcIcon size={14} /> Standard
            </button>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition-colors ml-4">
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className="p-6 bg-slate-50/50">
          <div className="text-right h-5 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
            {mode === 'standard' ? equation : 'Cash Collection Registry'}
          </div>
          <div className="text-right text-3xl font-black text-slate-900 tracking-tighter truncate">
            {mode === 'standard' ? display : cashTotal.toLocaleString()}
          </div>
        </div>

        {mode === 'cash' ? (
          <div className="flex flex-col h-[400px]">
            {/* Scrollable Cash Rows */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {denominations.map(d => {
                const count = parseInt(cashCounts[d]) || 0;
                const subtotal = d * count;
                return (
                  <div key={d} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group">
                    <div className="w-12 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                      ₹{d}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-slate-300 font-black text-xs">×</span>
                      <input
                        type="tel"
                        placeholder="0"
                        value={cashCounts[d]}
                        onChange={(e) => handleCashCountChange(d, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-lg h-10 px-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-center"
                      />
                    </div>
                    <div className="w-24 text-right">
                      <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Total</p>
                      <p className={`text-sm font-black ${subtotal > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                        {subtotal > 0 ? subtotal.toLocaleString() : '-'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Cash Footer */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between">
              <button 
                onClick={clearCash}
                className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                <RotateCcw size={14} /> Reset Table
              </button>
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Net Value</p>
                 <p className="text-xl font-black text-slate-900 leading-none">₹{cashTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-4 gap-2">
            <Button onClick={clearStandard} variant="operator" className="text-red-500">C</Button>
            <Button onClick={backspace} variant="operator"><Delete size={18} /></Button>
            <Button onClick={() => handleOperator('/')} variant="operator"><Divide size={18} /></Button>
            <Button onClick={() => handleOperator('*')} variant="operator"><Multiply size={18} /></Button>

            {[7, 8, 9].map(n => <Button key={n} onClick={() => handleNumber(String(n))}>{n}</Button>)}
            <Button onClick={() => handleOperator('-')} variant="operator"><Minus size={18} /></Button>

            {[4, 5, 6].map(n => <Button key={n} onClick={() => handleNumber(String(n))}>{n}</Button>)}
            <Button onClick={() => handleOperator('+')} variant="operator"><Plus size={18} /></Button>

            {[1, 2, 3].map(n => <Button key={n} onClick={() => handleNumber(String(n))}>{n}</Button>)}
            <Button onClick={calculate} variant="action" className="row-span-2 h-auto"><Equal size={20} /></Button>

            <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
            <Button onClick={() => handleNumber('.')}>.</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;