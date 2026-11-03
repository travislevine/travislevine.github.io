import { Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

const items = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: profile.githubLabel, href: profile.github, Icon: GitHubIcon, external: true },
  { label: "Location", value: profile.locationShort, href: null, Icon: MapPin, external: false },
];

export function Contact() {
  return (
    <Reveal>
      <div className="card relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/[0.08] via-transparent to-cyan-400/[0.08]" />
        <div className="relative grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Let&apos;s build something useful.</h3>
            <p className="mt-3 max-w-md text-slate-400">
              Open to new work opportunities and collaboration.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-emerald-300"
            >
              <Mail className="h-4 w-4" /> Send an email
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map(({ label, value, href, Icon, external }) => {
              const inner = (
                <>
                  <Icon className="h-4 w-4 text-emerald-300" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
                    <span className="block text-sm text-white [overflow-wrap:anywhere]">{value}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/80 p-4";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className={`${cls} transition hover:border-emerald-400/40`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
