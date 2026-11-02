import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 ${className}`}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
          <span className="text-slate-600">{"//"}</span> {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-slate-400">{intro}</p>}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
