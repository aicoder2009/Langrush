'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { getAutocompleteSuggestions } from '../utils/autocomplete';
import AutocompleteDropdown from './AutocompleteDropdown';
import { languages, type Language } from '../data/languages';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled: boolean;
  showFeedback: boolean;
  isCorrect: boolean;
}

const AnswerInput = memo(({ onSubmit, disabled, showFeedback, isCorrect }: AnswerInputProps) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Language[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [showFeedback]);

  useEffect(() => {
    if (input.length > 0) {
      const newSuggestions = getAutocompleteSuggestions(input, languages);
      setSuggestions(newSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex].name);
      } else {
        handleSubmit(input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      const index = selectedIndex >= 0 ? selectedIndex : 0;
      setInput(suggestions[index].name);
      setSuggestions([]);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSubmit = useCallback((answer: string) => {
    if (!disabled && answer.trim()) {
      onSubmit(answer.trim());
      setInput('');
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [disabled, onSubmit]);

  const handleSuggestionClick = useCallback((suggestion: Language) => {
    handleSubmit(suggestion.name);
  }, [handleSubmit]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type language name..."
        className={`
          w-full px-6 py-4 text-lg font-medium rounded-full bg-white
          transition-all duration-200 shadow-sm
          focus:outline-none focus:ring-4 focus:ring-blue-200
          ${showFeedback
            ? isCorrect
              ? 'ring-4 ring-green-400'
              : 'ring-4 ring-red-400 shake'
            : ''
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      />

      {suggestions.length > 0 && !disabled && (
        <AutocompleteDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSuggestionClick}
        />
      )}
    </div>
  );
});

AnswerInput.displayName = 'AnswerInput';

export default AnswerInput;
