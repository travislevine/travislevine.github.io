import { GraduationCap } from "lucide-react";
import { degrees, sortedUnits, type Grade } from "@/data/profile";
import { Reveal } from "./Reveal";

const gradeStyles: Record<Grade, { badge: string; bar: string; label: string }> = {
  HD: { badge: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300 glow-emerald", bar: "from-emerald-400 to-cyan-400", label: "High Distinction" },
  D: { badge: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300", bar: "from-cyan-400 to-sky-500", label: "Distinction" },
  CR: { badge: "border-slate-500/40 bg-slate-500/10 text-slate-300", bar: "from-slate-400 to-slate-500", label: "Credit" },
};

export function Education() {
  const counts = sortedUnits.reduce<Record<Grade, number>>((acc, u) => ({ ...acc, [u.grade]: acc[u.grade] + 1 }), { HD: 0, D: 0, CR: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {degrees.map((d, i) => (
          <Reveal key={d.school} delay={i * 0.05}>
            <div className={`card h-full p-6 ${d.current ? "border-emerald-400/30" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-slate-400">{d.period}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{d.degree}</h3>
              <p className="text-emerald-300">{d.school}</p>
              <p className={`mt-3 text-sm ${d.current ? "font-mono text-cyan-300" : "text-slate-400"}`}>{d.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>


      <Reveal>
        <div className="card overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-ink-700 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold text-white">Top completed units</h3>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {(Object.keys(counts) as Grade[]).map((g) => (
                <span key={g} className={`rounded-md border px-2 py-0.5 ${gradeStyles[g].badge}`}>
                  {counts[g]} × {g}
                </span>
              ))}
            </div>
          </div>
          <ol>
            {sortedUnits.map((u, i) => {
              const s = gradeStyles[u.grade];
              return (
                <li
                  key={u.code}
                  className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-ink-800 px-5 py-3 last:border-0 hover:bg-ink-850 sm:grid-cols-[2rem_5rem_1fr_9rem_3.5rem_3rem]"
                >
                  <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden font-mono text-sm text-cyan-300 sm:block">{u.code}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-mono text-cyan-300 sm:hidden">{u.code} </span>
                      {u.name}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500">{u.uni === "UniSC" ? "University of the Sunshine Coast" : "Deakin University"}</p>
                  </div>
                  <div className="hidden h-1.5 overflow-hidden rounded-full bg-ink-800 sm:block" aria-hidden>
                    <div className={`h-full rounded-full bg-gradient-to-r ${s.bar}`} style={{ width: `${u.mark}%` }} />
                  </div>
                  <span className="hidden text-right font-mono text-sm font-semibold text-white sm:block">{u.mark}</span>
                  <span className="flex items-center justify-end gap-2">
                    <span className="font-mono text-sm font-semibold text-white sm:hidden">{u.mark}</span>
                    <span title={s.label} className={`rounded-md border px-1.5 py-0.5 text-center font-mono text-[11px] font-semibold ${s.badge}`}>
                      {u.grade}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}
