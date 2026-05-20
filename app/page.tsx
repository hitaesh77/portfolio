"use client";

import { useEffect, useState } from "react";

const HERO_MODE: "ticker" | "status" = "ticker";

type TabName = "About" | "Experience" | "Projects" | "Tech" | "Resume" | "Contact";

const tabs: TabName[] = ["About", "Experience", "Projects", "Tech", "Resume", "Contact"];

const tickerItems = [
  "software engineering",
  "backend APIs",
  "fullstack apps",
  "data heavy products",
  "C and C++",
  "performance focused code",
];

const languageSkills = ["C", "C++", "Python", "Java", "TypeScript", "SystemVerilog", "RISCV Assembly"];
const backendSkills = ["Spring Boot", "FastAPI", "Flask", "PostgreSQL", "MySQL", "REST APIs"];
const frontendSkills = ["React", "Angular", "React Native", "Tailwind CSS"];
const toolsCloudSkills = ["Git", "AWS", "GCP", "Linux", "Docker", "Selenium", "BeautifulSoup"];
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="mt-1 shrink-0 text-[var(--text-muted)] opacity-0 translate-x-[-4px] translate-y-1 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function TickerHero() {
  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-row mount mount-d2 mb-8 overflow-hidden border-y border-[var(--border)] py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] hover:[&_.ticker-track]:[animation-play-state:paused]">
      <div className="ticker-track flex w-max">
        {doubledItems.map((item, index) => (
          <span className="ticker-item pr-7 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)] whitespace-nowrap" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatusHero() {
  return (
    <div className="status-card mount mount-d2 mb-8 rounded-[14px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] p-4 shadow-[0_12px_40px_var(--shadow)] backdrop-blur-[10px] transition-colors duration-300 hover:border-[var(--border-strong)]">
      <div className="mb-2.5 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
          <span className="status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          currently building
        </div>
        <span className="whitespace-nowrap font-mono text-[10px] text-[var(--text-faint)]">~/projects/tickdb</span>
      </div>
      <p className="mb-1 text-[13px] font-medium text-[var(--text-primary)]">TickDB</p>
      <p className="m-0 text-[12px] leading-[1.65] text-[var(--text-muted)]">
        A time series storage engine for market data, built to explore memory layout, disk IO, indexing, and query performance.
      </p>
    </div>
  );
}

function HeroSwitch() {
  return HERO_MODE === "status" ? <StatusHero /> : <TickerHero />;
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-faint)]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span className="relative z-0 overflow-hidden rounded-lg border border-[var(--border)] px-3 py-1.5 text-[12px] text-[var(--text-secondary)] transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[var(--accent)] before:transition-transform before:duration-300 hover:border-[var(--accent)] hover:text-[var(--selection-text)] hover:before:translate-y-0" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabName>("About");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <main className={`portfolio-root ${theme} relative isolate min-h-screen bg-[var(--bg)] text-[var(--text-muted)] transition-colors duration-300`}>
      <div className="noise pointer-events-none fixed inset-0 z-[9999] opacity-[var(--noise-opacity)]" />

      <div className="mx-auto w-full max-w-[624px] px-6 pb-24 pt-20 max-sm:pt-14">
        <header className="mount mount-d1 mb-11">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div className="h-14 w-14 overflow-hidden rounded-[10px] border border-[var(--avatar-border)] bg-white contrast-[1.1] transition-all duration-500 hover:grayscale-0 hover:contrast-100">
              <img
                src="/new_avatar.png"
                alt="Hitaesh"
                className="block h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "https://placehold.co/56x56/f6efe4/786d61?text=HS";
                }}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
                className="grid h-[18px] w-[18px] place-items-center border-0 bg-transparent p-0 text-[var(--text-faint)] transition-all duration-300 hover:rotate-12 hover:text-[var(--text-primary)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>

              <a href="https://github.com/hitaesh77" target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] transition-colors duration-300 hover:text-[var(--text-primary)]" aria-label="GitHub">
                <GithubIcon />
              </a>

              <a href="https://www.linkedin.com/in/hitaesh-saravanarajan-060777217/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] transition-colors duration-300 hover:text-[var(--text-primary)]" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>

              <a href="mailto:hitaesh.sara@gmail.com" className="text-[var(--text-faint)] transition-colors duration-300 hover:text-[var(--text-primary)]" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>

          <h1 className="mb-1 bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-[26px] font-medium leading-[1.18] tracking-[-0.035em] text-transparent">
            Hitaesh Saravanarajan
          </h1>
          <p className="mb-4 text-[13px] text-[var(--text-secondary)]">Computer Engineering @ Purdue University</p>
          <p className="m-0 max-w-md text-[13px] leading-[1.7] text-[var(--text-muted)]">
            I’m a computer engineering student and software engineer who enjoys building useful software, from backend APIs and fullstack products to lower level projects in C and C++.
          </p>
        </header>

        <HeroSwitch />

        <nav className="mount mount-d3 mb-10 border-b border-[var(--border)]">
          <div className="flex gap-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap border-0 bg-transparent pb-3 text-[12px] font-medium transition-colors duration-300 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-px after:bg-[var(--accent)] after:transition-transform after:duration-300 ${
                  activeTab === tab
                    ? "text-[var(--text-primary)] after:scale-x-100"
                    : "text-[var(--text-muted)] after:scale-x-0 hover:text-[var(--text-primary)]"
                }`}
              >
                {tab === "Tech" ? "Tech Stack" : tab}
              </button>
            ))}
          </div>
        </nav>

        <div className="mount mount-d4 min-h-[280px]">
          {activeTab === "About" && (
            <section className="tab-in grid gap-4 text-[13px] leading-[1.8] text-[var(--text-muted)]">
              <p className="m-0">
                I'm a Computer Engineering student at <span className="text-[var(--text-primary)]">Purdue University</span>  who enjoys building software and learning how systems work under the hood.
              </p>

              <p className="m-0">                
                Most of my experience has been in software engineering, from backend APIs and fullstack tools to healthcare integrations and projects in C, C++, Python, Java, TypeScript, and SystemVerilog.
              </p>

              <p className="m-0">
                Recently, I’ve been using projects to explore the areas I want to get better at. <span className="text-[var(--text-primary)]">TickDB</span> has helped me learn about storage engines, <span className="text-[var(--text-primary)]">Volos</span> has helped me work with performance sensitive C++ code, and <span className="text-[var(--text-primary)]">Findify</span> has helped me build a more complete fullstack product.
              </p>

              <p className="m-0">
                I’m looking for software engineering roles where I can contribute to interesting products, learn from strong engineers, and keep growing as an engineer.
              </p>

              <div className="mt-8"><StatusHero /></div>
            </section>
          )}

          {activeTab === "Experience" && (
            <section className="tab-in">
              <div className="grid gap-10">
                {/* Industry Experience Section */}
                <div>
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-faint)]">Industry Experience</p>
                  <div className="grid gap-6">
                    {[
                      {
                        role: "Software Engineering Intern",
                        date: "Summer 2026",
                        company: "Vanguard",
                        bullets: [
                          "Incoming intern on the Enterprise Growth Compliance team"
                        ],
                      },
                      {
                        role: "Software Engineer (Part-Time)",
                        date: "2025 - 2026",
                        company: "Kyron Medical",
                        bullets: [
                          "Built backend scheduling and intake APIs for conversational voice agents handling 100+ daily patient calls",
                          "Developed EHR integrations with ModMed and eClinicalWorks using FHIR APIs, PostgreSQL, and AWS services",
                          "Engineered stateful scheduling workflows with fuzzy matching, LLM-powered intake parsing, and fallback logic for reliable appointment routing",
                        ],
                      },
                      {
                        role: "Software Engineering Intern",
                        date: "Summer 2025",
                        company: "Penske Truck Leasing",
                        bullets: [
                          "Built a fullstack fleet inspection platform modernizing quality control workflows across 50K+ trucks",
                          "Engineered Angular, Spring Boot, and SQL systems for dynamic inspection forms, reusable workflows, and reporting",
                          "Worked directly with business stakeholders through prototyping, feedback cycles, and Agile development",
                        ],
                      },
                    ].map((experience) => (
                      <div className="border-l border-[var(--border)] pl-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:pl-8" key={`${experience.role}-${experience.company}`}>
                        <div className="mb-1 flex items-baseline justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                          <h3 className="m-0 text-[13px] font-medium text-[var(--text-primary)]">{experience.role}</h3>
                          <span className="whitespace-nowrap font-mono text-[10px] text-[var(--text-faint)]">{experience.date}</span>
                        </div>
                        <p className="mb-3 mt-0 text-[12px] text-[var(--text-muted)]">{experience.company}</p>
                        <ul className="m-0 grid list-none gap-1.5 p-0">
                          {experience.bullets.map((bullet) => (
                            <li className="flex gap-2.5 text-[12px] leading-[1.55] text-[var(--text-muted)] before:text-[var(--text-faint)] before:content-['-']" key={bullet}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Experience Section */}
                <div>
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-faint)]">Academic Experience</p>
                  <div className="grid gap-6">
                    {[
                      {
                        role: "Undergraduate TA",
                        date: "2025 - Present",
                        company: "ECE 270: Digital System Design",
                        bullets: [
                          "Mentoring 40+ students in SystemVerilog and FPGA prototyping",
                          "Guiding debugging for synchronous design and complex HDL issues",
                        ],
                      },
                      {
                        role: "Supplemental Instruction Leader",
                        date: "2024 - 2025",
                        company: "ECE 264: Advanced C Programming",
                        bullets: [
                          "Led technical review sessions for 50+ students covering pointers, memory management, file I/O, and data structures",
                          "Helped students debug C programs and understand lower level programming concepts through hands on examples",
                        ],
                      },
                    ].map((experience) => (
                      <div className="border-l border-[var(--border)] pl-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:pl-8" key={`${experience.role}-${experience.company}`}>
                        <div className="mb-1 flex items-baseline justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                          <h3 className="m-0 text-[13px] font-medium text-[var(--text-primary)]">{experience.role}</h3>
                          <span className="whitespace-nowrap font-mono text-[10px] text-[var(--text-faint)]">{experience.date}</span>
                        </div>
                        <p className="mb-3 mt-0 text-[12px] text-[var(--text-muted)]">{experience.company}</p>
                        <ul className="m-0 grid list-none gap-1.5 p-0">
                          {experience.bullets.map((bullet) => (
                            <li className="flex gap-2.5 text-[12px] leading-[1.55] text-[var(--text-muted)] before:text-[var(--text-faint)] before:content-['-']" key={bullet}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-8"></div>
            </section>
          )}

          {activeTab === "Projects" && (
            <section className="tab-in">
              <div className="grid gap-2">
                {[
                  {
                    title: "TickDB",
                    stack: "C++ · Storage Engine",
                    description: "Append only time series database optimized for low latency market data ingestion, segmented storage, WAL durability, checksums, and indexed range queries.",
                    tag: "systems",
                    url: "https://github.com/hitaesh77/TickDB",
                  },
                  {
                    title: "Volos",
                    stack: "C++ · Python · FastAPI",
                    description: "Low latency options Greeks engine with an 11µs mean hot path for repeated pricing workloads, exposed through Python bindings and a FastAPI service.",
                    tag: "performance",
                    url: "https://github.com/hitaesh77/Volos",
                  },
                  {
                    title: "Findify",
                    stack: "Python · FastAPI · React",
                    description: "Internship discovery platform that aggregates listings from 100+ company career sites per hour and exposes them through a searchable dashboard.",
                    tag: "data platform",
                    url: "https://github.com/hitaesh77/findify",
                  },
                  {
                    title: "Dual-Core RISC-V Processor",
                    stack: "SystemVerilog · FPGA",
                    description: "Dual-core pipelined RISC-V processor with caches, forwarding, hazard detection, branch control, and a 71 MHz clock speed.",
                    tag: "computer architecture",
                    url: "https://gitshare.me/repo/074b76e0-3e86-401f-93ad-befa37215b2a",
                  },
                ].map((project) => (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" key={project.title} className="group no-underline">
                    <div className="rounded-[10px] border border-transparent p-4 transition-all duration-300 hover:translate-x-1 hover:border-[var(--border)] hover:bg-[var(--surface-hover)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-3">
                            <h3 className="m-0 text-[13px] font-medium text-[var(--text-primary)]">{project.title}</h3>
                            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-faint)]">{project.stack}</span>
                          </div>
                          <p className="mb-2 mt-0 text-[12px] leading-[1.55] text-[var(--text-muted)]">{project.description}</p>
                          {project.tag && <span className="font-mono text-[10px] text-[var(--text-faint)]">{project.tag}</span>}
                        </div>
                        <ArrowIcon />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <a
                  href="https://github.com/hitaesh77?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)] no-underline transition-colors duration-300 hover:text-[var(--text-primary)]"
                >
                  <span>View more on GitHub</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
              {/* <div className="h-8"></div> */}
            </section>
          )}

          {activeTab === "Tech" && (
            <section className="tab-in grid gap-8">
              <SkillGroup title="Languages" skills={languageSkills} />
              <SkillGroup title="Backend" skills={backendSkills} />
              <SkillGroup title="Frontend" skills={frontendSkills} />
              <SkillGroup title="Tools / Cloud" skills={toolsCloudSkills} />
            </section>
          )}

          {activeTab === "Resume" && (
            <section className="tab-in">
              <div className="grid gap-3">
                <a href="/resume.pdf" download="Hitaesh_Saravanarajan_Resume.pdf" className="group flex items-center justify-between gap-4 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_4px_20px_var(--shadow)]">
                  <div className="flex items-center gap-3 text-[13px] text-[var(--text-primary)]">
                    <span className="text-[var(--text-faint)] transition-colors duration-300 group-hover:text-[var(--text-primary)]"><FileIcon /></span>
                    <span>Download Resume</span>
                  </div>
                </a>
              </div>
              <div className="h-8"></div>
            </section>
          )}

          {activeTab === "Contact" && (
            <section className="tab-in">
              <p className="mb-8 mt-0 max-w-[360px] text-[13px] leading-[1.8] text-[var(--text-muted)]">
                I'm currently looking for software engineering opportunities where I can contribute to backend systems, fullstack products, infrastructure, or performance focused engineering work.
              </p>
              <a href="mailto:hitaesh.sara@gmail.com" className="relative text-[14px] font-medium text-[var(--text-primary)] no-underline after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full">
                hitaesh.sara@gmail.com
              </a>
            </section>
          )}
        </div>
        
        {/* <TickerHero /> */}

        <footer className="mt-8 flex justify-between gap-4 border-t border-[var(--border)] pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)] max-sm:flex-col">
          <span>© 2026</span>
          <span>Building useful and reliable software</span>
        </footer>
      </div>
    </main>
  );
}
