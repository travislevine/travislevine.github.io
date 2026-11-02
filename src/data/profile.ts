// Single source of truth for all portfolio content.
// Edit this file to update the site; components read from here.

export const GITHUB_USERNAME = "travislevine";

export const profile = {
  name: "Travis Levine",
  title: "AI Automation & Software Engineer",
  headline:
    "Final-year Computer Science student (6.78 GPA) building intelligent AI workflows, offline-first web apps, embedded systems, and self-hosted Linux infrastructure.",
  bio: "Final-year Computer Science student at the University of the Sunshine Coast (previously at Deakin University) with a strong foundation in AI-driven automation, full-stack development, embedded systems, and cybersecurity. Proven track record delivering production AI and automation solutions in legal technology environments, building offline-first PWAs for local government (Sunshine Coast Council), and running a self-managed Linux homelab with Docker Compose and local LLM deployments.",
  email: "t_l075@student.usc.edu.au",
  linkedin: "https://www.linkedin.com/in/travis-levine/",
  linkedinLabel: "linkedin.com/in/travis-levine",
  github: `https://github.com/${GITHUB_USERNAME}`,
  githubLabel: `github.com/${GITHUB_USERNAME}`,
  location: "Sunshine Coast, Queensland, Australia",
};

export type FlagshipProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  icon: "bike" | "sprout" | "cpu" | "bot";
  /** Lower-case fragments used to find a matching public GitHub repo (name/description/topics). */
  repoMatchers: string[];
};

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "bikepark",
    name: "BikePark",
    tagline: "Offline-First Event PWA · Sunshine Coast Council",
    description:
      "Built an offline-first Next.js Progressive Web App for the Sunshine Coast Council featuring PowerSync/Supabase real-time & offline data synchronisation, secure PIN workflows, and Twilio SMS notifications. Developed leveraging Cursor for AI-assisted engineering.",
    tags: ["Next.js", "PWA", "PowerSync", "Supabase", "Twilio", "Cursor"],
    icon: "bike",
    repoMatchers: ["bikepark", "bike-park", "bike_park"],
  },
  {
    id: "plant-watering",
    name: "Automated Plant Watering System",
    tagline: "Sensor-driven IoT irrigation",
    description:
      "Designed and built a sensor-driven IoT irrigation system featuring a remote GUI to monitor soil moisture levels in real time and actuate a water pump.",
    tags: ["IoT", "Sensors", "Embedded", "GUI", "Real-time"],
    icon: "sprout",
    repoMatchers: ["plant", "watering", "irrigation", "soil-moisture"],
  },
  {
    id: "rpi-remote",
    name: "Raspberry Pi Remote Control App",
    tagline: "Python GUI for GPIO hardware",
    description:
      "Developed a Python GUI application to remotely manage and automate GPIO-connected hardware and lighting systems.",
    tags: ["Python", "Raspberry Pi", "GPIO", "Automation"],
    icon: "cpu",
    repoMatchers: ["raspberry", "rpi", "pi-remote", "gpio"],
  },
  {
    id: "racing-robot",
    name: "Autonomous Racing Robot",
    tagline: "High-speed line follower in C",
    description:
      "Programmed a high-speed line-following robot in C with optimised sensor-fusion and control logic for speed and stability.",
    tags: ["C", "Robotics", "Sensor Fusion", "Control Systems"],
    icon: "bot",
    repoMatchers: ["robot", "line-follow", "linefollow", "line_follow", "racing"],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Automation Engineer (Fellowship)",
    company: "Greenhalgh Pickard",
    period: "Oct 2025 – Nov 2025",
    location: "Australia",
    highlights: [
      "Built and deployed 8+ production webforms integrated directly into legal firm workflows.",
      "Contributed to automated legal document generation within Actionstep.",
      "Implemented two-factor authentication (2FA) security workflows using Zapier and Microsoft Power Automate to secure client bank transfers.",
      "Reviewed and validated complex legal documentation for system integration.",
    ],
    tags: ["Zapier", "Power Automate", "Actionstep", "2FA", "LegalTech"],
  },
  {
    role: "Customer Support Assistant",
    company: "Moissanite Australia",
    period: "Jan 2024 – Sept 2025",
    location: "Remote",
    highlights: [
      "Handled 100+ remote customer interactions, diagnosing platform issues and troubleshooting usability problems.",
      "Collaborated with developers to push UI fixes, content updates, and SEO/metadata improvements.",
      "Authored internal technical documentation to streamline support workflows and reduce recurring issues.",
    ],
    tags: ["Troubleshooting", "SEO", "Documentation", "UX"],
  },
];

