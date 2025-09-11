'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { Card } from '@/components/ui/card';

export function Calculator() {
  const {
    state,
    inputNumber,
    inputOperation,
    inputScientificOperation,
    memoryOperation,
    clearEntry,
    clearAll,
    backspace,
  } = useCalculator();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Calculator</h1>
            <div className="text-sm text-slate-400">
              Advanced Scientific Calculator
            </div>
          </div>

          {/* Display */}
          <CalculatorDisplay
            value={state.display}
            history={state.history}
            memory={state.memory}
          />

          {/* Keypad */}
          <CalculatorKeypad
            onNumberClick={inputNumber}
            onOperatorClick={inputOperation}
            onFunctionClick={inputScientificOperation}
            onMemoryClick={memoryOperation}
            onClear={clearEntry}
            onAllClear={clearAll}
            onBackspace={backspace}
            memoryValue={state.memory}
          />

          {/* Footer with keyboard shortcuts */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-500 text-center space-y-1">
              <div className="flex justify-between">
                <span>Keyboard shortcuts:</span>
                <span>Numbers (0-9), Operators (+, -, *, /)</span>
              </div>
              <div className="flex justify-between">
                <span>Enter/= : Calculate</span>
                <span>Esc : Clear All</span>
              </div>
              <div className="flex justify-between">
                <span>Backspace : Delete</span>
                <span>% : Percentage</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}