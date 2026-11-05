import { ArrowUpRight } from "lucide-react";
import styles from "./lingo-card.module.css";

export default function LingoCard({ compact = false }: { compact?: boolean }) {
  return <a href="https://language-media-prep-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className={`${styles.card} ${compact ? styles.compact : ""}`} aria-label="Try Lingo, Arabic vocabulary flashcards for your next read or watch">
    <span className={styles.art} aria-hidden="true">
      <svg viewBox="0 0 60 64" fill="none">
        <rect x="7" y="10" width="36" height="44" rx="5" transform="rotate(-12 7 10)" fill="#bca9f5" />
        <rect x="16" y="12" width="36" height="44" rx="5" transform="rotate(8 16 12)" fill="#eee7ff" stroke="#8b6cff" strokeWidth="1.5" />
        <path d="M26 30h12m-6-6v12" stroke="#7654d6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m23 44 17 2m-17 3 12 1.5" stroke="#a08bcf" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m51 4 1.5 4.5L57 10l-4.5 1.5L51 16l-1.5-4.5L45 10l4.5-1.5Z" fill="#8b6cff" />
      </svg>
    </span>
    <div className={styles.copy}>
      <h2 className={styles.title}>Lingo</h2>
      <p className={styles.story}>Arabic flashcards for your next read.</p>
    </div>
    <span className={styles.action}><span>Try Lingo</span><ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" /></span>
  </a>;
}
