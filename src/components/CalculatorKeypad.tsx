'use client';

import { CalculatorButton } from './CalculatorButton';

interface CalculatorKeypadProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (operator: '+' | '-' | '×' | '÷' | '=') => void;
  onFunctionClick: (fn: string) => void;
  onMemoryClick: (mem: string) => void;
  onClear: () => void;
  onAllClear: () => void;
  onBackspace: () => void;
  memoryValue: number;
}

export function CalculatorKeypad({
  onNumberClick,
  onOperatorClick,
  onFunctionClick,
  onMemoryClick,
  onClear,
  onAllClear,
  onBackspace,
  memoryValue,
}: CalculatorKeypadProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {/* Row 1: Memory and Clear functions */}
      <CalculatorButton
        value="MC"
        onClick={() => onMemoryClick('MC')}
        variant="function"
        disabled={memoryValue === 0}
      />
      <CalculatorButton
        value="MR"
        onClick={() => onMemoryClick('MR')}
        variant="function"
        disabled={memoryValue === 0}
      />
      <CalculatorButton
        value="M+"
        onClick={() => onMemoryClick('M+')}
        variant="function"
      />
      <CalculatorButton
        value="M-"
        onClick={() => onMemoryClick('M-')}
        variant="function"
      />
      <CalculatorButton
        value="AC"
        onClick={onAllClear}
        variant="clear"
      />

      {/* Row 2: Scientific functions */}
      <CalculatorButton
        value="√"
        onClick={() => onFunctionClick('√')}
        variant="function"
      />
      <CalculatorButton
        value="x²"
        onClick={() => onFunctionClick('x²')}
        variant="function"
      />
      <CalculatorButton
        value="1/x"
        onClick={() => onFunctionClick('1/x')}
        variant="function"
      />
      <CalculatorButton
        value="±"
        onClick={() => onFunctionClick('±')}
        variant="function"
      />
      <CalculatorButton
        value="C"
        onClick={onClear}
        variant="clear"
      />

      {/* Row 3: Numbers and operations */}
      <CalculatorButton
        value="%"
        onClick={() => onFunctionClick('%')}
        variant="function"
      />
      <CalculatorButton
        value="⌫"
        onClick={onBackspace}
        variant="function"
      />
      <CalculatorButton
        value="("
        onClick={() => onNumberClick('(')}
        variant="function"
      />
      <CalculatorButton
        value=")"
        onClick={() => onNumberClick(')')}
        variant="function"
      />
      <CalculatorButton
        value="÷"
        onClick={() => onOperatorClick('÷')}
        variant="operator"
      />

      {/* Row 4: Numbers 7-9 and multiply */}
      <CalculatorButton
        value="7"
        onClick={() => onNumberClick('7')}
        variant="number"
      />
      <CalculatorButton
        value="8"
        onClick={() => onNumberClick('8')}
        variant="number"
      />
      <CalculatorButton
        value="9"
        onClick={() => onNumberClick('9')}
        variant="number"
      />
      <CalculatorButton
        value="×"
        onClick={() => onOperatorClick('×')}
        variant="operator"
      />
      <CalculatorButton
        value="="
        onClick={() => onOperatorClick('=')}
        variant="equals"
        className="row-span-2"
      />

      {/* Row 5: Numbers 4-6 and subtract */}
      <CalculatorButton
        value="4"
        onClick={() => onNumberClick('4')}
        variant="number"
      />
      <CalculatorButton
        value="5"
        onClick={() => onNumberClick('5')}
        variant="number"
      />
      <CalculatorButton
        value="6"
        onClick={() => onNumberClick('6')}
        variant="number"
      />
      <CalculatorButton
        value="-"
        onClick={() => onOperatorClick('-')}
        variant="operator"
      />

      {/* Row 6: Numbers 1-3 and add */}
      <CalculatorButton
        value="1"
        onClick={() => onNumberClick('1')}
        variant="number"
      />
      <CalculatorButton
        value="2"
        onClick={() => onNumberClick('2')}
        variant="number"
      />
      <CalculatorButton
        value="3"
        onClick={() => onNumberClick('3')}
        variant="number"
      />
      <CalculatorButton
        value="+"
        onClick={() => onOperatorClick('+')}
        variant="operator"
        className="row-span-2"
      />

      {/* Row 7: Zero and decimal */}
      <CalculatorButton
        value="0"
        onClick={() => onNumberClick('0')}
        variant="number"
        size="wide"
      />
      <CalculatorButton
        value="."
        onClick={() => onNumberClick('.')}
        variant="number"
      />
    </div>
  );
}