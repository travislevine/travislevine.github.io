"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowRight, ExternalLink, GitFork, Info, Search, Star } from "lucide-react";
import { languageColor, rankRepos, type RankedRepo } from "@/lib/github";
import { useGitHubRepos } from "@/lib/useGitHubRepos";
import { profile } from "@/data/profile";
import { GitHubIcon } from "./BrandIcons";

type SortKey = "quality" | "recent" | "stars";

const dateFmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" });

export function RepoFeed({ limit, controls = true }: { limit?: number; controls?: boolean }) {
  const { status, repos, error } = useGitHubRepos();
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("quality");
  const [showAll, setShowAll] = useState(false);

  const ranked = useMemo(() => rankRepos(repos, { includeForksAndArchived: showAll }), [repos, showAll]);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of ranked) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l);
  }, [ranked]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ranked.filter((r) => {
      if (lang && r.language !== lang) return false;
      if (!q) return true;
      return [r.name, r.description ?? "", r.language ?? "", ...(r.topics ?? [])].join(" ").toLowerCase().includes(q);
    });
    if (sort === "recent") list = [...list].sort((a, b) => Date.parse(b.lastActivity) - Date.parse(a.lastActivity));
    if (sort === "stars") list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count || b.qualityScore - a.qualityScore);
    return limit ? list.slice(0, limit) : list;
  }, [ranked, query, lang, sort, limit]);

  return (
    <div>
      {controls && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search repositories</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, topic, language…"
                className="w-full rounded-lg border border-ink-600 bg-ink-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <span className="font-mono text-xs">sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none"
                >
                  <option value="quality">Best match</option>
                  <option value="recent">Recently updated</option>
                  <option value="stars">Most stars</option>
                </select>
              </label>
              <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={showAll}
                  onChange={(e) => setShowAll(e.target.checked)}
                  className="h-4 w-4 rounded border-ink-600 bg-ink-900 accent-emerald-400"
                />
                Forks & archived
              </label>
            </div>
          </div>

          {languages.length > 1 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by language">
              <Pill active={lang === null} onClick={() => setLang(null)}>
                All
              </Pill>
              {languages.map((l) => (
                <Pill key={l} active={lang === l} onClick={() => setLang(lang === l ? null : l)}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor(l) }} />
                  {l}
                </Pill>
              ))}
            </div>
          )}
        </div>
      )}

      {status === "loading" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit ?? 6 }).map((_, i) => (
            <div key={i} className="card h-48 animate-pulse p-5">
              <div className="h-4 w-1/2 rounded bg-ink-700" />
              <div className="mt-4 h-3 w-full rounded bg-ink-800" />
              <div className="mt-2 h-3 w-4/5 rounded bg-ink-800" />
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="card flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
          <p className="flex-1 text-sm text-slate-400">{error}</p>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:underline">
            <GitHubIcon /> View on GitHub
          </a>
        </div>
      )}

      {status === "ready" && visible.length === 0 && (
        <div className="card p-8 text-center text-sm text-slate-400">
          {ranked.length === 0 ? "No public repositories to show yet." : "No repositories match your filters."}
        </div>
      )}

      {status === "ready" && visible.length > 0 && (
        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((r) => (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <RepoCard repo={r} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {limit && status === "ready" && ranked.length > limit && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900/60 px-4 py-2.5 text-sm text-slate-200 transition hover:border-emerald-400/50 hover:text-white"
          >
            Browse all {ranked.length} repositories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition ${
        active
          ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
          : "border-ink-600 bg-ink-900 text-slate-400 hover:border-ink-600 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function RepoCard({ repo }: { repo: RankedRepo }) {
  const scoreTitle = repo.scoreReasons.map((r) => `+${r.points}  ${r.label}`).join("\n");
  return (
    <article className="card group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold text-white hover:text-emerald-300"
        >
          <GitHubIcon className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-emerald-300" />
          <span className="truncate">{repo.name}</span>
        </a>
        <div className="flex shrink-0 items-center gap-1.5">
          {repo.archived && <span className="rounded border border-amber-400/30 px-1.5 font-mono text-[10px] text-amber-300">archived</span>}
          {repo.fork && <span className="rounded border border-ink-600 px-1.5 font-mono text-[10px] text-slate-400">fork</span>}
          <span
            title={scoreTitle || "No signals yet"}
            className="inline-flex cursor-help items-center gap-1 rounded border border-cyan-400/25 bg-cyan-400/5 px-1.5 font-mono text-[10px] text-cyan-300"
          >
            <Info className="h-3 w-3" />
            {repo.qualityScore}
          </span>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {repo.description || <span className="italic text-slate-600">No description provided.</span>}
      </p>

      {(repo.topics?.length ?? 0) > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics!.slice(0, 5).map((t) => (
            <span key={t} className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 font-mono text-xs text-slate-500">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: languageColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1" title="Stars">
          <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1" title="Forks">
          <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
        </span>
        <span title="Last updated">{dateFmt.format(new Date(repo.lastActivity))}</span>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-emerald-300 hover:underline">
            Live <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}
