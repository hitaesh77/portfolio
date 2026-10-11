import type { ActivityDay, LeetCodeEntry, Profile, Today } from "./data";
import styles from "./leetcode.module.css";

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
function time(timestamp: string, timezone: string) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: timezone }).format(new Date(timestamp));
}

export function StreakHero({ profile }: { profile: Profile }) {
  return <section className={styles.streak} aria-labelledby="streak-heading">
    <div><span className={styles.streakNumber}>{profile.totalSolved}</span><h2 id="streak-heading" className={styles.label}>Problems solved</h2></div>
    <dl className={styles.streakDetails}>
      <div><dt>Current streak</dt><dd>{profile.currentStreak} days</dd></div>
      <div><dt>Longest streak</dt><dd>{profile.longestStreak} days</dd></div>
      <div><dt>Submissions</dt><dd>{profile.submissions}</dd></div>
      <div><dt>Started</dt><dd><time dateTime={profile.startedAt ?? undefined}>{profile.startedAt ? formatDate(profile.startedAt) : "Not configured"}</time></dd></div>
    </dl>
  </section>;
}

export function TodayStatus({ today, timezone, timezoneLabel }: { today: Today; timezone: string; timezoneLabel: string }) {
  const complete = today.count > 0;
  return <section className={styles.today} aria-labelledby="today-heading">
    <div className={styles.sectionHeading}><h2 id="today-heading" className={styles.label}>Today</h2><time dateTime={today.date}>{formatDate(today.date)} · {timezoneLabel}</time></div>
    <p className={styles.status} data-tone={complete ? "safe" : "late"}>{complete ? "Activity recorded" : today.started ? "No submissions yet" : "Tracking not started"}</p>
    {complete ? <><p className={styles.description}>{today.count} submission{today.count === 1 ? "" : "s"} recorded today.</p><ul className={styles.todayProblems}>{today.entries.map((entry) => <li key={entry.id}><a href={entry.url}>{entry.problem}</a><span className={styles.difficulty} data-difficulty={entry.difficulty}>{entry.difficulty}</span><span>Recorded at <time dateTime={entry.completedAt}>{time(entry.completedAt, timezone)} {timezoneLabel}</time></span></li>)}</ul></> : <p className={styles.description}>Nothing recorded in the current feed for today.</p>}
  </section>;
}

export function ActivityCalendar({ days, month }: { days: ActivityDay[]; month: string }) {
  const offset = days.length ? (new Date(`${days[0].date}T12:00:00Z`).getUTCDay() + 6) % 7 : 0;
  return <section className={styles.section} aria-labelledby="activity-heading">
    <div className={styles.sectionHeading}><h2 id="activity-heading" className={styles.label}>Daily activity</h2><span>{month}</span></div>
    <div className={styles.calendarLayout}>
      <div className={styles.weekdays} aria-hidden="true">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <span key={day}>{day}</span>)}</div>
      <ol className={styles.calendar} aria-label={`${month} completion history`}>
        {days.map((day, index) => {
          const description = `${formatDate(day.date)}: ${day.isToday ? "today, " : ""}${day.state === "completed" ? `${day.count} ${day.count === 1 ? "submission" : "submissions"} recorded` : day.state === "missed" ? "no activity" : day.state === "future" ? "future" : day.state === "before" ? "before challenge" : "not completed yet"}`;
          return <li key={day.date} style={index === 0 ? { gridRowStart: offset + 1 } : undefined}><span tabIndex={0} className={styles.day} data-state={day.state} aria-current={day.isToday ? "date" : undefined} aria-label={description}><span aria-hidden="true">{day.state === "completed" ? "+" : day.state === "missed" ? "×" : day.date.slice(-2)}</span><span className={styles.tooltip} aria-hidden="true">{description}</span></span></li>;
        })}
      </ol>
      <p className={styles.calendarNote}><strong>{days.filter((day) => day.state === "completed").length}</strong><span>active days this month</span></p>
    </div>
    <ul className={styles.legend} aria-label="Calendar legend"><li>+ Completed</li><li>× Missed</li><li><span className={styles.todayKey} /> Today</li><li><span className={styles.futureKey} /> Future</li></ul>
  </section>;
}

export function Stats({ profile }: { profile: Profile }) {
  return <section className={styles.section} aria-labelledby="stats-heading"><h2 id="stats-heading" className={styles.label}>Problems by difficulty</h2><dl className={styles.stats}>{Object.entries(profile.difficulty).map(([difficulty, count]) => <div key={difficulty}><dt className={styles.difficulty} data-difficulty={difficulty}>{difficulty}</dt><dd>{count}</dd></div>)}</dl></section>;
}

export function RecentProblems({ entries, timezone, timezoneLabel }: { entries: LeetCodeEntry[]; timezone: string; timezoneLabel: string }) {
  return <section className={styles.section} aria-labelledby="recent-heading"><div className={styles.sectionHeading}><h2 id="recent-heading" className={styles.label}>Recent submissions</h2><span>Latest {entries.length}</span></div><ul className={styles.problems}>{entries.map((entry) => <li key={entry.id}><div className={styles.problemMain}><a href={entry.url}>{entry.problem}</a><span className={styles.difficulty} data-difficulty={entry.difficulty}>{entry.difficulty}</span></div><div className={styles.problemMeta}><span>{entry.topics.length ? entry.topics.join(" / ") : ""}</span><time dateTime={entry.completedAt}>{formatDate(entry.date)} · {time(entry.completedAt, timezone)} {timezoneLabel}</time></div></li>)}</ul></section>;
}

