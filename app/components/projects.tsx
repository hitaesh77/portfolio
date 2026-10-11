import { ArrowRight, ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  stack: string;
  description: string;
  status: string;
  href: string;
  action: string;
  note?: string;
};

const featured: Project[] = [
  {
    title: "Dual Core RISC V Processor",
    stack: "SystemVerilog · FPGA",
    description: "Built a pipelined processor with caches, forwarding, and hazard detection. It reached 71 MHz and passed over 95% of validation tests. A lot of time spent figuring out what was happening between clock cycles.",
    status: "Academic project",
    href: "https://gitshare.me/repo/074b76e0-3e86-401f-93ad-befa37215b2a",
    action: "View project",
  },
  {
    title: "Findify",
    stack: "Python · FastAPI · Next.js · SQLite",
    description: "An internship tracker that scrapes company career pages and brings new postings into one dashboard. Built because checking the same sites over and over got old. I used it during my junior year of college, then deprecated it.",
    status: "Deprecated",
    href: "https://github.com/hitaesh77/findify",
    action: "View code",
  },

];
const experiments: Project[] = [
  {
    title: "CRC32 Checksum",
    stack: "C++",
    description: "Built to understand how checksums detect corrupted data and get better at writing fast C++. Compared several implementations, checked correctness, and benchmarked them against zlib.",
    status: "Learning project",
    href: "https://github.com/hitaesh77/crc32-checksum",
    action: "View code",
  },
  {
    title: "Balance Financial Agent",
    stack: "Python · LLM tool calling",
    description: "A small prototype for my senior design budgeting assistant. The model calls Python tools to look up balances and spending in mock data, then explains the results. Built to get a feel for how tool calling works.",
    status: "Prototype",
    href: "https://github.com/hitaesh77/balance-financial-agent",
    action: "View code",
  },
  {
    title: "Volos",
    stack: "C++",
    description: "An unfinished Black Scholes pricing and Greeks engine. A place to explore numerical validation, batch processing, and C++ performance when I have time.",
    status: "Unfinished",
    href: "https://github.com/hitaesh77/Volos",
    action: "View code",
  },
];

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <article className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] ${compact ? "p-4" : "p-5"}`}>
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="m-0 text-[14px] font-medium text-[var(--text-primary)]">{project.title}</h3>
      <span className="rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[9px] text-[var(--text-muted)]">{project.status}</span>
    </div>
    <p className="mb-3 mt-0 font-mono text-[10px] leading-relaxed text-[var(--text-secondary)]">{project.stack}</p>
    <p className="m-0 text-[12px] leading-[1.75] text-[var(--text-muted)]">{project.description}</p>
    {project.note && <p className="mb-0 mt-3 border-l-2 border-[var(--border-strong)] pl-3 text-[11px] leading-[1.7] text-[var(--text-muted)]">{project.note}</p>}
    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.action}: ${project.title}`} className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-[11px] text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-primary)]">
      {project.action}<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
    </a>
  </article>;
}

export default function Projects() {
  return <section className="tab-in grid gap-8" aria-label="Projects">
    <section aria-labelledby="featured-projects">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="featured-projects" className="m-0 font-mono text-[10px] font-normal uppercase tracking-[0.15em] text-[var(--text-muted)]">Featured Work</h2>
        <span className="font-mono text-[10px] text-[var(--text-faint)]">Software + hardware</span>
      </div>
      <div className="grid gap-3">{featured.map(project => <ProjectCard key={project.title} project={project} />)}</div>
    </section>
    <section aria-labelledby="fun-projects">
      <h2 id="fun-projects" className="mb-4 mt-0 font-mono text-[10px] font-normal uppercase tracking-[0.15em] text-[var(--text-muted)]">For fun</h2>
      <div className="grid gap-3">
      <ProjectCard project={{
        title: "Bomb Party",
        stack: "Next.js · Codex · Vercel",
        description: "Built this with Codex during the car ride to Nashville so I could play it with my friends. Give an answer and pass the phone before the bomb goes off. Just a fun idea that turned into a game before we got there.",
        status: "Live",
        href: "https://bomb-party-sooty.vercel.app/",
        action: "Play the game",
      }} />
      <ProjectCard project={{
    title: "Purdue Faculty Finder",
    stack: "Next.js · FastAPI · SQLite",
    description: "Built for a professor to help students find Purdue ECE faculty by research interest. Used scraping pipelines to collect faculty information, with a FastAPI and SQLite backend hosted on Railway.",
    status: "Frontend preview",
    href: "https://purdue-faculty-finder.vercel.app/",
    action: "View frontend",
    note: "The project is no longer in use, so I retired the backend to save hosting costs. The frontend is still available to view; search is offline.",
  }} />
      </div>
    </section>
    <section aria-labelledby="experiment-projects" className="border-t border-[var(--border)] pt-5">
      <h2 id="experiment-projects" className="m-0 font-mono text-[10px] font-normal uppercase tracking-[0.15em] text-[var(--text-muted)]">Experiments <span className="ml-2 text-[var(--text-faint)]">({experiments.length})</span></h2>
      <p className="mb-4 mt-3 text-[12px] leading-[1.7] text-[var(--text-muted)]">Smaller prototypes and things I&apos;m still figuring out.</p>
      <div className="grid gap-3">{experiments.map(project => <ProjectCard key={project.title} project={project} compact />)}</div>
    </section>
    <a href="https://github.com/hitaesh77?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-end gap-2 font-mono text-[10px] text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)]">
      More on GitHub<ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
    </a>
  </section>;
}
