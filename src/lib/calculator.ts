export type CalculatorOperation = '+' | '-' | '×' | '÷' | '=' | null;

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: CalculatorOperation;
  waitingForOperand: boolean;
  memory: number;
  history: string[];
}

export const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  memory: 0,
  history: [],
};

export function calculate(firstOperand: number, secondOperand: number, operation: string): number {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        throw new Error('Division by zero');
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

export function formatNumber(num: number): string {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Error';
  
  // Handle very large numbers
  if (Math.abs(num) >= 1e10) {
    return num.toExponential(6);
  }
  
  // Remove trailing zeros and unnecessary decimal points
  const formatted = num.toString();
  if (formatted.includes('.')) {
    return formatted.replace(/\.?0+$/, '');
  }
  
  return formatted;
}

export function isValidNumber(input: string): boolean {
  const num = parseFloat(input);
  return !isNaN(num) && isFinite(num);
}

export function performScientificOperation(value: number, operation: string): number {
  switch (operation) {
    case '√':
      if (value < 0) throw new Error('Invalid input');
      return Math.sqrt(value);
    case 'x²':
      return value * value;
    case '1/x':
      if (value === 0) throw new Error('Division by zero');
      return 1 / value;
    case '±':
      return -value;
    case '%':
      return value / 100;
    default:
      return value;
  }
}

export function addToHistory(history: string[], expression: string, result: string): string[] {
  const newEntry = `${expression} = ${result}`;
  const newHistory = [newEntry, ...history.slice(0, 4)]; // Keep last 5 entries
  return newHistory;
}