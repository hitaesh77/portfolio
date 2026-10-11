"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, RecentProblems, Stats, StreakHero, TodayStatus, formatDate } from "./components";
import { dashboard, localDate, parseProgress, PROGRESS_URL, type Progress } from "./data";
import styles from "./leetcode.module.css";

export default function LiveProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const tick = () => setNow(new Date());
    tick();
    async function load() {
      setLoading(true);
      try {
        const response = await fetch(PROGRESS_URL, { cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) });
        if (!response.ok) throw new Error(`Progress HTTP ${response.status}`);
        const next = parseProgress(await response.json());
        if (!active) return;
        setProgress(previous => previous && Date.parse(previous.generatedAt) > Date.parse(next.generatedAt) ? previous : next);
        setError(false);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    const fetchTimer = setInterval(() => void load(), 5 * 60 * 1000);
    const clockTimer = setInterval(tick, 30 * 1000);
    return () => { active = false; controller.abort(); clearInterval(fetchTimer); clearInterval(clockTimer); };
  }, [refresh]);
  if (!progress || !now) return <section className={styles.section} aria-live="polite"><p>{error ? "Progress is unavailable right now. Please try again." : "Loading practice progress…"}</p>{error && <button onClick={() => setRefresh(v => v + 1)} className={styles.refresh}>Retry</button>}</section>;
  const { profile, today, activity, entries, month } = dashboard(progress, now);
  const clock = { timezone: progress.timezone, timezoneLabel: "ET" };
  return <>
    <div className={styles.feedStatus}>
      <p className={styles.caption}>Updated {formatDate(localDate(new Date(progress.generatedAt), progress.timezone))} · <time dateTime={progress.generatedAt}>{new Intl.DateTimeFormat("en-US", { timeZone: progress.timezone, hour: "numeric", minute: "2-digit" }).format(new Date(progress.generatedAt))} ET</time></p>
      <button className={styles.refresh} onClick={() => setRefresh(v => v + 1)} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button>
    </div>
    {error && <p className={styles.description} role="status">Couldn&apos;t refresh progress. Showing the last loaded snapshot.</p>}
    <StreakHero profile={profile} />
    <TodayStatus today={today} {...clock} />
    <ActivityCalendar days={activity} month={month} />
    <Stats profile={profile} />
    <RecentProblems entries={entries} {...clock} />
    <details className={styles.notes}><summary>Data notes</summary><p>{profile.undatedSubmissions} imported submissions have no dates. They count toward totals, but not the calendar or streaks.</p><p>Dates usually reflect GitHub sync time. Accepted-only syncing is enabled; missing metadata stays unknown.</p><a href={PROGRESS_URL}>View JSON</a></details>
  </>;
}
