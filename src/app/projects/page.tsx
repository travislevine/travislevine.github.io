import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { RepoFeed } from "@/components/RepoFeed";

export const metadata: Metadata = {
  title: "Projects & Open Source",
  description: "Featured projects and public GitHub repositories by Travis Levine.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <Section id="featured" eyebrow="projects" title="Featured Projects" intro="The projects I'm most proud of.">
        <FlagshipProjects />
      </Section>
      <Section
        id="repos"
        eyebrow="open source"
        title="All Public Repositories"
        intro="Pulled live from GitHub. Sorted by default to surface well-documented, active and relevant work first. Hover the score badge to see how a repo is ranked."
        className="pt-0"
      >
        <RepoFeed />
      </Section>
    </div>
  );
}
