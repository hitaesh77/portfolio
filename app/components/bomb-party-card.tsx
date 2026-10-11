import { ArrowUpRight } from "lucide-react";
import styles from "./bomb-party-card.module.css";

export default function BombPartyCard() {
  return <a href="https://bomb-party-sooty.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.card} aria-label="Play Bomb Party, a game I made for my friends">
    <div className={styles.copy}>
      <h2 className={styles.title}>BOMB <span>PARTY</span></h2>
      <p className={styles.story}>Built on a car ride to Nashville.</p>
    </div>
    <div className={styles.art} aria-hidden="true">
      <svg viewBox="0 0 180 190" fill="none">
        <path d="M89 24L105 45L133 33L133 61L163 66L146 89L166 111L139 122L143 150L114 148L102 175L81 155L55 170L51 141L23 137L36 112L14 92L41 80L35 52L65 54L72 26Z" fill="#e4eb7b" />
        <ellipse cx="94" cy="169" rx="43" ry="7" fill="#242822" opacity=".13" />
        <path d="M114 72C126 61 123 50 135 44C142 41 150 44 150 32" stroke="var(--bomb-fuse, #242822)" strokeWidth="6" strokeLinecap="round" />
        <path d="M147 17L150 25L159 22M163 34L155 33M145 36L141 40" stroke="#f4512c" strokeWidth="4" strokeLinecap="round" />
        <path d="M104 66L120 72L114 88L98 82Z" fill="#242822" />
        <circle cx="89" cy="116" r="45" fill="#242822" />
        <path d="M62 98C68 87 78 83 90 84" stroke="#f5f2e9" strokeWidth="5" strokeLinecap="round" opacity=".3" />
        <ellipse cx="78" cy="113" rx="5" ry="7" fill="#f5f2e9" />
        <ellipse cx="100" cy="113" rx="5" ry="7" fill="#f5f2e9" />
        <path d="M79 131C85 135 94 135 100 130" stroke="#f5f2e9" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
    <span className={styles.play}><span>Play a round</span><ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" /></span>
  </a>;
}
