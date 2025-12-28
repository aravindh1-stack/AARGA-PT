
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarPickerProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  onClose: () => void;
  label: string;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ value, onChange, onClose, label }) => {
  const initialDate = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const offset = selected.getTimezoneOffset();
    const adjustedDate = new Date(selected.getTime() - (offset * 60 * 1000));
    onChange(adjustedDate.toISOString().split('T')[0]);
    onClose();
  };

  const days = [];
  const totalDays = daysInMonth(viewDate.getMonth(), viewDate.getFullYear());
  const startDay = firstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear());

  // Padding for start of month
  // firstDayOfMonth returns 0 for Sunday, so we shift to Mon-Sun (0-6)
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

  for (let i = 0; i < adjustedStartDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }

  for (let d = 1; d <= totalDays; d++) {
    const isSelected = value === `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleDateClick(d)}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          isSelected 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
        }`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-[340px] bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            type="button" 
            onClick={handlePrevMonth}
            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h4 className="text-base font-black text-slate-900 tracking-tight">
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
          </h4>

          <button 
            type="button" 
            onClick={handleNextMonth}
            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <span key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{day}</span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {days}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
          <button 
            type="button" 
            onClick={onClose}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
