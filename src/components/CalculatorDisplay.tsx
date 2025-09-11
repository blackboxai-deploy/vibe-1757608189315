'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

interface CalculatorDisplayProps {
  value: string;
  history: string[];
  memory: number;
}

export function CalculatorDisplay({ value, history, memory }: CalculatorDisplayProps) {
  const displayValue = value || '0';
  const hasMemory = memory !== 0;

  return (
    <div className="bg-slate-900 rounded-lg p-6 mb-4 border-2 border-slate-700 shadow-inner">
      {/* History Section */}
      {history.length > 0 && (
        <ScrollArea className="h-20 mb-3">
          <div className="space-y-1">
            {history.slice(0, 3).map((entry, index) => (
              <div
                key={index}
                className="text-slate-400 text-sm font-mono opacity-60 text-right"
              >
                {entry}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Memory Indicator */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {hasMemory && (
            <span className="text-orange-400 text-xs font-semibold bg-orange-400/20 px-2 py-1 rounded">
              M
            </span>
          )}
        </div>
        <div className="text-slate-500 text-xs font-mono">
          {displayValue.length > 1 && displayValue !== 'Error' && (
            <span>{displayValue.length} digits</span>
          )}
        </div>
      </div>

      {/* Main Display */}
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          readOnly
          className={`
            w-full bg-transparent border-none text-right font-mono text-4xl
            focus:outline-none focus:ring-0 select-all
            ${displayValue === 'Error' ? 'text-red-400' : 'text-white'}
            ${displayValue.length > 10 ? 'text-2xl' : 'text-4xl'}
            ${displayValue.length > 15 ? 'text-xl' : ''}
          `}
          style={{
            fontSize: displayValue.length > 20 ? '1rem' : 
                      displayValue.length > 15 ? '1.25rem' : 
                      displayValue.length > 10 ? '1.5rem' : '2.25rem'
          }}
        />
        
        {/* Subtle glow effect for the display */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded pointer-events-none" />
      </div>

      {/* Additional Info */}
      <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
        <div>
          {displayValue !== '0' && displayValue !== 'Error' && (
            <span>Press = for result</span>
          )}
        </div>
        <div>
          <span>Press Esc to clear</span>
        </div>
      </div>
    </div>
  );
}