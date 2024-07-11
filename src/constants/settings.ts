import promptsData from "../locales/en/prompts.json";
import languagesData from "../data/languages.json";

export const LANG_DEFAULT = languagesData.languages[0];

export const DEFAULT_LANGUAGE = LANG_DEFAULT.value;

export const DEFAULT_PROMPT = promptsData.prompts[0];

export const ROLE_SYSTEM = "system";
