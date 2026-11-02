"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, GraduationCap, Mail, MapPin, Workflow } from "lucide-react";
import Link from "next/link";
import { profile, sortedUnits } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const hdCount = sortedUnits.filter((u) => u.grade === "HD").length;

const stats = [
  { value: "6.78", suffix: "/7", label: "Cumulative GPA", icon: GraduationCap },
  { value: String(hdCount), suffix: "", label: "High Distinctions", icon: Award },
  { value: "8+", suffix: "", label: "Production webforms shipped", icon: Workflow },
];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section id="about" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 font-mono text-xs text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Final-year Computer Science · UniSC · Graduating 2026
        </motion.div>

        <motion.h1 {...fade(0.05)} className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {profile.name}
        </motion.h1>
        <motion.p {...fade(0.1)} className="mt-3 text-xl font-medium sm:text-2xl">
          <span className="text-gradient">{profile.title}</span>
        </motion.p>
        <motion.p {...fade(0.15)} className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
          {profile.headline}
        </motion.p>

        <motion.div {...fade(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-emerald-300"
          >
            View projects <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900/60 px-4 py-2.5 text-sm text-slate-200 transition hover:border-emerald-400/50"
          >
            <Mail className="h-4 w-4" /> Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink-600 bg-ink-900/60 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink-600 bg-ink-900/60 text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
          >
            <LinkedInIcon />
          </a>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </span>
        </motion.div>

        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          <motion.div {...fade(0.25)} className="card p-6 lg:col-span-3">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2">~/about.md</span>
            </div>
            <p className="mt-4 leading-relaxed text-slate-300">{profile.bio}</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fade(0.3 + i * 0.05)} className="card flex items-center gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-2xl font-semibold text-white">
                    {s.value}
                    <span className="text-base text-slate-500">{s.suffix}</span>
                  </p>
                  <p className="text-sm text-slate-400">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
