import { type Language } from '../data/languages';

export function getAutocompleteSuggestions(input: string, languages: Language[]): Language[] {
  if (!input || input.length === 0) return [];

  const normalized = input.toLowerCase().trim();

  const matches = languages.filter(lang =>
    lang.name.toLowerCase().startsWith(normalized) ||
    lang.acceptableAnswers.some(ans => ans.toLowerCase().startsWith(normalized))
  );

  matches.sort((a, b) => {
    const aExact = a.name.toLowerCase() === normalized;
    const bExact = b.name.toLowerCase() === normalized;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return a.name.localeCompare(b.name);
  });

  return matches.slice(0, 5);
}
