import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";

export function Experience() {
  return (
    <ol className="relative ml-3 border-l border-ink-700">
      {experience.map((job, i) => (
        <li key={job.company} className="relative pb-12 pl-8 last:pb-0">
          <span
            className={`absolute -left-[13px] top-1 grid h-6 w-6 place-items-center rounded-full border bg-ink-950 ${
              i === 0 ? "border-emerald-400/60 text-emerald-300 glow-emerald" : "border-ink-600 text-slate-500"
            }`}
          >
            <Briefcase className="h-3 w-3" />
          </span>
          <Reveal delay={i * 0.05}>
            <div className="card p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <p className="text-emerald-300">{job.company}</p>
                </div>
                <div className="flex flex-col gap-1 font-mono text-xs text-slate-500 sm:items-end">
                  <span className="text-slate-300">{job.period}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
