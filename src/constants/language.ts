export const LANGUAGE_VALUES = {
  ENGLISH: "English",
  GAELIGE: "Gaeilge",
} as const;

export type LanguageValue =
  (typeof LANGUAGE_VALUES)[keyof typeof LANGUAGE_VALUES];
