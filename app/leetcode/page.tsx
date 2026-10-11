import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "../components/theme-toggle";
import LiveProgress from "./live-progress";
import styles from "./leetcode.module.css";

export const metadata: Metadata = {
  title: "LeetCode | Hitaesh Saravanarajan",
  description: "My LeetCode log. Trying to do at least one problem a day.",
};
export default function LeetCodePage() {
  return <main className={`portfolio-root ${styles.root}`}>

    <div className="noise pointer-events-none fixed inset-0 z-[9999] opacity-[var(--noise-opacity)]" />
    <div className={styles.container}>
      <nav className={styles.nav} aria-label="Page navigation"><Link href="/" className="inline-flex items-center gap-2"><ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />Portfolio</Link><ThemeToggle /></nav>
      <header className={styles.header}><p className={styles.label}>LeetCode / Practice log</p><h1>My Leetcode Log</h1><p>Trying to do at least one problem a day.</p></header>
      <LiveProgress />
      <footer className={styles.footer}><a href="https://github.com/hitaesh77/neetcode-submissions-a43s9ite">Submission repo</a><span>LeetCode practice</span></footer>
    </div>
  </main>;
}
