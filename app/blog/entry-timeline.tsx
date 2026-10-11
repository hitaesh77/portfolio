import { type BlogEntry, groupEntries } from "./data";
import styles from "./blog.module.css";

function dateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export default function EntryTimeline({ entries, author }: { entries: BlogEntry[]; author: string }) {
  if (!entries.length) {
    return <p className={styles.empty}>No posts yet.</p>;
  }

  return (
    <div className={styles.timeline}>
      {groupEntries(entries).map((group) => (
        <section className={styles.dateGroup} key={group.date} aria-labelledby={`date-${group.date}`}>
          <h2 id={`date-${group.date}`} className={styles.dateHeading}>
            <span className={styles.commitMark} aria-hidden="true" />
            <time dateTime={group.date}>{dateLabel(group.date)}</time>
          </h2>
          <ol className={styles.entries}>
            {group.entries.map((entry) => (
              <li key={entry.id}>
                <details className={styles.entry} id={`entry-${entry.id}`}>
                  <summary className={styles.summary}>
                    <span className={styles.entryInfo}>
                      <span className={styles.entryTitle}>{entry.title}</span>
                      <span className={styles.entryMeta}>
                        <span className={styles.author}>{author}</span>
                        <span aria-hidden="true">·</span>
                        <span>{entry.topic}</span>
                      </span>
                    </span>
                    <span className={styles.entryId} aria-hidden="true">{entry.id}</span>
                    <span className={styles.expand} aria-hidden="true" />
                  </summary>
                  <div className={styles.entryBody}>
                    {entry.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
