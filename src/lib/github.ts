// GitHub REST API service + quality-ranking algorithm.
//
// Repos are fetched in the visitor's browser from the public endpoint. That endpoint only
// ever returns PUBLIC repos, so a repo switched to Private disappears on the next page load
// (after at most CACHE_TTL_MS of session caching) without a rebuild. We also filter on
// `private === false` as a second guard.

import { GITHUB_USERNAME } from "@/data/profile";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  size: number; // KB
  fork: boolean;
  archived: boolean;
  private: boolean;
  disabled?: boolean;
  updated_at: string;
  pushed_at: string | null;
};

export type ScoreReason = { label: string; points: number };

export type RankedRepo = GitHubRepo & {
  qualityScore: number;
  scoreReasons: ScoreReason[];
  lastActivity: string;
};

export const HIGH_SIGNAL_KEYWORDS = [
  "ai",
  "nextjs",
  "supabase",
  "automation",
  "machine-learning",
  "security",
  "iot",
  "embedded",
  "docker",
  "typescript",
  "python",
  "bikepark",
];

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 182;
const DETAILED_DESCRIPTION_MIN_CHARS = 25;

/** Normalises text into a set of lower-case tokens, so "ai" matches "AI-powered" but not "maintain". */
function tokenise(text: string): Set<string> {
  const tokens = new Set<string>();
  const lower = text.toLowerCase();
  for (const t of lower.split(/[^a-z0-9]+/)) if (t) tokens.add(t);
  // Also keep hyphen/space-joined phrases searchable, e.g. "machine learning" -> "machine-learning".
  tokens.add(lower.replace(/[\s_]+/g, "-"));
  return tokens;
}

export function matchedKeywords(repo: GitHubRepo): string[] {
  const topics = repo.topics ?? [];
  const haystack = [repo.name, repo.description ?? "", ...topics].join(" ");
  const tokens = tokenise(haystack);
  const flat = haystack.toLowerCase().replace(/[\s_]+/g, "-");
  return HIGH_SIGNAL_KEYWORDS.filter((kw) => {
    if (kw.includes("-")) return flat.includes(kw);
    if (kw === "nextjs") return tokens.has("nextjs") || flat.includes("next-js") || flat.includes("next.js");
    return tokens.has(kw) || topics.includes(kw);
  });
}

export function lastActivity(repo: GitHubRepo): string {
  const pushed = repo.pushed_at ? Date.parse(repo.pushed_at) : 0;
  const updated = Date.parse(repo.updated_at);
  return new Date(Math.max(pushed, updated)).toISOString();
}

/** Scores a repo for employer-facing quality. Higher is better. */
export function scoreRepo(repo: GitHubRepo, now = Date.now()): RankedRepo {
  const reasons: ScoreReason[] = [];
  const desc = repo.description?.trim() ?? "";

  if (desc.length >= DETAILED_DESCRIPTION_MIN_CHARS) reasons.push({ label: "Detailed description", points: 30 });
  if ((repo.topics?.length ?? 0) > 0) reasons.push({ label: "Has topics", points: 20 });

  const kws = matchedKeywords(repo);
  if (kws.length > 0) reasons.push({ label: `Keywords: ${kws.join(", ")}`, points: 25 });

  if (repo.stargazers_count > 0) reasons.push({ label: `${repo.stargazers_count} star(s)`, points: repo.stargazers_count * 15 });
  if (repo.forks_count > 0) reasons.push({ label: `${repo.forks_count} fork(s)`, points: repo.forks_count * 10 });
  if (repo.size > 50) reasons.push({ label: "Substantial codebase", points: 10 });

  const activity = lastActivity(repo);
  if (now - Date.parse(activity) <= SIX_MONTHS_MS) reasons.push({ label: "Active in last 6 months", points: 15 });

  return {
    ...repo,
    qualityScore: reasons.reduce((sum, r) => sum + r.points, 0),
    scoreReasons: reasons,
    lastActivity: activity,
  };
}

export type RankOptions = { includeForksAndArchived?: boolean };

/** Filters out private/fork/archived/empty/profile-readme repos (unless toggled) and ranks by quality. */
export function rankRepos(repos: GitHubRepo[], opts: RankOptions = {}): RankedRepo[] {
  return repos
    .filter((r) => !r.private && !r.disabled)
    .filter((r) => opts.includeForksAndArchived || (!r.fork && !r.archived && r.size > 0))
    .filter((r) => opts.includeForksAndArchived || r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
    .map((r) => scoreRepo(r))
    .sort(
      (a, b) =>
        b.qualityScore - a.qualityScore ||
        b.stargazers_count - a.stargazers_count ||
        Date.parse(b.lastActivity) - Date.parse(a.lastActivity),
    );
}

// ---- Fetching (client side) -------------------------------------------------------------

const CACHE_KEY = `gh-repos:${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 5 * 60 * 1000; // short, so visibility changes show up quickly
let inflight: Promise<GitHubRepo[]> | null = null;

function readCache(): GitHubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: GitHubRepo[] };
    return Date.now() - at < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubRepo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable: ignore */
  }
}

/** Fetches all public repos for the configured user. De-duplicates concurrent calls. */
export function fetchPublicRepos(): Promise<GitHubRepo[]> {
  const cached = typeof window !== "undefined" ? readCache() : null;
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;

  inflight = (async () => {
    const all: GitHubRepo[] = [];
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=updated&page=${page}`,
        { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" },
      );
      if (!res.ok) {
        const limited = res.status === 403 || res.status === 429;
        throw new Error(limited ? "GitHub API rate limit reached. Try again in a few minutes." : `GitHub API error (${res.status})`);
      }
      const batch = (await res.json()) as GitHubRepo[];
      all.push(...batch);
      if (batch.length < 100) break;
    }
    writeCache(all);
    return all;
  })().finally(() => {
    inflight = null;
  });

  return inflight;
}

// GitHub linguist colours for common languages.
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  "Jupyter Notebook": "#DA5B0B",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  PLSQL: "#dad8d8",
  TSQL: "#e38c00",
  Arduino: "#bd79d1",
  PowerShell: "#012456",
  Lua: "#000080",
  MDX: "#fcb32c",
};

export function languageColor(lang: string | null): string {
  return (lang && LANGUAGE_COLORS[lang]) || "#64748b";
}
