import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { RepoFeed } from "@/components/RepoFeed";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Interests } from "@/components/Interests";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="projects"
        eyebrow="projects"
        title="Featured Projects"
        intro="Selected work across offline-first web apps, IoT and embedded systems."
      >
        <FlagshipProjects />

        <Reveal className="mt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Open Source on GitHub</h3>
              <p className="mt-1 text-sm text-slate-400">Live from GitHub and ranked by project quality.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-6">
          <RepoFeed limit={6} controls={false} />
        </div>
      </Section>

      <Section id="experience" eyebrow="experience" title="Professional Experience">
        <Experience />
      </Section>

      <Section id="skills" eyebrow="skills" title="Skills & Certifications">
        <Skills />
      </Section>

      <Section
        id="education"
        eyebrow="education"
        title="Educational Achievements"
        intro="Highest-performing units, ordered from highest mark to lowest."
      >
        <Education />
      </Section>

      <Section id="interests" eyebrow="beyond the terminal" title="Beyond the Terminal">
        <Interests />
      </Section>

      <Section id="contact" eyebrow="contact" title="Get in Touch">
        <Contact />
      </Section>
    </>
  );
}
