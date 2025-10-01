import React, { useState, useEffect, useRef } from 'react';
import { getAutocompleteSuggestions } from '../utils/autocomplete';
import AutocompleteDropdown from './AutocompleteDropdown';

export default function AnswerInput({ onSubmit, disabled, languages, showFeedback, isCorrect }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on mount and after each question
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
  }, [input, languages]);

  const handleKeyDown = (e) => {
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

  const handleSubmit = (answer) => {
    if (!disabled && answer.trim()) {
      onSubmit(answer.trim());
      setInput('');
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSubmit(suggestion.name);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type language name..."
        className={`
          w-full px-6 py-4 text-lg border-2 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2
          ${showFeedback
            ? isCorrect
              ? 'border-correct bg-green-50'
              : 'border-incorrect bg-red-50 shake'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
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
}
