export const PROGRESS_URL = "https://raw.githubusercontent.com/hitaesh77/neetcode-submissions-a43s9ite/dashboard-data/progress.json";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Unknown";
export type AgentStatus = "safe" | "normal" | "late" | "danger" | "failed";
export type LeetCodeEntry = { id: string; date: string; problem: string; slug: string; url: string; difficulty: Difficulty; completedAt: string; topics: string[] };
export type AgentMessage = { id: string; status: AgentStatus; headline: string; message: string; updatedAt: string };
export type Profile = { currentStreak: number; longestStreak: number; totalSolved: number; submissions: number; undatedSubmissions: number; startedAt: string | null; difficulty: Record<Difficulty, number> };
export type Today = { date: string; count: number; entries: LeetCodeEntry[]; started: boolean };
export type ActivityDay = { date: string; count: number; state: "completed" | "missed" | "pending" | "future" | "before"; isToday: boolean };
export type Progress = {
  schemaVersion: 1; generatedAt: string; timezone: string; challengeStartedAt: string | null;
  summary: { submissions: number; distinctProblems: number; datedSubmissions: number; undatedSubmissions: number; activeDays: number; difficulty: Record<Difficulty, number> };
  dailyActivity: Record<string, { submissions: number; distinctProblems: number }>;
  challenge: null | { completedDays: number; longestStreak: number; lastCompletedDate: string | null; streakEndingOnLastCompletedDate: number };
  recentSubmissions: { id: string; problemId: string; title: string; recordedAt: string; localDate: string; difficulty: Exclude<Difficulty, "Unknown"> | null; topics: string[] | null; links: { neetcode?: string; leetcode?: string }; sourceUrl: string }[];
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid progress object");
  return value as Record<string, unknown>;
}
function count(value: unknown) {
  if (!Number.isSafeInteger(value) || (value as number) < 0) throw new Error("Invalid progress count");
}
function date(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error("Invalid progress date");
}
function timestamp(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) throw new Error("Invalid progress timestamp");
}
function url(value: unknown) {
  if (typeof value !== "string" || new URL(value).protocol !== "https:") throw new Error("Invalid progress link");
}
export function parseProgress(value: unknown): Progress {
  const p = object(value);
  if (p.schemaVersion !== 1 || p.timezone !== "America/New_York") throw new Error("Unsupported progress feed");
  timestamp(p.generatedAt);
  if (p.challengeStartedAt !== null) date(p.challengeStartedAt);
  const s = object(p.summary);
  for (const key of ["submissions", "distinctProblems", "datedSubmissions", "undatedSubmissions", "activeDays"]) count(s[key]);
  const difficulties = object(s.difficulty);
  for (const key of ["Easy", "Medium", "Hard", "Unknown"]) count(difficulties[key]);
  if (Object.values(difficulties).reduce<number>((sum, n) => sum + (n as number), 0) !== s.distinctProblems || (s.datedSubmissions as number) + (s.undatedSubmissions as number) !== s.submissions) throw new Error("Inconsistent progress totals");
  const days = object(p.dailyActivity);
  let dated = 0;
  for (const [day, raw] of Object.entries(days)) {
    date(day); const activity = object(raw); count(activity.submissions); count(activity.distinctProblems);
    if ((activity.distinctProblems as number) > (activity.submissions as number) || activity.submissions === 0) throw new Error("Invalid daily activity");
    dated += activity.submissions as number;
  }
  if (dated !== s.datedSubmissions || Object.keys(days).length !== s.activeDays) throw new Error("Inconsistent daily activity");
  if (p.challenge !== null) {
    const c = object(p.challenge);
    for (const key of ["completedDays", "longestStreak", "streakEndingOnLastCompletedDate"]) count(c[key]);
    if (c.lastCompletedDate !== null) date(c.lastCompletedDate);
  }
  if ((p.challengeStartedAt === null) !== (p.challenge === null)) throw new Error("Invalid challenge configuration");
  if (!Array.isArray(p.recentSubmissions)) throw new Error("Invalid recent submissions");
  const ids = new Set<string>();
  for (const raw of p.recentSubmissions) {
    const r = object(raw);
    for (const key of ["id", "problemId", "title"]) if (typeof r[key] !== "string" || !r[key]) throw new Error("Invalid submission");
    if (ids.has(r.id as string)) throw new Error("Duplicate submission");
    ids.add(r.id as string); timestamp(r.recordedAt); date(r.localDate); url(r.sourceUrl);
    if (r.difficulty !== null && !["Easy", "Medium", "Hard"].includes(r.difficulty as string)) throw new Error("Invalid difficulty");
    if (r.topics !== null && (!Array.isArray(r.topics) || !r.topics.every(t => typeof t === "string"))) throw new Error("Invalid topics");
    for (const link of Object.values(object(r.links))) url(link);
  }
  return value as Progress;
}
export function localDate(now: Date, timezone = "America/New_York") {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
function previousDay(day: string) {
  const value = new Date(`${day}T12:00:00Z`); value.setUTCDate(value.getUTCDate() - 1);
  return value.toISOString().slice(0, 10);
}
export function dashboard(p: Progress, now = new Date()) {
  const day = localDate(now, p.timezone);
  const started = p.challengeStartedAt !== null && day >= p.challengeStartedAt;
  const completedDates = Object.keys(p.dailyActivity).filter(d => started && d >= p.challengeStartedAt! && d <= day).sort();
  const completed = new Set(completedDates);
  let currentStreak = 0, longestStreak = 0, run = 0, previous = "";
  for (const d of completedDates) { run = previousDay(d) === previous ? run + 1 : 1; longestStreak = Math.max(longestStreak, run); previous = d; }
  let cursor = completed.has(day) ? day : previousDay(day);
  while (completed.has(cursor)) { currentStreak++; cursor = previousDay(cursor); }
  const entries: LeetCodeEntry[] = p.recentSubmissions.map(r => ({ id: r.id, date: r.localDate, problem: r.title, slug: r.problemId, url: r.links.neetcode ?? r.links.leetcode ?? r.sourceUrl, difficulty: r.difficulty ?? "Unknown", completedAt: r.recordedAt, topics: r.topics ?? [] }));
  const today: Today = { date: day, count: p.dailyActivity[day]?.submissions ?? 0, entries: entries.filter(e => e.date === day), started };
  const [year, month] = day.split("-").map(Number);
  const activity: ActivityDay[] = Array.from({ length: new Date(Date.UTC(year, month, 0)).getUTCDate() }, (_, i) => {
    const date = `${day.slice(0, 7)}-${String(i + 1).padStart(2, "0")}`;
    const count = p.dailyActivity[date]?.submissions ?? 0;
    return { date, count, isToday: date === day, state: date > day ? "future" : count ? "completed" : !p.challengeStartedAt || date < p.challengeStartedAt ? "before" : date === day ? "pending" : "missed" };
  });
  const hour = Number(new Intl.DateTimeFormat("en-US", { timeZone: p.timezone, hour: "2-digit", hourCycle: "h23" }).format(now));
  const status: AgentStatus = today.count ? "safe" : !started ? "normal" : hour >= 21 ? "danger" : hour >= 18 ? "late" : "normal";
  const agent: AgentMessage = { id: "current", status, headline: today.count ? "Practice recorded" : !started ? "Challenge not started" : hour >= 21 ? "No activity recorded" : "Daily check", message: today.count ? `${today.count} submission${today.count === 1 ? "" : "s"} recorded today.` : !started ? "Daily challenge tracking begins on the configured start date." : "No submission recorded for today in the current feed.", updatedAt: now.toISOString() };
  const profile: Profile = { currentStreak, longestStreak, totalSolved: p.summary.distinctProblems, submissions: p.summary.submissions, undatedSubmissions: p.summary.undatedSubmissions, startedAt: p.challengeStartedAt, difficulty: p.summary.difficulty };
  return { profile, today, activity, entries, agent, month: new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long", year: "numeric" }).format(new Date(`${day}T12:00:00Z`)) };
}
