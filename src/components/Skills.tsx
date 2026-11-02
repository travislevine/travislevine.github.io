import { BadgeCheck, Code2, Database, ShieldCheck, Sparkles } from "lucide-react";
import { certifications, skillGroups } from "@/data/profile";
import { Reveal } from "./Reveal";

const icons = { sparkles: Sparkles, code: Code2, database: Database, shield: ShieldCheck };

export function Skills() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon];
          const accent = i === 0;
          return (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="card group h-full p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg border ${
                      accent ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-cyan-400/25 bg-cyan-400/5 text-cyan-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-white">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-ink-700 bg-ink-900/80 px-3 py-1.5 text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-white"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.code} delay={0.1 + i * 0.05}>
            <div className="card relative flex items-center gap-5 overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 glow-emerald">
                <BadgeCheck className="h-7 w-7" />
              </span>
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-wider text-emerald-300">Certification · {c.code}</p>
                <h3 className="mt-1 font-semibold text-white">{c.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">Issued via {c.issuer}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
