/**
 * Application-wide constants for the GitHub Portfolio app.
 */

/**
 * Number of repositories to display per page.
 */
export const ITEMS_PER_PAGE = 12;

/**
 * Debounce delay for search input in milliseconds.
 */
export const DEBOUNCE_DELAY_MS = 300;

/**
 * React Query stale time in milliseconds (5 minutes).
 * After this time, data will be refetched on mount.
 */
export const STALE_TIME_MS = 300_000;

/**
 * Number of retry attempts for failed API requests.
 */
export const QUERY_RETRY_COUNT = 1;

/**
 * Predefined language colors for GitHub languages.
 * Provides consistent coloring across the app.
 */
export const LANGUAGE_COLORS: Record<string, string> = {
  "TypeScript": "#3178c6",
  "JavaScript": "#f7df1e",
  "Python": "#3776ab",
  "Java": "#b07219",
  "Ruby": "#701516",
  "Go": "#00add8",
  "Rust": "#dea584",
  "CSS": "#563d7c",
  "HTML": "#e34c26",
  "Vue": "#41b883",
  "Svelte": "#ff3e00",
  "PHP": "#4F5D95",
  "Swift": "#ffac45",
  "Kotlin": "#7F52FF",
  "Scala": "#c22d40",
  "Shell": "#89e051",
  "PowerShell": "#012456",
  "C": "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  "R": "#198ce7",
  "Dart": "#00d4b8",
  "Elixir": "#6e4a7e",
  "Erlang": "#B83998",
  "Haskell": "#5e5086",
  "Lua": "#000080",
  "Perl": "#0298c3",
  "Raku": "#0000fb",
  "Julia": "#a270ba",
  "MATLAB": "#e16737",
  "Jupyter Notebook": "#DA5B0B",
  "Makefile": "#427819",
  "Dockerfile": "#384d54",
  "YAML": "#cb171e",
  "JSON": "#292929",
  "Markdown": "#083fa1",
  "SCSS": "#c6538c",
  "Less": "#1d365d",
  "PostScript": "#da291c",
  "Assembly": "#6E4C13",
  "Common Lisp": "#3fb68b",
  "Scheme": "#1e4aec",
  "Clojure": "#db5855",
  "F#": "#b845fc",
  "OCaml": "#ef7a08",
  "Elm": "#60B5CC",
  "Reason": "#ff5847",
  "Fortran": "#4d41b1",
  "COBOL": "#484554",
  "Ada": "#02f88c",
  "Pascal": "#E3F171",
  "Delphi": "#b0ce4e",
  "Groovy": "#e69f56",
  "Apex": "#1797c0",
  "Visual Basic": "#945db7",
  "ActionScript": "#882B0F",
  "CoffeeScript": "#244776",
  "Haxe": "#df7900",
  "Solidity": "#AA6746",
  "VBA": "#867db1",
  "Unknown": "#808080",
} as const;

/**
 * Default GitHub username when none is provided.
 */
export const DEFAULT_GITHUB_USERNAME = "vercel";

/**
 * Get color for a programming language.
 * Returns predefined color or unknown color as fallback.
 * @param language - Language name or null
 * @returns Hex color string
 */
export function getLanguageColor(language: string | null): string {
  if (!language) return LANGUAGE_COLORS["Unknown"];
  return LANGUAGE_COLORS[language] ?? LANGUAGE_COLORS["Unknown"];
}
