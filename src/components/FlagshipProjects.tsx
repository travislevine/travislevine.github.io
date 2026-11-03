"use client";

import { Bike, Bot, Cpu, ExternalLink, Play, Sprout } from "lucide-react";
import { flagshipProjects, type FlagshipProject } from "@/data/profile";
import { useGitHubRepos } from "@/lib/useGitHubRepos";
import type { GitHubRepo } from "@/lib/github";
import { GitHubIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

const icons = { bike: Bike, sprout: Sprout, cpu: Cpu, bot: Bot };

/** Finds a public repo that looks like this project (name first, then topics/description). */
function findRepo(project: FlagshipProject, repos: GitHubRepo[]): GitHubRepo | undefined {
  const candidates = repos.filter((r) => !r.private && !r.fork);
  const norm = (s: string) => s.toLowerCase();
  return (
    candidates.find((r) => project.repoMatchers.some((m) => norm(r.name).includes(m))) ??
    candidates.find((r) =>
      project.repoMatchers.some((m) => (r.topics ?? []).some((t) => t.includes(m)) || norm(r.description ?? "").includes(m)),
    )
  );
}

export function FlagshipProjects() {
  const { repos } = useGitHubRepos();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {flagshipProjects.map((p, i) => {
        const Icon = icons[p.icon];
        const repo = findRepo(p, repos);
        const featured = i === 0;
        return (
          <Reveal key={p.id} delay={i * 0.05} className={featured ? "md:col-span-2" : ""}>
            <article className={`card group h-full p-6 ${featured ? "sm:p-8" : ""}`}>
              {featured && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/[0.07] via-transparent to-cyan-400/[0.06]" />
              )}
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 transition group-hover:glow-emerald">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex items-center gap-2">
                    {featured && <Tag tone="emerald">Featured</Tag>}
                    {repo?.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-ink-600 text-slate-400 hover:text-white"
                        aria-label={`${p.name} live demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {repo && (
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-ink-600 px-2.5 text-xs text-slate-300 hover:border-emerald-400/50 hover:text-white"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                  </div>
                </div>
                <h3 className={`mt-5 font-semibold text-white ${featured ? "text-2xl" : "text-xl"}`}>{p.name}</h3>
                <p className="mt-1 font-mono text-xs text-cyan-300/90">{p.tagline}</p>
                <p className={`mt-4 leading-relaxed text-slate-400 ${featured ? "max-w-3xl" : ""}`}>{p.description}</p>
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Watch ${p.name} demo on YouTube (opens in a new tab)`}
                      className="group/demo mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition hover:border-emerald-400/70 hover:bg-emerald-400/15 hover:text-emerald-200 hover:glow-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    >
                      <Play className="h-4 w-4 fill-current transition group-hover/demo:scale-110" />
                      Watch demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