export type SkillGroup = {
  title: string;
  icon: "sparkles" | "code" | "database" | "shield";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Automation",
    icon: "sparkles",
    skills: [
      "LLM Prompt Engineering",
      "Custom GPTs & AI Agents",
      "Local LLM Deployment",
      "Cursor (AI-Assisted Dev)",
      "Zapier",
      "Microsoft Power Automate",
      "Microsoft Azure AI",
    ],
  },
  {
    title: "Languages & Web",
    icon: "code",
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "Next.js",
      "React",
      "C",
      "C++",
      "C#",
      "HTML/CSS",
      "SQL (MySQL, PL/SQL)",
    ],
  },
  {
    title: "Backend, Data & Cloud",
    icon: "database",
    skills: [
      "Supabase",
      "PowerSync",
      "Docker & Docker Compose",
      "Linux Server Administration",
      "Power BI",
      "Pandas/NumPy",
      "Git/GitHub",
    ],
  },
  {
    title: "Systems, IoT & Security",
    icon: "shield",
    skills: [
      "Raspberry Pi",
      "Particle Argon/Photon",
      "Arduino",
      "Serial Protocols (GPIO, I2C, UART, SPI)",
      "Network Protocol Analysis",
      "Threat Intelligence & GRC Foundations",
    ],
  },
];

export const certifications = [
  { name: "Microsoft Certified: Azure AI Fundamentals", code: "AI-900", issuer: "Certiport" },
  { name: "Information Technology (IT) Specialist Certification", code: "ITS", issuer: "Certiport" },
];

export const degrees = [
  {
    degree: "Bachelor of Computer Science",
    school: "University of the Sunshine Coast",
    period: "Expected 2026",
    detail: "Cumulative GPA: 6.78 / 7.00",
    current: true,
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Deakin University",
    period: "2022 – 2024",
    detail: "Completed 50% of degree with multiple High Distinctions prior to transferring",
    current: false,
  },
];

export const currentCoursework = [
  { code: "CSC303", name: "Cloud and DevOps" },
  { code: "SEC300", name: "Cyber Security and Threat Intelligence", note: "building governance, risk & compliance (GRC) knowledge" },
];

export type Grade = "HD" | "D" | "CR";
export type Unit = { code: string; name: string; mark: number; grade: Grade; uni: "UniSC" | "Deakin" };

// Only HD / D / CR units. Pass grades are intentionally excluded.
// Display order is enforced in code (highest mark first), so entry order here doesn't matter.
export const units: Unit[] = [
  { code: "CSC300", name: "Practical Machine Learning", mark: 96, grade: "HD", uni: "UniSC" },
  { code: "CSC202", name: "Mobile App Project", mark: 94, grade: "HD", uni: "UniSC" },
  { code: "SEC100", name: "Foundations of Computer Security", mark: 91, grade: "HD", uni: "UniSC" },
  { code: "CSC201", name: "Data Structures and Algorithms", mark: 91, grade: "HD", uni: "UniSC" },
  { code: "ACC106", name: "Accounting Principles", mark: 91, grade: "HD", uni: "UniSC" },
  { code: "SIT192", name: "Discrete Mathematics", mark: 90, grade: "HD", uni: "Deakin" },
  { code: "SIT122", name: "Robotics Studio", mark: 90, grade: "HD", uni: "Deakin" },
  { code: "SIT210", name: "Embedded Systems Development", mark: 90, grade: "HD", uni: "Deakin" },
  { code: "SIT112", name: "Data Science Concepts", mark: 87, grade: "HD", uni: "Deakin" },
  { code: "ICT342", name: "ICT Industry Project", mark: 86, grade: "HD", uni: "UniSC" },
  { code: "ENG302", name: "Engineering Project Management", mark: 85, grade: "HD", uni: "UniSC" },
  { code: "ICT220", name: "Wireless Communications", mark: 85, grade: "HD", uni: "UniSC" },
  { code: "SLE123", name: "Physics for the Life Sciences", mark: 81, grade: "HD", uni: "Deakin" },
  { code: "SIT103", name: "Data and Information Management", mark: 77, grade: "D", uni: "Deakin" },
  { code: "SIT202", name: "Computer Networks and Communication", mark: 77, grade: "D", uni: "Deakin" },
  { code: "SIT191", name: "Introduction to Statistics and Data Analysis", mark: 75, grade: "D", uni: "Deakin" },
  { code: "SEC200", name: "Cyber Security", mark: 71, grade: "CR", uni: "UniSC" },
  { code: "SIT223", name: "Professional Practice in Information Technology", mark: 67, grade: "CR", uni: "Deakin" },
];

/** Units sorted strictly highest mark → lowest (stable for ties), with any non-HD/D/CR grade removed. */
export const sortedUnits: Unit[] = units
  .filter((u) => u.grade === "HD" || u.grade === "D" || u.grade === "CR")
  .map((u, i) => ({ u, i }))
  .sort((a, b) => b.u.mark - a.u.mark || a.i - b.i)
  .map(({ u }) => u);

export const interests = [
  {
    title: "Linux Homelab & Self-Hosting",
    icon: "server" as const,
    body: "Running a self-managed Linux homelab using Docker Compose, deploying local LLMs, experimenting with network segmentation, and self-hosting services.",
    tags: ["docker compose", "local LLMs", "network segmentation", "self-hosting"],
  },
  {
    title: "Gym & Strength Training",
    icon: "dumbbell" as const,
    body: "Dedicated to progressive overload, discipline, and physical fitness — bringing the same consistency from the gym floor to software engineering.",
    tags: ["progressive overload", "discipline", "consistency"],
  },
  {
    title: "Pickleball",
    icon: "trophy" as const,
    body: "Competitive and social pickleball player — always ready for a fast-paced match and sharp reflexes at the kitchen line.",
    tags: ["competitive", "social", "fast reflexes"],
  },
];
