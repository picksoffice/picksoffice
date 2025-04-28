'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SimpleDatePickerProps {
  onChange: (dates: { from?: string, to?: string }) => void;
  className?: string;
}

export function SimpleDatePicker({ onChange, className }: SimpleDatePickerProps) {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const handleApply = () => {
    onChange({ from: fromDate, to: toDate });
    setIsOpen(false);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    onChange({});
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className || ''}`}>
      <button
        type="button"
        className="w-[300px] justify-start text-left font-normal bg-slate-800/75 text-slate-300 border border-white/10 hover:border-white/20 hover:bg-slate-700/75 px-4 py-2 rounded-lg flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="mr-2 h-4 w-4 text-sky-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        {fromDate && toDate ? (
          <>
            {new Date(fromDate).toLocaleDateString()} - {new Date(toDate).toLocaleDateString()}
          </>
        ) : fromDate ? (
          new Date(fromDate).toLocaleDateString()
        ) : (
          <span>Filtern nach Datum</span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-auto p-4 bg-slate-900 rounded-md border border-slate-700 shadow-lg">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Von</label>
              <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Bis</label>
              <input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300"
              />
            </div>
            <div className="flex justify-between">
              <button 
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-700"
              >
                Zurücksetzen
              </button>
              <button 
                type="button"
                onClick={handleApply}
                className="px-3 py-1.5 rounded-md bg-sky-300 text-slate-950 hover:bg-sky-400"
              >
                Anwenden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}