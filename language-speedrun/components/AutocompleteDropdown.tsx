import { type Language } from '../data/languages';

interface AutocompleteDropdownProps {
  suggestions: Language[];
  selectedIndex: number;
  onSelect: (suggestion: Language) => void;
}

export default function AutocompleteDropdown({ suggestions, selectedIndex, onSelect }: AutocompleteDropdownProps) {
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion.code}
          onClick={() => onSelect(suggestion)}
          className={`
            w-full px-6 py-3 text-left text-base
            transition-colors duration-150
            ${selectedIndex === index
              ? 'bg-blue-100 text-blue-900'
              : 'hover:bg-gray-100'
            }
            ${index === 0 ? 'rounded-t-lg' : ''}
            ${index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-200'}
          `}
        >
          {suggestion.name}
        </button>
      ))}
    </div>
  );
}
