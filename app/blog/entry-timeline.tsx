import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type BlogEntry, groupEntries } from "./data";
import styles from "./blog.module.css";

export default function EntryTimeline({ entries, author }: { entries: BlogEntry[]; author: string }) {
  if (!entries.length) return <p className={styles.empty}>No posts yet.</p>;
  return <div className={styles.timeline}>
    {groupEntries(entries).map(group => <section className={styles.dateGroup} key={group.date} aria-labelledby={`date-${group.date}`}>
      <h2 id={`date-${group.date}`} className={styles.dateHeading}>
        <span className={styles.commitMark} aria-hidden="true" />
        <time dateTime={group.date}>{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${group.date}T12:00:00Z`))}</time>
      </h2>
      <ol className={styles.entries}>{group.entries.map(entry => <li key={entry.id}>
        <Link href={`/blog/${entry.slug}`} className={styles.summary}>
          <span className={styles.entryInfo}>
            <span className={styles.entryTitle}>{entry.title}</span>
            <span className={styles.entryMeta}><span className={styles.author}>{author}</span><span aria-hidden="true">&middot;</span><span>{entry.id}</span></span>
            <span className={styles.preview}>{entry.excerpt}</span>
          </span>
          <ArrowUpRight size={14} strokeWidth={1.5} className={styles.openIcon} aria-hidden="true" />
        </Link>
      </li>)}</ol>
    </section>)}
  </div>;
}
