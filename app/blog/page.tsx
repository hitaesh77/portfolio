import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ThemeToggle from "../components/theme-toggle";
import EntryTimeline from "./entry-timeline";
import { blogAuthor, blogEntries, sampleContent } from "./data";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog | Hitaesh Saravanarajan",
  description: "Notes on things I build, learn, and think about.",
};

export default function BlogPage() {
  return (
    <main className={`portfolio-root ${styles.root}`}>

      <div className="noise pointer-events-none fixed inset-0 z-[9999] opacity-[var(--noise-opacity)]" />
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Page navigation">
          <Link href="/" className="inline-flex items-center gap-2"><ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />Portfolio</Link>
          <ThemeToggle />
        </nav>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Blog</p>
          <h1>My Notes</h1>
          <p>Things I&apos;m working on, learning, or just thinking about.</p>
        </header>
        <div className={styles.logHeading}>
          <span>{blogEntries.length} {blogEntries.length === 1 ? "entry" : "entries"}</span>
          <span>Newest first · Open an entry to read</span>
        </div>
        {sampleContent && <p className={styles.sampleNote}>Two sample posts to show the layout.</p>}
        <EntryTimeline entries={blogEntries} author={blogAuthor} />
        <footer className={styles.footer}>
          <span>Hitaesh Saravanarajan</span>
          <Link href="/leetcode" className="inline-flex items-center gap-2">LeetCode log<ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link>
        </footer>
      </div>
    </main>
  );
}
