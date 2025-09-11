'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  CalculatorState, 
  CalculatorOperation, 
  initialState, 
  calculate, 
  formatNumber, 
  isValidNumber, 
  performScientificOperation,
  addToHistory 
} from '@/lib/calculator';

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  // Handle number input
  const inputNumber = useCallback((num: string) => {
    setState(prevState => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: num,
          waitingForOperand: false,
        };
      }

      const currentDisplay = prevState.display === '0' ? num : prevState.display + num;
      
      // Prevent multiple decimal points
      if (num === '.' && currentDisplay.includes('.')) {
        return prevState;
      }

      return {
        ...prevState,
        display: currentDisplay,
      };
    });
  }, []);

  // Handle operation input
  const inputOperation = useCallback((nextOperation: CalculatorOperation) => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);

      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForOperand: true,
        };
      }

      if (prevState.operation && prevState.waitingForOperand) {
        return {
          ...prevState,
          operation: nextOperation,
        };
      }

      try {
        const result = calculate(prevState.previousValue, inputValue, prevState.operation || '+');
        const formattedResult = formatNumber(result);
        
        let newHistory = prevState.history;
        if (nextOperation === '=') {
          const expression = `${prevState.previousValue} ${prevState.operation} ${inputValue}`;
          newHistory = addToHistory(prevState.history, expression, formattedResult);
        }

        return {
          ...prevState,
          display: formattedResult,
          previousValue: nextOperation === '=' ? null : result,
          operation: nextOperation === '=' ? null : nextOperation,
          waitingForOperand: true,
          history: newHistory,
        };
      } catch (error) {
        return {
          ...prevState,
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        };
      }
    });
  }, []);

  // Handle scientific operations
  const inputScientificOperation = useCallback((operation: string) => {
    setState(prevState => {
      const inputValue = parseFloat(prevState.display);
      
      if (!isValidNumber(prevState.display)) {
        return prevState;
      }

      try {
        const result = performScientificOperation(inputValue, operation);
        const formattedResult = formatNumber(result);
        
        const expression = operation === '±' ? `-(${inputValue})` : `${operation}(${inputValue})`;
        const newHistory = addToHistory(prevState.history, expression, formattedResult);

        return {
          ...prevState,
          display: formattedResult,
          waitingForOperand: true,
          history: newHistory,
        };
      } catch (error) {
        return {
          ...prevState,
          display: 'Error',
          waitingForOperand: true,
        };
      }
    });
  }, []);

  // Handle memory operations
  const memoryOperation = useCallback((operation: string) => {
    setState(prevState => {
      const currentValue = parseFloat(prevState.display);
      
      if (!isValidNumber(prevState.display)) {
        return prevState;
      }

      switch (operation) {
        case 'MC':
          return { ...prevState, memory: 0 };
        case 'MR':
          return { 
            ...prevState, 
            display: formatNumber(prevState.memory),
            waitingForOperand: true,
          };
        case 'M+':
          return { ...prevState, memory: prevState.memory + currentValue };
        case 'M-':
          return { ...prevState, memory: prevState.memory - currentValue };
        case 'MS':
          return { ...prevState, memory: currentValue };
        default:
          return prevState;
      }
    });
  }, []);

  // Clear functions
  const clearEntry = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      display: '0',
    }));
  }, []);

  const clearAll = useCallback(() => {
    setState(initialState);
  }, []);

  const backspace = useCallback(() => {
    setState(prevState => {
      if (prevState.display === '0' || prevState.display === 'Error' || prevState.waitingForOperand) {
        return prevState;
      }

      const newDisplay = prevState.display.slice(0, -1) || '0';
      return {
        ...prevState,
        display: newDisplay,
      };
    });
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Prevent default behavior for calculator keys
      if (/[\d+\-*/=.%]|Enter|Backspace|Delete|Escape/.test(key)) {
        event.preventDefault();
      }

      if (/\d/.test(key)) {
        inputNumber(key);
      } else if (key === '.') {
        inputNumber('.');
      } else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*') {
        inputOperation('×');
      } else if (key === '/') {
        inputOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        inputOperation('=');
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Delete' || key === 'c' || key === 'C') {
        clearEntry();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === '%') {
        inputScientificOperation('%');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputNumber, inputOperation, inputScientificOperation, backspace, clearEntry, clearAll]);

  return {
    state,
    inputNumber,
    inputOperation,
    inputScientificOperation,
    memoryOperation,
    clearEntry,
    clearAll,
    backspace,
  };
}