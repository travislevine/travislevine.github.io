export function Tag({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "emerald" | "cyan" }) {
  const tones = {
    slate: "border-ink-600 bg-ink-800/80 text-slate-300",
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  );
}
