import { Dumbbell, Server, Trophy } from "lucide-react";
import { interests } from "@/data/profile";
import { Reveal } from "./Reveal";

const icons = { server: Server, dumbbell: Dumbbell, trophy: Trophy };

export function Interests() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {interests.map((it, i) => {
        const Icon = icons[it.icon];
        const homelab = it.icon === "server";
        return (
          <Reveal key={it.title} delay={i * 0.06} className="min-w-0">
            <div className="card group flex h-full flex-col p-6">
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl border transition ${
                  homelab
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 group-hover:glow-emerald"
                    : "border-cyan-400/25 bg-cyan-400/5 text-cyan-300 group-hover:glow-cyan"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{it.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-400">{it.body}</p>
              {homelab ? (
                <pre className="mt-5 whitespace-pre-wrap break-words rounded-lg border border-ink-700 bg-ink-950 p-3 font-mono text-[11px] leading-5 text-slate-400">
                  <span className="text-emerald-400">$</span> docker compose up -d{"\n"}
                  <span className="text-slate-600"># {it.tags.slice(1).join(" · ")}</span>
                </pre>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span key={t} className="rounded-full border border-ink-600 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
