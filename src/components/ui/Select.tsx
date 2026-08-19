import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check, Plus } from '@phosphor-icons/react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isCreatable?: boolean;
}

export function Select({ options, value, onChange, placeholder = 'Select an option', className = '', isCreatable = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to objects
  const normalizedOptions: SelectOption[] = typeof options[0] === 'string'
    ? (options as string[]).map(opt => ({ label: opt as string, value: opt as string }))
    : options as SelectOption[];

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  // Sync input value with selected option when closed
  useEffect(() => {
    if (!isOpen) {
      setInputValue(selectedOption ? selectedOption.label : (isCreatable ? value : ''));
    }
  }, [isOpen, selectedOption, value, isCreatable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = isCreatable 
    ? normalizedOptions.filter(opt => opt.label.toLowerCase().includes(inputValue.toLowerCase()))
    : normalizedOptions;

  const showCreateOption = isCreatable && inputValue.trim() !== '' && !normalizedOptions.some(opt => opt.label.toLowerCase() === inputValue.trim().toLowerCase());

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className={`w-full flex items-center justify-between bg-slate-50 border ${isOpen ? 'border-[#1B3A6B] ring-2 ring-[#1B3A6B]/20' : 'border-slate-200'} rounded-xl px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-[#1B3A6B]/20`}
        onClick={() => setIsOpen(true)}
      >
        {isCreatable ? (
          <input
            type="text"
            value={isOpen ? inputValue : (selectedOption ? selectedOption.label : value)}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={(e) => {
              setIsOpen(true);
              e.target.select();
            }}
            placeholder={placeholder}
            className="w-full bg-transparent border-none p-0 focus:outline-none text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
          />
        ) : (
          <button
            type="button"
            className="w-full flex-1 text-left focus:outline-none"
          >
            <span className={selectedOption ? 'text-slate-900 font-medium' : 'text-slate-400'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </button>
        )}
        
        <CaretDown 
          size={16} 
          weight="bold" 
          className={`text-slate-400 transition-transform duration-200 cursor-pointer ${isOpen ? 'rotate-180 text-[#1B3A6B]' : ''}`} 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top">
          <ul className="max-h-60 overflow-y-auto custom-scrollbar">
            {showCreateOption && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onChange(inputValue.trim());
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors text-[#1B3A6B] hover:bg-blue-50 font-medium"
                >
                  <Plus size={16} weight="bold" />
                  Buat "{inputValue.trim()}"
                </button>
              </li>
            )}
            
            {filteredOptions.length === 0 && !showCreateOption ? (
              <li className="px-4 py-3 text-slate-400 text-sm text-center">Tidak ditemukan</li>
            ) : (
              filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                      value === option.value 
                        ? 'bg-blue-50/50 text-[#1B3A6B] font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    {option.label}
                    {value === option.value && <Check size={16} weight="bold" className="text-[#1B3A6B]" />}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
